import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  message?: string;
}

/**
 * Banner shown when the app is using local fallback data instead of live API data.
 */
export function OfflineBanner({ message }: OfflineBannerProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-lg">
      <div className="flex items-start gap-3">
        <WifiOff className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">
            Modo sin conexión
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            {message || 'No se pudo conectar al servidor. Se están mostrando datos locales que pueden no estar actualizados.'}
          </p>
        </div>
      </div>
    </div>
  );
}
