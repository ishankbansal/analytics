import React from 'react'
import DateRangeComp from './components/DateRangeComp'
import SettingsComp from './components/SettingsComp'
import TableComp from './components/TableComp'
import DateState from './context/DateState'
import "./index.css"

const App = () => {
  return (
    <div>
      <DateState>
        <DateRangeComp/>
        <SettingsComp/>
        <TableComp/>
      </DateState>
    </div>
  )
}

export default App
