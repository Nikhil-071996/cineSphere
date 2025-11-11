import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {

    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathName])

    useEffect(() => {
      const handleLoad = () => {
        window.scrollTo(0,0);
      };
  
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }, []);


  return null
}

export default ScrollToTop