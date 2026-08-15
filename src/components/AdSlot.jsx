import React, { useEffect, useRef } from 'react';

/**
 * Reusable Ad Container wrapper to prevent Cumulative Layout Shift (CLS)
 * by reserving space before ad scripts render.
 * Enforces Google AdSense placement policies.
 */
export function AdSlot({ format = 'rectangle', className = '', style = {} }) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  // Determine minimum heights to strictly prevent layout shifts
  // Formats: 'rectangle' (e.g. 300x250 or 336x280), 'leaderboard' (e.g. 728x90), 'banner' (e.g. 320x50 or 468x60)
  let minHeight = '280px';
  
  if (format === 'banner') {
    minHeight = '60px';
  } else if (format === 'leaderboard') {
    minHeight = '90px';
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentRef = adRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pushedRef.current) {
          pushedRef.current = true;
          
          // Lazily inject AdSense script only once globally
          let script = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
          if (!script) {
            script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3243435715777840';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
          }

          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense error:", e);
          }

          observer.unobserve(currentRef);
        }
      },
      { rootMargin: '300px' } // Load slightly before it comes into view
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      className={`ad-container ${className}`}
      style={{
        minHeight,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-elev-1)',
        border: '1px dashed var(--border-soft)',
        borderRadius: 'var(--r-md)',
        margin: '32px 0', // Ensures ads never overlap with content or CTAs
        overflow: 'hidden',
        position: 'relative',
        ...style
      }}
      aria-label="Advertisement Placeholder"
    >
      <span style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '0.75rem', 
        color: 'var(--text-muted)', 
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        userSelect: 'none',
        zIndex: 0
      }}>
        Advertisement
      </span>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <ins className="adsbygoogle"
          style={{ display: 'block', minHeight: minHeight }}
          data-ad-client="ca-pub-3243435715777840"
          data-ad-slot={format === 'leaderboard' ? '1234567890' : '0987654321'} // Placeholders
          data-ad-format="auto"
          data-full-width-responsive="true"
          ref={adRef}>
        </ins>
      </div>
    </div>
  );
}
