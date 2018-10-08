export function parseJSONToObject(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}