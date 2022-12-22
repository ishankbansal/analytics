import { useState } from "react";
import DateContext from "./dateContext"
import { addDays } from 'date-fns'

const DateState = ({children}) => {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    return (
        <DateContext.Provider value = {[range, setRange]}>
            {children}
        </DateContext.Provider>
    )
}

export default DateState;
