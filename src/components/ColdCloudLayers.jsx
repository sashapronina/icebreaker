import React from 'react'

const LAYER_OFFSET_PX = 20
const STACK_SHIFT_PX = -88
const REF_WIDTH = 1479
const LAYER_HEIGHT = 309

const CLOUD_LAYERS = [
  {
    id: 'clouds-3',
    src: '/clouds/clouds-3.png',
    height: LAYER_HEIGHT,
    top: 0,
    zIndex: 1,
    gradient: 'linear-gradient(180deg, rgba(210, 236, 255, 0.88) 0%, rgba(175, 218, 255, 0.68) 100%)',
  },
  {
    id: 'clouds-2',
    src: '/clouds/clouds-2.png',
    height: LAYER_HEIGHT,
    top: LAYER_OFFSET_PX,
    zIndex: 2,
    settleTop: 0,
    gradient: 'linear-gradient(180deg, rgba(196, 228, 255, 0.9) 0%, rgba(160, 212, 255, 0.72) 100%)',
    warmGradient: 'linear-gradient(180deg, rgba(255, 196, 180, 0.92) 0%, rgba(255, 109, 80, 0.82) 100%)',
  },
]

const STAY_LAYER = CLOUD_LAYERS[1]
const STACK_HEIGHT = Math.max(...CLOUD_LAYERS.map((layer) => layer.top + layer.height))

function assetUrl(path) {
  return `${process.env.PUBLIC_URL}${path}`
}

function CloudMaskLayer({ layer, isWarm }) {
  const src = assetUrl(layer.src)
  const isStayLayer = layer.id === 'clouds-2'
  const layerHeightVw = `${(layer.height / REF_WIDTH) * 100}vw`

  return (
    <div
      className={`cold-cloud-layer w-full ${isWarm && isStayLayer ? 'cold-cloud-layer-warm' : ''}`}
      style={{
        height: layerHeightVw,
        maxHeight: layer.height,
        aspectRatio: `${REF_WIDTH} / ${layer.height}`,
        background: isWarm && isStayLayer ? layer.warmGradient : layer.gradient,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskMode: 'alpha',
        maskMode: 'alpha',
      }}
    />
  )
}

export default function ColdCloudLayers({ animationPhase = 'idle', isWarm = false }) {
  const isTransitioning =
    animationPhase === 'fadeOut' ||
    animationPhase === 'glowAnimation' ||
    animationPhase === 'fadeIn'
  const shouldExitUpperLayer = isTransitioning || isWarm
  const shouldSettleStayLayer = isTransitioning || isWarm
  const containerHeight = shouldSettleStayLayer && isWarm ? STAY_LAYER.height : STACK_HEIGHT

  return (
    <div
      className="cold-cloud-layers pointer-events-none fixed top-0 left-0 right-0 z-[5]"
      aria-hidden
    >
      <div
        className="cloud-stack relative w-full transition-[height,max-height,transform] duration-1000 ease-in-out"
        style={{
          height: `${(containerHeight / REF_WIDTH) * 100}vw`,
          maxHeight: containerHeight,
          transform: `translateY(${STACK_SHIFT_PX}px)`,
        }}
      >
        {CLOUD_LAYERS.map((layer) => {
          const isStayLayer = layer.id === 'clouds-2'
          const isUpperLayer = layer.id === 'clouds-3'

          return (
            <div
              key={layer.id}
              className={`cloud-layer-shell absolute left-0 w-full ${
                isUpperLayer && shouldExitUpperLayer ? 'cloud-layer-exit' : ''
              }`}
              style={{
                top: isStayLayer && shouldSettleStayLayer ? layer.settleTop : layer.top,
                zIndex: layer.zIndex,
              }}
            >
              <CloudMaskLayer layer={layer} isWarm={isWarm && isStayLayer} />
            </div>
          )
        })}
        <div
          className={`cold-cloud-tint absolute inset-0 ${shouldSettleStayLayer ? 'cold-cloud-tint-fade' : ''}`}
        />
      </div>
    </div>
  )
}
