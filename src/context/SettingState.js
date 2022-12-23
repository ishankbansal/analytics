import { useState } from "react"
import SettingContext from './settingContext'


const SettingState = ({children}) => {
    const [settingsOpen, setSettingsOpen] = useState(true)
    return (
        <SettingContext.Provider value = {[settingsOpen, setSettingsOpen]}>
            {children}
        </SettingContext.Provider>
    )
}

export default SettingState
