import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useBlockContextMenu
 * Unified hook for detecting PC Right-Click (contextmenu) and Mobile Long-Press (touch-and-hold ~500ms)
 * specifically designed for the KFSSEC block-based on-page editor.
 */
export function useBlockContextMenu({ isEnabled = true, onTrigger } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const timerRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const isHoldingRef = useRef(false);

  // Close context menu
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // PC Right-Click Handler
  const handleContextMenu = useCallback((e) => {
    if (!isEnabled) return;
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX;
    const clientY = e.clientY;

    // Viewport bounds calculation to keep menu within screen
    const menuWidth = 260;
    const menuHeight = 320;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let x = clientX;
    let y = clientY;

    if (x + menuWidth > windowWidth - 16) {
      x = Math.max(16, windowWidth - menuWidth - 16);
    }
    if (y + menuHeight > windowHeight - 16) {
      y = Math.max(16, windowHeight - menuHeight - 16);
    }

    setPosition({ x, y });
    setIsMobile(false);
    setIsOpen(true);
    onTrigger?.({ isMobile: false, x, y });
  }, [isEnabled, onTrigger]);

  // Mobile Touch Handlers for 500ms Long-Press
  const handleTouchStart = useCallback((e) => {
    if (!isEnabled) return;
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    isHoldingRef.current = true;

    // Clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set 500ms long-press timer
    timerRef.current = setTimeout(() => {
      if (isHoldingRef.current) {
        // Trigger gentle haptic vibration if supported
        try {
          if (navigator && typeof navigator.vibrate === 'function') {
            navigator.vibrate(40);
          }
        } catch {
          // ignore
        }

        setIsMobile(true);
        setPosition({ x: startPosRef.current.x, y: startPosRef.current.y });
        setIsOpen(true);
        onTrigger?.({ isMobile: true, x: startPosRef.current.x, y: startPosRef.current.y });
      }
    }, 500);
  }, [isEnabled, onTrigger]);

  const handleTouchMove = useCallback((e) => {
    if (!isHoldingRef.current) return;
    if (e.touches.length !== 1) {
      isHoldingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startPosRef.current.x);
    const dy = Math.abs(touch.clientY - startPosRef.current.y);

    // If moved more than 10px, the user is scrolling -> cancel long-press
    if (dx > 10 || dy > 10) {
      isHoldingRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isHoldingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Auto close on Escape key or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    isMobile,
    position,
    closeMenu,
    bindProps: {
      onContextMenu: handleContextMenu,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    },
  };
}
