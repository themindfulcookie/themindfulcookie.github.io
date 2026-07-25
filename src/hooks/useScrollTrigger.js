import { useEffect, useState } from 'react';

export default function useScrollTrigger() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => setTrigger(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return trigger;
}
