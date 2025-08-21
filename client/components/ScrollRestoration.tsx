import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top on route changes, not on component updates
    if (location.pathname !== location.pathname) {
      // Store current scroll position before potential navigation
      const currentScrollY = window.scrollY;
      
      // Small delay to ensure the route has changed
      setTimeout(() => {
        // Only scroll to top if we're not at the same position (indicating a real navigation)
        if (window.scrollY === currentScrollY && currentScrollY === 0) {
          // Don't scroll if already at top
          return;
        }
        // Only scroll to top for actual page navigations, not hash changes
        if (!location.hash) {
          window.scrollTo(0, 0);
        }
      }, 0);
    }
  }, [location.pathname]); // Only trigger on pathname changes, not hash or search

  return null;
}
