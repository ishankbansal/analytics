import { useContext, useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import dateContext from '../context/dateContext'
import settingContext from '../context/settingContext'

const DateRangeComp = () => {

    const [range, setRange] = useContext(dateContext);        
    const [open, setOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useContext(settingContext);

    const refOne = useRef(null)

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])
    
    const hideOnEscape = (e) => {
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }
       
    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }
    return (
        <div className="calendarWrap">
            <div>
                <input
                    value={`${format(range[0].startDate, "MMM dd")} to ${format(range[0].endDate, "MMM dd, YYY")}`}
                    readOnly
                    className="inputBox"
                    onClick={ () => setOpen(open => !open) }
                />

                <div ref={refOne}>
                    {open && 
                    <DateRange
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        className="calendarElement"
                    />
                    }
                </div>
            </div>

            <button className="settings-button" onClick={() => setSettingsOpen(!settingsOpen)}>Settings</button>
        </div>
    )
}

export default DateRangeComp
