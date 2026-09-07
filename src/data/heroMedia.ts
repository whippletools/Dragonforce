/**
 * ---------------------------------------------------------------------------
 * VIDEOS DEL HERO Y POPUP DE BIENVENIDA
 * ---------------------------------------------------------------------------
 * Todo se controla con variables de entorno (VITE_*), así que se prende y se
 * apaga sin tocar código. Los valores de abajo son los que se usan si la
 * variable no está definida.
 *
 * OJO: Vite inyecta las VITE_* durante el BUILD, no en tiempo de ejecución.
 * Cambiar una variable exige volver a construir y desplegar (en CapRover basta
 * con editar la env y darle "Save & Update", que dispara el build).
 *
 * Los archivos van en `public/videos/`. Ver public/videos/README.md.
 */

const env = import.meta.env as unknown as Record<string, string | undefined>;

/** Lee un booleano. Acepta true/false, 1/0, yes/no, on/off. */
const readBool = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined || value.trim() === '') return fallback;
  const v = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on', 'si', 'sí'].includes(v)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(v)) return false;
  return fallback;
};

const readString = (value: string | undefined, fallback: string): string =>
  value !== undefined && value.trim() !== '' ? value.trim() : fallback;

const readNumber = (value: string | undefined, fallback: number): number => {
  const n = Number(value);
  return value !== undefined && value.trim() !== '' && Number.isFinite(n) ? n : fallback;
};

/** El índice del slide acepta un número o la palabra "all" (todos los slides). */
const readSlideIndex = (value: string | undefined, fallback: number | null): number | null => {
  if (value === undefined || value.trim() === '') return fallback;
  const v = value.trim().toLowerCase();
  if (v === 'all' || v === 'todos') return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 ? n : fallback;
};

export interface HeroMediaOverride {
  /** false = el hero vuelve a tomar el video del CMS */
  enabled: boolean;
  /** Video horizontal 16:9 — escritorio y tablet */
  desktop: string;
  /** Video vertical 9:16 — smartphones (< 768px) */
  mobile: string;
  /** A qué slide se le aplica (0 = el primero). `null` = a todos. */
  slideIndex: number | null;
}

export const HERO_MEDIA_OVERRIDE: HeroMediaOverride = {
  enabled: readBool(env.VITE_HERO_VIDEO_ENABLED, true),
  desktop: readString(env.VITE_HERO_VIDEO_DESKTOP, '/videos/hero-horizontal.mp4'),
  mobile: readString(env.VITE_HERO_VIDEO_MOBILE, '/videos/hero-vertical.mp4'),
  slideIndex: readSlideIndex(env.VITE_HERO_VIDEO_SLIDE_INDEX, 0),
};

export interface IntroVideoPopupConfig {
  /** false = no se muestra el popup de bienvenida */
  enabled: boolean;
  /** Video horizontal 16:9 — escritorio y tablet */
  desktop: string;
  /** Video vertical 9:16 — smartphones (< 768px) */
  mobile: string;
  /** Mostrarlo sólo la primera vez que el visitante entra al sitio */
  showOncePerVisitor: boolean;
  /** Llave de localStorage. Cámbiala para volver a mostrarlo a todos. */
  storageKey: string;
  /** Milisegundos de espera antes de abrirlo, para no competir con la carga */
  delayMs: number;
}

export const INTRO_VIDEO_POPUP: IntroVideoPopupConfig = {
  enabled: readBool(env.VITE_INTRO_POPUP_ENABLED, true),
  desktop: readString(env.VITE_INTRO_POPUP_DESKTOP, '/videos/hero-horizontal.mp4'),
  mobile: readString(env.VITE_INTRO_POPUP_MOBILE, '/videos/hero-vertical.mp4'),
  showOncePerVisitor: readBool(env.VITE_INTRO_POPUP_ONCE, true),
  storageKey: readString(env.VITE_INTRO_POPUP_STORAGE_KEY, 'df-intro-video-v1'),
  delayMs: readNumber(env.VITE_INTRO_POPUP_DELAY_MS, 800),
};
