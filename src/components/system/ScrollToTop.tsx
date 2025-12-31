import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ smooth = true }: { smooth?: boolean }) {
  const location = useLocation();

  useEffect(() => {
    const behavior = smooth ? 'smooth' : undefined;

    // Scroll the window
    window.scrollTo({ top: 0, behavior } as ScrollToOptions);

    // Also attempt to scroll potential root elements
    const docEl = document.documentElement;
    const body = document.body;
    docEl.scrollTo({ top: 0, behavior } as ScrollToOptions);
    body.scrollTo({ top: 0, behavior } as ScrollToOptions);

    // If a custom scroll container exists, scroll it too
    const customScroller = document.querySelector(
      '[data-scrollable]'
    ) as HTMLElement | null;
    if (customScroller) {
      customScroller.scrollTo({ top: 0, behavior } as ScrollToOptions);
    }
  }, [location.pathname, location.search, smooth]);

  return null;
}

export default ScrollToTop;
