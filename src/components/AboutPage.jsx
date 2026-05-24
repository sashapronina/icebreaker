import React from 'react'
import { TEXT_COLOR } from '../theme'

const AboutPage = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 sm:px-10 md:px-16"
      style={{
        background: 'linear-gradient(to bottom, #FDFCF3 0%, #FDF0EB 100%)',
        color: TEXT_COLOR,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-6 sm:top-6 sm:right-10 md:right-16 flex items-center justify-center rounded hover:opacity-80 transition-opacity font-body leading-none"
        style={{ width: 32, height: 32, fontSize: 32 }}
        aria-label="Close"
      >
        ×
      </button>

      <div className="max-w-lg w-full text-left">
        <h1 className="text-xl font-heading font-bold mb-4">Hi stranger,</h1>
        <p className="font-body font-medium text-base mb-6">
          I hope you enjoyed this unassuming nibble of experience.
        </p>
        <p className="font-body font-medium text-base leading-relaxed">
          In the meantime,{' '}
          <span className="font-bold">
            some ice is not meant to be broken.
          </span>{' '}
          If you liked this corner of the internet please donate to{' '}
          <a
            href="https://polarbearsinternational.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:opacity-80 transition-opacity"
          >
            Polar Bears International
          </a>
          —they work to preserve the habitat of ice-loving bears.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
