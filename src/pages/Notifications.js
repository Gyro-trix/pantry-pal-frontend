import { displayNotifications } from "../utils/storage"

function Notifications() {

    return (
        <div>
            <h3>Low Inventory</h3>
            {displayNotifications("Low")}
            <h3>About to Expire</h3>
            {displayNotifications("Expired")}
        </div>
    )
}

export default Notifications