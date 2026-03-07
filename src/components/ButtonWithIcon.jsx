import React from 'react'

const ButtonWithIcon = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  icon,
  iconPosition = 'right',
  className = ''
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
  
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'bg-[#121212] text-white hover:bg-gray-800 shadow-md hover:shadow-lg',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
    blue: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-[#121212] text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
  }

  const iconClasses = iconPosition === 'left' ? 'mr-2' : 'ml-2'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className={iconClasses}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={iconClasses}>{icon}</span>
      )}
    </button>
  )
}

export default ButtonWithIcon
