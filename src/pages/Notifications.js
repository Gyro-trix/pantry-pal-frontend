import React, { useEffect } from "react";
import { displayNotifications } from "../utils/notifications"
import { checkUserLogin} from "../utils/users"
import { CUR_USER } from "../config/localStorage"
import { useNavigate } from "react-router-dom";

function Notifications() {
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div className="card w-90" style={{ background: "lightblue", padding: 32}}>
            <h3>Low Inventory</h3>
            {displayNotifications("Low")}
            <h3>About to Expire</h3>
            {displayNotifications("Expiring")}
        </div>
    )
}

export default Notifications