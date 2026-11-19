'use client';
import { useEffect } from 'react';

// Google Ads "Contact" conversion: fires when a visitor taps any phone, WhatsApp
// or email link anywhere on the site. One listener covers every link, so new
// call buttons are tracked automatically.
const CONTACT_CONVERSION = 'AW-18136825590/TcVnCPapwrsdEPb9p8hD';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function isContactLink(href: string): boolean {
  const h = href.toLowerCase();
  return (
    h.startsWith('tel:') ||
    h.startsWith('mailto:') ||
    h.includes('wa.me/') ||
    h.includes('api.whatsapp.com') ||
    h.includes('whatsapp://')
  );
}

export default function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Staff clicking customer contact links in the admin area is not a lead.
      if (window.location.pathname.startsWith('/admin')) return;
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (!isContactLink(href)) return;
      (window as GtagWindow).gtag?.('event', 'conversion', { send_to: CONTACT_CONVERSION });
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
