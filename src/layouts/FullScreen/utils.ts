// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { baseModel } from '@/models/base';

export function requestFullscreen(element: Element | string) {
  const ele = typeof element === 'string' ? document.querySelector(element) : element;
  if (ele?.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele?.mozRequestFullScreen) {
    ele?.mozRequestFullScreen();
  } else if (ele?.webkitRequestFullscreen) {
    ele?.webkitRequestFullscreen();
  } else if (ele?.msRequestFullscreen) {
    ele?.msRequestFullscreen();
  }
}

export function exitFullscreen() {
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

export function isFullScreen() {
  return  !!(
    document.fullscreen || 
      document.mozFullScreen ||                         
      document.webkitIsFullScreen ||       
      document.webkitFullScreen || 
      document.msFullScreen 
  );
}

export function getFullscreenElement() {
  return (        
    document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullScreenElement ||
      document.webkitFullscreenElement || null
  );
}

export const isFullscreenEnabled = (
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.msFullscreenEnabled
);
