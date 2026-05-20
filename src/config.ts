// TEMP: Usando backend local para desarrollo
// Cambiar a producción cuando se despliegue: 'https://dragonforce-api.lab.whipple.mx/api/'
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3009/api/';
const VITE_UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:3009/';

// Normalize URLs to always end with a single slash
export const API_BASE_URL = VITE_API_BASE_URL.endsWith('/') ? VITE_API_BASE_URL : `${VITE_API_BASE_URL}/`;
export const UPLOADS_BASE_URL = VITE_UPLOADS_BASE_URL.endsWith('/') ? VITE_UPLOADS_BASE_URL : `${VITE_UPLOADS_BASE_URL}/`;

/**
 * Completes a relative URL with the UPLOADS_BASE_URL.
 * If the URL is already absolute, it returns it as is.
 */
export const completeImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  return `${UPLOADS_BASE_URL}${cleanUrl}`;
};
