import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad"> & {
  /** High-priority LCP image (hero). */
  priority?: boolean;
  /** Fill a positioned parent (`absolute inset-0`). */
  fill?: boolean;
  /** Extra classes for the pulse placeholder. */
  placeholderClassName?: string;
};

/**
 * Image with skeleton placeholder + fade-in to improve perceived load time.
 * Resets cleanly when `src` changes (e.g. CMS seed → live media).
 */
export function SmartImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  placeholderClassName,
  width,
  height,
  ...rest
}: SmartImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [shownSrc, setShownSrc] = useState(src);

  useEffect(() => {
    if (src === shownSrc) return;
    setLoaded(false);
    setShownSrc(src);
  }, [src, shownSrc]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [shownSrc]);

  if (!src) return null;

  return (
    <span
      className={cn(
        "overflow-hidden",
        fill ? "pointer-events-none absolute inset-0 -z-0 block" : "relative block w-full",
        !fill && className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-forest/20 transition-opacity duration-500",
          loaded ? "opacity-0" : "animate-pulse opacity-100",
          placeholderClassName,
        )}
      />
      <img
        {...rest}
        ref={imgRef}
        src={shownSrc}
        alt={alt ?? ""}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          fill ? "h-full w-full object-cover" : "relative h-auto w-full",
          fill && className,
        )}
      />
    </span>
  );
}
