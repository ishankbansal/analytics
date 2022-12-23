import React from 'react'
import DateRangeComp from './components/DateRangeComp'
import TableComp from './components/TableComp'
import DateState from './context/DateState'
import SettingState from './context/SettingState'
import "./index.css"

const App = () => {
  return (
    <div>
      <h1 className="heading">Analytics</h1>
      <SettingState>
      <DateState>
        <DateRangeComp/>
        <TableComp/>
      </DateState>
      </SettingState>
    </div>
  )
}

export default App
