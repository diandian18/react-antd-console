import { useEffect, useState } from 'react';

export function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function onFullscreenChange() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange); // Firefox
    document.addEventListener('webkitfullscreenchange', onFullscreenChange); // Chrome, Safari and Opera
    document.addEventListener('MSFullscreenChange', onFullscreenChange); // Internet Explorer and Edge
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange); // Firefox
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange); // Chrome, Safari and Opera
      document.removeEventListener('MSFullscreenChange', onFullscreenChange); // Internet Explorer and Edge
    }
  }, []);

  return isFullScreen;
}
