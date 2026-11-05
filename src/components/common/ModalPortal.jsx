import React, { cloneElement, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const ModalLayerContext = createContext(0);

// Page animations create containing blocks for fixed elements. Render overlays at
// the document root, retaining React context and keeping nested dialogs above parents.
export default function ModalPortal({ children }) {
  const parentLayer = useContext(ModalLayerContext);
  if (typeof document === 'undefined') return null;
  const match = children.props.className?.match(/(?:^|\s)z-(?:\[(\d+)\]|(\d+))(?:\s|$)/);
  const baseLayer = Number(children.props.style?.zIndex) || Number(match?.[1] || match?.[2]) || 50;
  const layer = Math.max(baseLayer, parentLayer + 1);
  return createPortal(
    <ModalLayerContext.Provider value={layer}>
      {cloneElement(children, { 'data-modal-overlay': true, style: { ...children.props.style, zIndex: layer } })}
    </ModalLayerContext.Provider>,
    document.body,
  );
}
