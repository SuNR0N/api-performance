export function parseJSONToObject(value: string): any {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}