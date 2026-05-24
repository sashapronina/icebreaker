import React from 'react'
import { TEXT_COLOR } from '../theme'

const EnterKeyIcon = ({ color }) => (
  <span
    className="inline-flex items-center justify-center"
    style={{
      fontSize: '14px',
      lineHeight: '1',
      fontWeight: 400,
      color,
      transform: 'translateY(1px)',
    }}
    aria-hidden
  >
    &#x21B5;
  </span>
)

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  primaryColor,
  icon,
  showEnterHint = false,
  shortcutKey,
  iconPosition = 'right',
  className = '',
}) => {
  const isFrosted = variant === 'frosted'

  const baseClasses =
    'ui-pressable flex items-center justify-center z-10 transition-[background-color,border-color,color,opacity] duration-[160ms] ease-out ' +
    (isFrosted
      ? 'gap-2.5 px-6 py-2 min-h-[39px] font-normal text-base rounded'
      : 'gap-0 px-8 py-3 min-h-[48px] rounded-full ' +
        (variant === 'primary' ? 'font-semibold' : 'font-normal'))

  const variantClasses = {
    primary: disabled ? 'bg-gray-300 cursor-not-allowed opacity-50' : '',
    secondary: disabled ? 'cursor-not-allowed opacity-40' : 'hover:opacity-80',
    frosted: disabled ? 'opacity-50 cursor-not-allowed' : '',
  }

  const primaryStyle =
    variant === 'primary' && !disabled && primaryColor
      ? { backgroundColor: primaryColor, color: TEXT_COLOR }
      : variant === 'primary' && !disabled
      ? { backgroundColor: '#121212', color: TEXT_COLOR }
      : undefined

  const frostedStyle =
    isFrosted
      ? {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          color: TEXT_COLOR,
        }
      : undefined

  const secondaryStyle =
    variant === 'secondary' && !disabled ? { color: TEXT_COLOR } : undefined
  const combinedStyle = { ...primaryStyle, ...frostedStyle, ...secondaryStyle }

  const shortcutBadgeBaseClasses =
    'hidden md:inline-flex items-center justify-center self-center rounded'
  const shortcutBadgeBaseStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
  }

  const iconClasses = iconPosition === 'left' ? 'mr-2' : 'ml-2'

  const enterHintEl = showEnterHint && isFrosted && !disabled && (
    <span
      className={shortcutBadgeBaseClasses}
      style={shortcutBadgeBaseStyle}
      aria-hidden
    >
      <EnterKeyIcon color={TEXT_COLOR} />
    </span>
  )

  const enterHintPrimary =
    showEnterHint && variant === 'primary' && !disabled && (
      <span
        className={`ml-2 ${shortcutBadgeBaseClasses}`}
        style={{ ...shortcutBadgeBaseStyle, backgroundColor: 'rgba(255,255,255,0.25)' }}
        aria-hidden
      >
        <EnterKeyIcon color={TEXT_COLOR} />
      </span>
    )

  const shortcutKeyHint = shortcutKey && variant === 'secondary' && !disabled && (
    <span
      className={`ml-2 ${shortcutBadgeBaseClasses}`}
      style={{
        ...shortcutBadgeBaseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        color: TEXT_COLOR,
        fontSize: '14px',
        lineHeight: '1',
        fontWeight: 400,
      }}
      aria-hidden
    >
      {shortcutKey}
    </span>
  )

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={combinedStyle}
    >
      {icon && iconPosition === 'left' && <span className={iconClasses}>{icon}</span>}
      {children}
      {enterHintEl}
      {enterHintPrimary}
      {shortcutKeyHint}
      {icon && !showEnterHint && iconPosition === 'right' && (
        <span className={iconClasses}>{icon}</span>
      )}
    </button>
  )
}

export default Button
