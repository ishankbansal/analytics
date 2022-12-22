import { useState } from "react"


const SettingsComp = () => {

    const [toggle, setToggle] = useState(true);
    return (
        <div>
            <button onClick={() => setToggle(!toggle)} className="settings-button">Settings</button>

            {/* {toggle && <div className="filter">
                <p>Dimensions and Metrics</p>
                <button>Date</button>
                <button>App</button>
                <button>Ad Requests</button>
                <button>Ad Response</button>
                <button>Impression</button>
                <button>Clicks</button>
                <button>Revenue</button>
                <button>Fill Rate</button>
                <button>CTR</button>
            </div>} */}
        </div>
    )
}

export default SettingsComp
