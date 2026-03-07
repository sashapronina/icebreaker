import React from 'react'

const GoalCard = ({ goal, isSelected, onSelect }) => {
  const getIconSrc = (goalId) => {
    switch (goalId) {
      case 'feel_closer': return '/feelcloser.svg'
      case 'warm_up': return '/warmup.svg'
      case 'align': return '/align.svg'
      default: return '/feelcloser.svg'
    }
  }

  return (
    <button
      onClick={() => onSelect(goal.id)}
      className={`group relative p-4 rounded-xl transition-all duration-300 text-left bg-white hover:shadow-md ${
        isSelected
          ? 'ring-2 ring-slate-950 shadow-lg'
          : 'shadow-sm hover:shadow-md'
      }`}
      style={{ boxShadow: isSelected ? undefined : '0 0 16px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Small Icon at Top */}
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <img 
            src={getIconSrc(goal.id)} 
            alt={`${goal.title} icon`} 
            className="w-6 h-6 object-contain"
            style={{ display: 'block' }}
          />
        </div>
      </div>
      
      <div>
        <h3 className={`text-xl font-semibold mb-2 font-body ${
          isSelected ? 'text-slate-950' : 'text-black'
        }`}>
          {goal.title}
        </h3>
        <p className={`text-sm leading-relaxed font-body ${
          isSelected ? 'text-gray-600' : 'text-gray-600'
        }`}>
          {goal.description}
        </p>
      </div>
    </button>
  )
}

export default GoalCard