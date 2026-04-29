import React from 'react'

const EnterKeyIcon = () => (
  <span
    className="inline-flex items-center justify-center"
    style={{
      fontSize: '14px',
      lineHeight: '1',
      fontWeight: 400,
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
  className = ''
}) => {
  const baseClasses = "px-8 py-3 transition-all duration-200 flex items-center justify-center gap-0 z-10 min-h-[48px] " +
    (variant === 'primary' ? 'font-semibold' : 'font-bold')
  
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'text-white',
    secondary: disabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-gray-600 hover:text-gray-800'
  }

  const primaryStyle = variant === 'primary' && !disabled && primaryColor
    ? { backgroundColor: primaryColor }
    : variant === 'primary' && !disabled
    ? { backgroundColor: '#121212' }
    : undefined

  const secondaryStyle = variant === 'secondary' && primaryColor ? { color: primaryColor } : undefined
  const combinedStyle = { borderRadius: '1000px', ...primaryStyle, ...secondaryStyle }
  const shortcutBadgeBaseClasses = 'ml-2 inline-flex items-center justify-center self-center rounded'
  const shortcutBadgeBaseStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
  }

  const iconClasses = iconPosition === 'left' ? 'mr-2' : 'ml-2'
  const enterHintEl = showEnterHint && variant === 'primary' && !disabled && (
    <span
      className={shortcutBadgeBaseClasses}
      style={{ ...shortcutBadgeBaseStyle, backgroundColor: 'rgba(255,255,255,0.25)' }}
      aria-hidden
    >
      <EnterKeyIcon />
    </span>
  )

  const shortcutKeyHint = shortcutKey && variant === 'secondary' && !disabled && (
    <span
      className={shortcutBadgeBaseClasses}
      style={{
        ...shortcutBadgeBaseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        color: primaryColor || '#FF6D50',
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
      {icon && iconPosition === 'left' && (
        <span className={iconClasses}>{icon}</span>
      )}
      {children}
      {enterHintEl}
      {shortcutKeyHint}
      {icon && !showEnterHint && iconPosition === 'right' && (
        <span className={iconClasses}>{icon}</span>
      )}
    </button>
  )
}

export default Button
