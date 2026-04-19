import * as THREE from 'three';

export type MarkerData = {
  id: string; // Identificador único (generado si no existe)
  name: string; // Nombre general
  city?: string; // Ciudad específica
  value: number; // Valor numérico (delay, población, etc.)
  lat: number; // Latitud
  lon: number; // Longitud
  position: [number, number, number]; // Posición cartesiana [x, y, z]
  rotation: [number, number, number]; // Rotación Euler [x, y, z] para mirar afuera
  height: number; // Altura calculada de la barra
  color: string; // Color sugestivo (podría ser dinámico en el futuro)
};

/**
 * Convierte coordenadas geográficas a posición cartesiana 3D
 */
function latLongToVector3(
  lat: number,
  lon: number,
  radius: number,
  height: number = 0
): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = ((lon - 180) * Math.PI) / 180;
  const r = radius + height;

  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.cos(theta),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.sin(theta)
  );
}

/**
 * Función auxiliar para buscar propiedades case-insensitive
 */
const pick = <T = unknown>(
  obj: Record<string, unknown> | null | undefined,
  candidates: string[]
): T | undefined => {
  if (!obj) return undefined;

  const lowerMap = Object.keys(obj).reduce(
    (acc, key) => {
      acc[key.toLowerCase()] = key;
      return acc;
    },
    {} as Record<string, string>
  );

  for (const k of candidates) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) return obj[k] as T;
    const found = lowerMap[k.toLowerCase()];
    if (found !== undefined) return obj[found] as T;
  }
  return undefined;
};

const toNumber = (value: unknown, fallback: number): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const isValidLatLon = (item: { lat: number; lon: number }) =>
  Number.isFinite(item.lat) && Number.isFinite(item.lon);

export async function loadSimpleMarkers(
  url: string,
  radius: number = 1
): Promise<MarkerData[]> {
  if (!url) throw new Error('loadSimpleMarkers: url requerido');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  const rows = Array.isArray(data) ? data : [];

  let minVal = Infinity;
  let maxVal = -Infinity;

  const normalizeRow = (row: unknown) => {
    if (Array.isArray(row)) {
      const [name, lat, lon, value] = row;
      return {
        name: typeof name === 'string' ? name : String(name ?? ''),
        city: undefined,
        lat: toNumber(lat, NaN),
        lon: toNumber(lon, NaN),
        value: toNumber(value ?? 0, 0),
      };
    }

    if (!row || typeof row !== 'object') {
      return { name: '', city: undefined, lat: NaN, lon: NaN, value: 0 };
    }

    const record = row as Record<string, unknown>;
    const city = pick<string>(record, ['city', 'City', 'CITY']);
    const name =
      pick<string>(record, [
        'name',
        'city',
        'country_name',
        'Country_Name',
        'country',
      ]) || '';
    const lat = toNumber(
      pick(record, ['lat', 'latitude', 'Lat', 'Latitude', 'PWC_Lat']),
      NaN
    );
    const lon = toNumber(
      pick(record, ['lon', 'longitude', 'Lon', 'Longitude', 'PWC_Lon']),
      NaN
    );
    const value = toNumber(
      pick(record, [
        'value',
        'average_delay',
        'delay',
        'population',
        'Population',
        'Pop',
        'pop',
      ]),
      0
    );

    return { name, city, lat, lon, value };
  };

  // Paso 1: Normalizar datos crudos
  const rawItems = rows.filter(Boolean).map(normalizeRow).filter(isValidLatLon);

  for (const item of rawItems) {
    minVal = Math.min(minVal, item.value);
    maxVal = Math.max(maxVal, item.value);
  }

  // Fallback para evitar división por cero
  if (
    !Number.isFinite(minVal) ||
    !Number.isFinite(maxVal) ||
    minVal === maxVal
  ) {
    minVal = 0;
    maxVal = Math.max(1, rawItems[0]?.value || 1);
  }

  const minHeight = 0.02 * radius;
  const maxHeight = 0.5 * radius;
  const valueRange = maxVal - minVal;

  // Paso 2: Crear MarkerData
  return rawItems.map((item, index) => {
    // Normalización 0..1
    const t = (item.value - minVal) / valueRange;
    // Altura interpolada
    const height = clamp(
      minHeight + t * (maxHeight - minHeight),
      minHeight,
      maxHeight
    );

    // Calcular posición base (en superficie) y posición del centro geométrico de la barra
    // La barra crece desde la superficie hacia afuera.
    // BoxGeometry se centra en (0,0,0). Si queremos que la base toque la esfera,
    // el centro de la caja debe estar a (radius + height/2).
    const centerRadius = radius + height / 2;
    const positionVec = latLongToVector3(item.lat, item.lon, centerRadius);

    // Calcular rotación "lookAt"
    // Hacemos un dummy object para calcular la rotación fácilmente usando lookAt de Three.js
    // Opcionalmente podríamos hacerlo con matemáticas puras, pero Vector3/Euler es cómodo.
    const dummyObj = new THREE.Object3D();
    dummyObj.position.copy(positionVec);
    // Queremos que mire hacia afuera del origen (0,0,0)
    // El eje Z local de la caja es la "profundidad", pero a veces queremos alinear Y con el radio.
    // En el código original: BoxGeometry(baseSize, baseSize, height) -> Alto es Z? No, width, height, depth.
    // BoxGeometry(w, h, d) -> eje Y es height.
    // Si usaban lookAt(outward), el eje Z local apunta afuera.
    // Si la caja es (size, size, height) -> el eje "largo" es Z.
    // Espera, BoxGeometry args son: width (X), height (Y), depth (Z).
    // Original: new THREE.BoxGeometry(baseSize, baseSize, height).
    // O sea, el eje largo es Z (depth).
    // Entonces `lookAt` funciona perfecto porque alinea el eje Z con el target.

    const target = positionVec.clone().multiplyScalar(2); // Un punto más lejos en la misma dirección
    dummyObj.lookAt(target);

    return {
      id: `marker-${index}`,
      name: item.name,
      city: item.city,
      value: item.value,
      lat: item.lat,
      lon: item.lon,
      position: [positionVec.x, positionVec.y, positionVec.z],
      rotation: [dummyObj.rotation.x, dummyObj.rotation.y, dummyObj.rotation.z],
      height: height,
      color: '#ff5533', // Default color
    };
  });
}
