import React from 'react'
import { TEXT_COLOR } from '../theme'

const Topbar = ({ onLogoClick, onAboutClick }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-6 sm:px-10 md:px-16"
      style={{ color: TEXT_COLOR }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onLogoClick}
        >
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="Icebreaker Logo"
            className="w-8 h-8"
            style={{ filter: 'brightness(0) saturate(100%)' }}
          />
          <div>
            <h1 className="text-lg font-medium font-heading">Icebreaker</h1>
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
