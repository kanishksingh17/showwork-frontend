/**
 * Utility functions for fetch with AbortController support
 * Enables request cancellation for React Query
 */

export const fetchWithAbort = async (
  url: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<Response> => {
  const response = await fetch(url, {
    ...options,
    signal,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

/**
 * Helper to get JSON with abort support
 */
export const fetchJSON = async <T>(
  url: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<T> => {
  const response = await fetchWithAbort(url, options, signal);
  return response.json();
};



