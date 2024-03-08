import { ALL_STORAGES, CUR_USER, NOTIFICATIONS } from "../config/localStorage"
//import { toast } from 'react-toastify';
//import "react-toastify/dist/ReactToastify.css";

export function gatherNotifications() {
    const allStoragesStr = localStorage.getItem(ALL_STORAGES)
    const currentUserStr = localStorage.getItem(CUR_USER)
    const allNotificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(currentUserStr === null || currentUserStr.trim() === "")) {
        const currentUser = JSON.parse(currentUserStr)
        const storages = allStoragesStr ? JSON.parse(allStoragesStr) : []
        const allNotifications = allNotificationsStr ? JSON.parse(allNotificationsStr) : []
        let allModifiedNotifications = [...allNotifications]
        if (!(storages === null)) {
            if (currentUser.notify === true) {
                storages.forEach((storage) => {
                    storage.items.forEach((item) => {
                        let itemnotif = null;
                        if (Number(item.quantity) <= Number(currentUser.itemlimit)) {
                            itemnotif = {
                                owner: currentUser.id,
                                storage: storage.name,
                                item: item.name,
                                type: "Low",
                                id: item.id,
                                dismissed: false
                            }
                        }
                        if (Number(expiryCompare(item.expiry)) <= Number(currentUser.expirylimit)) {
                            itemnotif = {
                                owner: currentUser.id,
                                storage: storage.name,
                                item: item.name,
                                type: "Expiring",
                                id: item.id,
                                dismissed: false
                            }
                        }
                        if (itemnotif) {
                            let exists = false;
                            if (allNotifications) {
                                allNotifications.forEach(n => {
                                    if (n["id"] === itemnotif["id"]) {
                                        exists = true;
                                    }
                                });
                            }
                            if (exists === false) {
                                allModifiedNotifications.push(itemnotif)
                            }
                        }
                    })
                })
                localStorage.setItem(NOTIFICATIONS, JSON.stringify(allModifiedNotifications))
            }
        }
    }
}
//Compares dates to see the difference
export function expiryCompare(date) {
    const expirydate = new Date(date)
    const currentdate = new Date()
    const datediff = expirydate.getTime() - currentdate.getTime()
    const daydiff = (datediff / (1000 * 60 * 60 * 24)).toFixed(0)
    if (daydiff < 0) {
        console.log("expired")
    } else {
        return daydiff
    }
}
//Sets dismiss notification to true
export function dismissNotification(notificationID) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = JSON.parse(notificationsStr)
    notifications.forEach((notification) => {
        if (notificationID === notification.id) {
            notification.dismissed = true
            localStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications))
            window.location.reload()
        }
    })
}
//Display notifications on page, needs formatting updated
export function displayNotifications(type) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === type && notification.dismissed === false) {
                return (
                    <div key={notification.id} className="card d-flex justify-content-evenly">
                        <div className=" d-flex justify-content-between">
                            <label style={{ marginLeft: 16, marginTop:8 }}>{notification.item} in {notification.storage} is {notification.type}</label>
                            
                            <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => dismissNotification(notification.id)}>Dismiss</button>
                            
                        </div>
                    </div>
                )
            } else {
                return ""
            }
        })
    }
}
// Counts number of notifications not yet dismissed, needs to take into effect is a user is signed in
export function numberOfNotifications() {
    const notificationStr = localStorage.getItem(NOTIFICATIONS)
    let count = 0
    if (!(notificationStr === null || notificationStr.trim() === "")) {
        const notifications = JSON.parse(notificationStr)
        notifications.forEach((notification) => {
            if (notification.dismissed === false) {
                count++
            }
        })
        if (count <= 0) {
            return ""
        } else {
            return count
        }

    } else {
        return ""
    }

}
// Delete a notification, to be used when an item is deleted to remove any coresponding notifications
export function notificationCleanUp() {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = notificationsStr ? JSON.parse(notificationsStr) : []
    const allStorages = JSON.parse(localStorage.getItem(ALL_STORAGES))
    let tempNotifications = []
    allStorages.forEach((storage) => {
        let tempItemList = storage.items ? storage.items : []
        tempItemList.forEach((item) => {
            notifications.forEach((notification) => {
                if (notification.id === item.id) {
                    tempNotifications = [...tempNotifications, notification]
                }
            })
        })
    })

    localStorage.setItem(NOTIFICATIONS, JSON.stringify(tempNotifications))
    numberOfNotifications()
}