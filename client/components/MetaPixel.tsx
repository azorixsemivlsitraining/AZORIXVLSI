import React, { useEffect } from "react";

interface MetaPixelProps {
  id: string;
}

export default function MetaPixel({ id }: MetaPixelProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // avoid injecting twice
    if ((window as any)._fbq_injected_for === id) return;

    (window as any)._fbq_injected_for = id;

    try {
      // standard fbq snippet
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = `fb-pixel-${id}`;
      script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${id}');fbq('track', 'PageView');`;
      document.head.appendChild(script);

      // noscript fallback image
      const noscript = document.createElement("noscript");
      noscript.id = `fb-pixel-noscript-${id}`;
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"/>`;
      document.body.appendChild(noscript);
    } catch (e) {
      // swallow errors - pixel should never break the app
      console.warn("MetaPixel injection failed", e);
    }

    return () => {
      try {
        const s = document.getElementById(`fb-pixel-${id}`);
        if (s) s.remove();
        const n = document.getElementById(`fb-pixel-noscript-${id}`);
        if (n) n.remove();
        delete (window as any)._fbq_injected_for;
      } catch {}
    };
  }, [id]);

  return null;
}
