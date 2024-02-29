import React, { useEffect } from "react";
import { displayNotifications } from "../utils/notifications"
import { checkUserLogin } from "../utils/users"
import { CUR_USER } from "../config/localStorage"
import { useNavigate } from "react-router-dom";

function Notifications() {
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div className="row row-cols" style={{ padding: 32 }}>
            <div className="card" style={{ padding: 32 }}>
                <div className="card-body">
                    <h3 className="card-title">Low Inventory</h3>
                    {displayNotifications("Low")}
                </div>
                <div className="card-body">
                    <h3 className="card-title">About to Expire</h3>
                    {displayNotifications("Expiring")}
                </div>
            </div>
        </div>
    )
}

export default Notifications