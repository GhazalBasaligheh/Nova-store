'use client';

import { useEffect, useRef } from 'react';

// Pixels the mouse must travel before a press counts as a drag (and not as a click).
const DRAG_THRESHOLD = 5;

/**
 * Lets a horizontally scrollable row be scrolled by dragging it with the mouse.
 * Touch screens already scroll natively, so only mouse input is handled here.
 * The click that ends a drag is swallowed, so releasing over a chip doesn't select it.
 * While dragging, the element gets data-dragging="true" so CSS can show a grabbing cursor.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startScroll = 0;
    let pressed = false;
    let dragged = false;

    const onMouseDown = (event: MouseEvent) => {
      // Primary button only, and only when there is something to scroll.
      if (event.button !== 0 || element.scrollWidth <= element.clientWidth) return;
      pressed = true;
      dragged = false;
      startX = event.clientX;
      startScroll = element.scrollLeft;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!pressed) return;
      const distance = event.clientX - startX;
      if (!dragged && Math.abs(distance) < DRAG_THRESHOLD) return;
      dragged = true;
      element.dataset.dragging = 'true';
      // Works in LTR and RTL: dragging right always moves the content right.
      element.scrollLeft = startScroll - distance;
    };

    const onMouseUp = () => {
      pressed = false;
      delete element.dataset.dragging;
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('click', onClickCapture, true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return ref;
}
