import React, { useEffect } from "react";
import { displayInvites, displayNotifications } from "../utils/notifications"
import { checkUserLogin } from "../utils/users"
import { CUR_USER } from "../config/localStorage"
import { useNavigate } from "react-router-dom";

function Notifications() {
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null
    const navigate = useNavigate()

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div className="row row-cols" style={{ padding: 32, minWidth:500, maxWidth:800 }}>
            <div className="card" style={{ padding: 32 }}>
                <div className="card-body">
                    <h3 className="card-title">Low Inventory</h3>
                    {displayNotifications("Low")}
                </div>
                <div className="card-body">
                    <h3 className="card-title">About to Expire</h3>
                    {displayNotifications("Expiring")}
                </div>
                <div className="card-body">
                    <h3 className="card-title">Message Invites</h3>
                    {displayInvites(currentUser)}
                </div>
            </div>
        </div>
    )
}

export default Notifications