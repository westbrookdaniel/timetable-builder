import React from 'react'
import TimetableLayout from './Layout/TimetableLayout'

function App() {
  return (
    <div className="p-4">
      {/* Day Size */}
      {/* Time Slot Size */}
      <label htmlFor="new-period">
        New Period
        <input id="new-period" type="text" />
      </label>
      <TimetableLayout />
    </div>
  )
}

export default App
