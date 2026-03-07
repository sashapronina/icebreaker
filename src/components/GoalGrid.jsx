import React from 'react'
import GoalCard from './GoalCard'

const GoalGrid = ({ goals, selectedGoal, onGoalSelect }) => {
  return (
    <div className="grid gap-4 mb-12" style={{ gridTemplateColumns: 'repeat(3, minmax(200px, 280px))', justifyContent: 'center' }}>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          isSelected={selectedGoal === goal.id}
          onSelect={onGoalSelect}
        />
      ))}
    </div>
  )
}

export default GoalGrid