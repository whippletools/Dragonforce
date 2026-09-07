import { useEffect, useRef, useState } from 'react';
import { X, Volume2, VolumeX, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INTRO_VIDEO_POPUP } from '../data/heroMedia';

interface IntroVideoModalProps {
  lang: 'es' | 'en';
}

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Popup de bienvenida con el mensaje en video. Se configura en
 * src/data/heroMedia.ts (INTRO_VIDEO_POPUP). Si `enabled` es false no
 * renderiza nada.
 *
 * IMPORTANTE — por qué no arranca con sonido solo:
 * Ningún navegador permite reproducir audio automáticamente en la primera
 * visita; Chrome, Safari y Firefox lo bloquean y en iOS es imposible sin un
 * toque del usuario. Por eso el video arranca en silencio (así se ve movimiento
 * desde el primer instante) con un botón grande encima. Al tocarlo se activa el
 * sonido y el video VUELVE A EMPEZAR, para que no se pierda el inicio del
 * mensaje.
 */
const IntroVideoModal = ({ lang }: IntroVideoModalProps) => {
  const isSpanish = lang === 'es';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSound, setHasSound] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    if (!INTRO_VIDEO_POPUP.enabled) return;

    if (INTRO_VIDEO_POPUP.showOncePerVisitor) {
      try {
        if (localStorage.getItem(INTRO_VIDEO_POPUP.storageKey)) return;
      } catch {
        // localStorage bloqueado (modo privado): mostramos el popup igual
      }
    }

    setIsMobile(window.matchMedia(MOBILE_QUERY).matches);
    const timer = setTimeout(() => setIsOpen(true), INTRO_VIDEO_POPUP.delayMs);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    videoRef.current?.pause();
    if (INTRO_VIDEO_POPUP.showOncePerVisitor) {
      try {
        localStorage.setItem(INTRO_VIDEO_POPUP.storageKey, '1');
      } catch {
        // sin persistencia: se volverá a mostrar en la siguiente visita
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Arranque en silencio. Si el navegador bloquea incluso eso, mostramos play.
  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video || hasSound) return;
    video.play().catch(() => setNeedsManualPlay(true));
  };

  /** Único gesto del usuario: activa el sonido y reinicia el mensaje. */
  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;
    void video.play();
    setHasSound(true);
    setNeedsManualPlay(false);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (hasSound) {
      video.muted = true;
      setHasSound(false);
    } else {
      enableSound();
    }
  };

  if (!INTRO_VIDEO_POPUP.enabled) return null;

  const src = isMobile ? INTRO_VIDEO_POPUP.mobile : INTRO_VIDEO_POPUP.desktop;
  const showSoundPrompt = !hasSound;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${
              isMobile ? 'max-w-sm' : 'max-w-4xl'
            }`}
          >
            <video
              ref={videoRef}
              key={src}
              className={`w-full ${isMobile ? 'aspect-[9/16]' : 'aspect-video'} object-cover`}
              autoPlay
              muted
              loop={!hasSound}
              playsInline
              onCanPlay={handleCanPlay}
              onEnded={close}
            >
              <source src={src} type="video/mp4" />
            </video>

            {/* Capa de un solo toque: activa el sonido y reinicia el mensaje */}
            {showSoundPrompt && (
              <button
                onClick={enableSound}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 transition-colors hover:bg-black/50"
                aria-label={isSpanish ? 'Reproducir con sonido' : 'Play with sound'}
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-[#1a4f8a] shadow-xl transition-transform hover:scale-105">
                  {needsManualPlay ? <Play size={34} fill="currentColor" /> : <Volume2 size={34} />}
                </span>
                <span className="max-w-xs px-6 text-center text-base font-bold uppercase tracking-wide text-white drop-shadow-lg">
                  {isSpanish ? 'Toca para escuchar el mensaje' : 'Tap to hear the message'}
                </span>
              </button>
            )}

            <button
              onClick={close}
              aria-label={isSpanish ? 'Cerrar video' : 'Close video'}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white/90 transition-colors hover:bg-black/80 hover:text-white"
            >
              <X size={20} />
            </button>

            {hasSound && (
              <button
                onClick={toggleSound}
                aria-label={isSpanish ? 'Silenciar' : 'Mute'}
                className="absolute bottom-3 left-3 rounded-full bg-black/60 p-2.5 text-white/90 transition-colors hover:bg-black/80 hover:text-white"
              >
                <VolumeX size={18} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideoModal;
