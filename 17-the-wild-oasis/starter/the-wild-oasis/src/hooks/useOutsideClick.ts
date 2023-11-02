import { useEffect, useRef } from 'react';

export function useOutsideClick(
  handler: () => void,
  listenCaptruing: boolean = true
) {
  const ref = useRef<Element>();

  useEffect(() => {
    function handleClick(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener('click', handleClick, listenCaptruing);
    return () =>
      document.removeEventListener('click', handleClick, listenCaptruing);
  }, [handler, listenCaptruing]);

  return ref;
}
