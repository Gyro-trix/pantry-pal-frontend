import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, saveUserSettings, changeUserPassword, userEmailExistsBesidesSelf } from "../utils/users"
import { CUR_USER,THEME } from "../config/localStorage"
import { inviteUser } from "../utils/messages";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function UserSettings() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    const [inviteEmail, setInviteEmail] = useState("")
    const [passwords, setPasswords] = useState({ currentpassword: "", newpassword: "", newpasswordcheck: "" })
    const [currentUser, setCurrentUser] = useState(currentUserStr ? JSON.parse(currentUserStr) : null)
    const [notify, setNotify] = useState(currentUser ? currentUser.notify : null)
    const [image, setImage] = useState(currentUser.image ? currentUser.image : null)

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(CUR_USER, JSON.stringify(currentUser))
    }, [currentUser])
    //Update Current user as form changes
    const handleChange = e => {
        setCurrentUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    //Sets reminder to save text if anything has changed
    const handleCheck = e => {
        setCurrentUser((prev) => ({
            ...prev,
            notify: !notify,
        }))
        setNotify(!notify)
    }
    //Collects passwords to attempt password change
    const handlePasswordChange = e => {
        setPasswords((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const reader = (file) =>
        new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.onload = () => resolve(fr)
            fr.onerror = (err) => reject(err)
            fr.readAsDataURL(file)
        })


    const handleFile = async (e) => {
        const image = await reader(e.target.files[0])
        setImage(image.result)
        setCurrentUser((prev) => ({
            ...prev,
            image: image.result,
        }))
    }

    const handleInvite = e => {
        setInviteEmail(e.target.value)
    }

    if (!currentUser) return <div> Loading </div>

    return (
        <div className="container" style={{ padding: 32 }}>
            <div className="row row-cols-2">
                <div className="col" style={{ marginBottom: 32 }}>
                    <div className="card" style={{ padding: 16 }}>
                        <h5>Welcome: {currentUser.username}</h5>
                        <form >
                        <label hidden={true} style={{ marginTop: 16}}>  User:
                                <input
                                    className="form-control"
                                    style={{ }}
                                    type="text"
                                    onChange={handlePasswordChange}
                                    name="username"
                                    autoComplete="username"
                                ></input>
                            </label>
                            
                            <label style={{ marginTop: 16 , width:"100%"}}>  Current Password:
                                <input
                                    className="form-control"
                                    style={{ }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="currentpassword"
                                    autoComplete="current-password"
                                ></input>
                            </label>
                            
                            <label style={{ marginTop: 16 , width:"100%"}}> New Password:
                                <input
                                    className="form-control"
                                    style={{ }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="newpassword"
                                    autoComplete="new-password"
                                ></input>
                            </label>
                            
                            <label style={{ marginTop: 16 , width:"100%"}}> Re-Type New Password:
                                <input
                                    className="form-control"
                                    style={{  }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="newpasswordcheck"
                                    autoComplete="new-password"
                                ></input>
                            </label>
                        </form>
                        <button type="button" className={theme.button} style={{ marginLeft: 8, marginTop: 32 }} onClick={() => {
                            if (changeUserPassword(passwords) === true) {
                                setCurrentUser((prev) => ({
                                    ...prev,
                                    password: passwords.newpassword
                                }))
                                toast("Password Change Successful", { position: "bottom-right", theme: theme.toast })
                            } else {
                                toast("Old Password not Correct", { position: "bottom-right", theme: theme.toast })
                            }
                        }}>Update Password</button>
                    </div>

                </div>
                <div className="col" style={{ marginBottom: 32 }}>
                    <div className="card" style={{ padding: 16, height:"100%" }}>
                        <div className="container flex col">
                            
                            <div style ={{height:200,display:"flex",justifyContent:"center"}}>{image != null && <img alt="" height={200} src={`${image}`} />}</div>
                            <div className="input-group mb-3" style={{ marginTop: 16 }}>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleFile}
                                />
                            </div>
                        </div>
                        <button type="button" className={theme.button} style={{ marginLeft: 8, marginTop: 16 }} onClick={() => saveUserSettings(currentUser, navigate)}>Save Profile Image</button>
                    </div>
                </div>
                {/* Settings column */}
                <div className="col">
                    <div className="card" style={{ padding: 16 }}>

                        <form style={{ marginTop: 32 }}>
                            <label className="form-control" style={{ }}>
                                <input className="form-check-input" type="checkbox" name="notify" checked={notify} onChange={handleCheck} />
                                <span style={{ marginLeft: 8, whiteSpace: "nowrap" }} >Enable Notifications</span>
                            </label>
                        </form>
                        <label style={{ marginTop: 16 }}> Low Stock Threshold:
                            <input
                                className="form-control"
                                style={{  }}
                                type="text"
                                onChange={handleChange}
                                name="itemlimit"
                                placeholder={currentUser.itemlimit}
                            ></input>
                        </label>

                        <label style={{ marginTop: 16 }}> Expiry Threshold (Days):
                            <input
                                className="form-control"
                                style={{  }}
                                type="text"
                                onChange={handleChange}
                                name="expirylimit"
                                placeholder={currentUser.expirylimit}
                            ></input>
                        </label>

                        <label style={{ marginTop: 16 }}> Email:
                            <input
                                className="form-control"
                                style={{ }}
                                type="text"
                                onChange={handleChange}
                                name="email"
                                placeholder={currentUser.email}
                            ></input>
                        </label>

                        <button type="button" className={theme.button} style={{  marginTop: 64 }} onClick={() => {
                            if(userEmailExistsBesidesSelf(currentUser)){
                                toast("Email already in Use", { position: "bottom-right", theme: theme.toast })
                            } else{
                                saveUserSettings(currentUser)
                                toast("Settings Saved", { position: "bottom-right", theme: theme.toast })
                                }
                            }
                        }
                            >Update Settings</button>
                    </div>
                </div>
                <div className="col">
                    <div className="card"style={{ padding: 16 }}>
                        <form>
                        <input
                            className="form-control"
                            style={{  marginRight:16 }}
                            type="text"
                            onChange={handleInvite}
                            name="invite"
                            placeholder="Invite by Email"
                        ></input>
                        </form>
                        <button type="button" className={theme.button} style={{ marginTop: 16 }} onClick={() => { inviteUser(currentUser, inviteEmail,navigate,"settings") }}>Invite</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings