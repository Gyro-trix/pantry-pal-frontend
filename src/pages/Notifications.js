import React, { useEffect,useState } from "react";
import { cleanUpNotifications, displayInvites, displayNotifications,gatherNotifications,numberOfNotifications } from "../utils/notifications"
import { checkUserLogin } from "../utils/users"
import { CUR_USER } from "../config/localStorage"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Notifications() {
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null
    const [notificationAmount,setnotificationAmount] = useState(numberOfNotifications())
    const navigate = useNavigate()
    
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        function handleRefresh() {
          setnotificationAmount(numberOfNotifications())
    
        }
        window.addEventListener('notify', handleRefresh);
        return () => window.removeEventListener('notify', handleRefresh);
      }, []);


    function refresh(){
        cleanUpNotifications(currentUser.id)
        gatherNotifications(currentUser)
    }

    return (
        <div className="container" style={{ margin: "auto", minWidth: 780 }}>
            <p hidden={true}>{notificationAmount}</p>
            <div className="row row-cols" style={{ padding: 32 }}>
                <div className="card" style={{ padding: 32 }}>
                    <div className="card-body">
                        <h3 className="card-title">Low Inventory</h3>
                        {displayNotifications("Low", currentUser)}
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">About to Expire</h3>
                        {displayNotifications("Expiring", currentUser)}
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Expired</h3>
                        {displayNotifications("Expired", currentUser)}
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Message Invites</h3>
                        {displayInvites(currentUser)}
                    </div>
                    <Button text="Refresh Notifications" click={()=>refresh} style={{marginTop:32}} />
                </div>
                
            </div>
           
        </div>
    )
}

export default Notifications