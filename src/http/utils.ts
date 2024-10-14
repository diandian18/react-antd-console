export function statusClass(status: number) {
  if (status >= 500) {
    return '5xx';
  }
  return String(status);
}
