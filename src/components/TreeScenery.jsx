import React from 'react'

function assetUrl(path) {
  return `${process.env.PUBLIC_URL}${path}`
}

const TREE_SIDES = {
  left: {
    trunk: '/trees/tree-left-painted-trunk.png',
    leaves: '/trees/tree-left-painted-leaves.png',
    width: 129,
    height: 286,
    displayHeight: 'min(60vh, 414px)',
    top: '14vh',
  },
  right: {
    trunk: '/trees/tree-right-painted-trunk.png',
    leaves: '/trees/tree-right-leaves.png',
    width: 294,
    height: 383,
    displayHeight: 'min(78vh, 552px)',
    top: '0',
  },
}

function TreeSide({ side, isWarm }) {
  const config = TREE_SIDES[side]
  const isLeft = side === 'left'

  return (
    <div
      className={`tree-side fixed z-[8] pointer-events-none ${
        isLeft ? 'tree-side-left' : 'tree-side-right'
      } ${isWarm ? 'tree-side-settled' : ''}`}
      style={{ top: config.top }}
      aria-hidden
    >
      <div
        className="relative"
        style={{
          height: config.displayHeight,
          aspectRatio: `${config.width} / ${config.height}`,
        }}
      >
        <img
          src={assetUrl(config.trunk)}
          alt=""
          className={`block h-full w-full object-contain ${isLeft ? 'object-left' : 'object-right'}`}
          draggable={false}
        />
        <img
          src={assetUrl(config.leaves)}
          alt=""
          className={`tree-leaves absolute inset-0 h-full w-full object-contain ${
            isLeft ? 'object-left' : 'object-right'
          } ${isWarm ? 'tree-leaves-visible' : 'tree-leaves-hidden'}`}
          draggable={false}
        />
      </div>
    </div>
  )
}

export default function TreeScenery({ isWarm = false }) {
  return (
    <>
      <TreeSide side="left" isWarm={isWarm} />
      <TreeSide side="right" isWarm={isWarm} />
    </>
  )
}
