import { createPortal } from 'react-dom'

/**
 * Mobile CTAs are portaled to document.body so they stay above overlays
 * and are not clipped by overflow-hidden on the scene shell.
 */
export default function MobileCtaDock({ children }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="hidden max-md:flex fixed inset-x-0 z-[45] flex-col items-center gap-4 pointer-events-auto"
      style={{ bottom: 'calc(40px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex w-[230px] flex-col items-center gap-4">{children}</div>
    </div>,
    document.body
  )
}
