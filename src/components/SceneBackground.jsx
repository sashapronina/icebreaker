import React from 'react'
import { COLD_BG, WARM_BG } from '../theme'

function assetUrl(path) {
  return `${process.env.PUBLIC_URL}${path}`
}

export default function SceneBackground({ isWarm = false }) {
  const skyColor = isWarm ? WARM_BG : COLD_BG

  return (
    <div className="scene-background fixed inset-0 z-[3] pointer-events-none" aria-hidden>
      <div
        className="scene-blend-root motion-scene absolute inset-0"
        style={{ backgroundColor: skyColor }}
      >
        <img
          src={assetUrl('/background/clouds.png')}
          alt=""
          className="scene-clouds absolute left-0 w-full"
          draggable={false}
        />
        <img
          src={assetUrl('/background/mountains.png')}
          alt=""
          className="scene-mountains absolute inset-x-0 w-full"
          draggable={false}
        />
      </div>
    </div>
  )
}
