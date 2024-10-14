export function axiosRes<T>(data: T) {
  return {
    code: '200',
    message: 'success',
    data,
  };
}
