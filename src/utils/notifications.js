import { ALL_STORAGES, CUR_USER, NOTIFICATIONS, THEME } from "../config/localStorage"
import { addFriend, getUserNameByID } from "./users"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as Icon from 'react-bootstrap-icons';

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
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === type && notification.dismissed === false) {
                return (
                    <div key={notification.id} className="card d-flex justify-content-evenly" style={{ marginTop: 16 }}>
                        <div className=" d-flex justify-content-between">
                            <label style={{ marginLeft: 16, marginTop: 8 }}>{notification.item} in {notification.storage} is {notification.type}</label>
                            <button type="button" className={theme.button} style={{ marginLeft: "auto" }} onClick={() => dismissNotification(notification.id)}>Dismiss</button>
                        </div>
                    </div>
                )
            } else {
                return ""
            }
        })
    }
}

export function displayInvites(currentUser) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === "invite" && notification.target === currentUser.id) {
                return (
                    <div key={notification.id} className="card d-flex justify-content-evenly" style={{ marginTop: 16 }}>
                        <div style={{ display: "inline-block" }}>
                            <label style={{ marginLeft: 16, marginTop: 8, display: "inline-block" }}>{getUserNameByID(notification.owner)} has invited you to their friends list.</label>


                            <button type="button" className={theme.button} style={{ display: "inline-block", float: "right" }} onClick={() => dismissNotification(notification.id)}>Decline</button>
                            <button type="button" className={theme.button} style={{ display: "inline-block", float: "right",marginRight:16 }} onClick={() => {
                                addFriend(currentUser, notification.owner)
                                deleteNotification(notification.id)
                            }}>Accept</button>
                        </div>
                    </div>
                )
            } else {
                return ""
            }
        })
    }
}

export function displayInvitesSmall(currentUser) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === "invite" && notification.target === currentUser.id) {
                return (
                    <div key={notification.id} className="card" style={{ whiteSpace: "no-wrap", display: "inline-block", marginTop: 16, padding: 8, marginLeft: 16, marginRight: 16 }}>


                        <span style={{ display: "inline-block", marginLeft: 16, marginTop: 8 }}>Invite From: {getUserNameByID(notification.owner)}</span>
                        <div className="button" style={{ marginLeft: 16, display: "inline-block", float: "right", backgroundColor: "green", height: 35, width: 35, borderRadius: "50%" }} onClick={() => {
                            addFriend(currentUser, notification.owner)
                            deleteNotification(notification.id)
                        }}><Icon.CheckCircle style={{}} size={35} /></div>
                        <div className="button" style={{ marginLeft: 16, display: "inline-block", float: "right", backgroundColor: "red", height: 35, width: 35, borderRadius: "50%" }} onClick={() =>
                            dismissNotification(notification.id)}>
                            <Icon.XCircle style={{}} size={35} /></div>


                    </div>
                )
            } else {
                return ""
            }
        })
    }
}

export function displayPendingInvites(currentUser) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === "invite" && notification.owner === currentUser.id && notification.dismissed === false) {
                return (
                    <div key={notification.id} className="card d-flex justify-content-evenly" style={{ marginTop: 16, padding: 8, marginLeft: 16, marginRight: 16 }}>
                        <div className=" d-flex justify-content-between">
                            <label style={{ marginLeft: 16 }}>Invite sent to: {getUserNameByID(notification.target)}</label>
                        </div>
                    </div>
                )
            } else {
                return ""
            }
        })
    }
}

export function numberOfNotifications() {
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null
    const notificationStr = localStorage.getItem(NOTIFICATIONS)
    let count = 0
    if (!(currentUser === null)) {
        if (!(notificationStr === null || notificationStr.trim() === "")) {
            const notifications = JSON.parse(notificationStr)
            notifications.forEach((notification) => {
                if (notification.dismissed === false) {
                    count++
                }
                if (notification.owner === currentUser.id && notification.type === "invite") {
                    count--
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

export function deleteNotification(notificationID) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = notificationsStr ? JSON.parse(notificationsStr) : []
    let filteredNotes = notifications.filter(notes => !notes.id.match(new RegExp('^' + notificationID + '$')))
    localStorage.setItem(NOTIFICATIONS, JSON.stringify(filteredNotes))
    window.location.reload()
}

export function checkInvites(currentUser, inviteID) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = notificationsStr ? JSON.parse(notificationsStr) : []
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)

    let response = true
    let toastResponse = 0
    notifications.forEach((note) => {
        if (note.owner === currentUser.id && note.target === inviteID) {
            toastResponse = 1
            response = false
        } else {
            response = true
        }
    })
    if (currentUser.friends.includes(inviteID)) {
        toastResponse = 2
        response = false
    }

    if (toastResponse === 1) {
        toast("Invite Already Sent", { position: "bottom-right", theme: theme.toast })
    } else if (toastResponse === 2) {
        toast("Already a Friend", { position: "bottom-right", theme: theme.toast })
    }
    return response
}

export function cleanUpInvites(targetUserID) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = notificationsStr ? JSON.parse(notificationsStr) : []
    let tempNotifications = []
    notifications.forEach(notification => {
        if (!(notification.owner === targetUserID || notification.target === targetUserID)) {
            tempNotifications = [...tempNotifications, notification]
        }
    })

    localStorage.setItem(NOTIFICATIONS, JSON.stringify(tempNotifications))
}

export function cleanUpNotifications(targetUserID) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = notificationsStr ? JSON.parse(notificationsStr) : []
    let tempNotifications = []
    notifications.forEach(notification => {
        if (!(notification.owner === targetUserID)) {
            tempNotifications = [...tempNotifications, notification]
        }
    })
    localStorage.setItem(NOTIFICATIONS, JSON.stringify(tempNotifications))
}