export function useApi() {
  const config = useRuntimeConfig();
  return async <T>(path: string, options: RequestInit = {}) => {
    return $fetch<T>(`${config.public.apiBase}${path}`, options as never);
  };
}
