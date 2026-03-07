import React from 'react'

const THEMES = {
  cold: '#1F9DFF',
  warm: '#FF6D50',
}

const Topbar = ({ showTagline = false, onLogoClick, onAboutClick, theme = 'cold' }) => {
  const color = THEMES[theme] ?? THEMES.cold
  // Filter to tint black/neutral logo to theme color
  const logoFilter = theme === 'warm'
    ? 'invert(52%) sepia(89%) saturate(1243%) hue-rotate(330deg) brightness(101%) contrast(101%)'
    : 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(186deg) brightness(102%) contrast(101%)'

  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-6 sm:px-10 md:px-16" style={{ color }}>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onLogoClick}
        >
          <img
            src="/logo.png"
            alt="Icebreaker Logo"
            className="w-8 h-8"
            style={{ filter: logoFilter }}
          />
          <div>
            <h1 className="text-lg font-extrabold font-heading">Icebreaker</h1>
            {showTagline && (
              <p className="text-sm font-body opacity-90">Go beyond small talk</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onAboutClick}
          className="text-sm font-body hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
        >
          About
        </button>
      </div>
    </div>
  )
}

export default Topbar