import { TOKEN_STORAGE_KEY } from '@/context/AuthContext';

const AUTH_BASE = import.meta.env.VITE_AUTH_BASE_URL;
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function createFetcher(baseUrl, { attachAuth = false } = {}) {
  return async function fetcher(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (attachAuth) {
      const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
    if (!(options.body instanceof FormData)) {
      headers.set('Accept', 'application/json');
      if (
        !headers.has('Content-Type') &&
        options.method &&
        options.method !== 'GET'
      ) {
        headers.set('Content-Type', 'application/json');
      }
    }

    const res = await fetch(baseUrl + path, { ...options, headers });

    if (res.status === 401 && attachAuth) {
      try {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      } finally {
        window.location.href = '/login';
      }
      throw new Error('Sesión expirada. Redirigiendo a /login');
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = undefined;
      }
      const err = new Error(
        data?.message || data?.Message || text || `HTTP ${res.status}`,
      );
      err.status = res.status;
      err.data = data;
      throw err;
    }

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  };
}

export const authFetcher = createFetcher(AUTH_BASE, { attachAuth: false });
export const apiFetcher = createFetcher(API_BASE, { attachAuth: true });
