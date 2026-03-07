import React from 'react'

const PromptQuestion = ({ question = "What is this icebreaker for?" }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-heading font-bold text-black mb-4">
        {question}
      </h1>
    </div>
  )
}

export default PromptQuestion