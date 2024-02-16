import { displayNotifications } from "../utils/storage"

function Notifications() {

    return (
        <div className="card w-90" style={{ background: "lightblue", padding: 32}}>
            <h3>Low Inventory</h3>
            {displayNotifications("Low")}
            <h3>About to Expire</h3>
            {displayNotifications("Expired")}
        </div>
    )
}

export default Notifications