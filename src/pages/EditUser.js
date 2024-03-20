import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserSettings, adminPasswordChange, checkAdminLogin } from "../utils/users"
import { CUR_USER, USER_TO_EDIT } from "../config/localStorage"


function UserSettings() {
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    const userToEditStr = localStorage.getItem(USER_TO_EDIT)
    const [passwords, setPasswords] = useState({ currentpassword: "", newpassword: "", newpasswordcheck: "" })
    const [userToEdit, setUserToEdit] = useState(userToEditStr ? JSON.parse(userToEditStr) : null)
    const [notify, setNotify] = useState(userToEdit ? userToEdit.notify : null)
    const [passwordNotice, setPasswordNotice] = useState("Password not Updated")
    const [passwordNoticeColor, setPasswordNoticeColor] = useState("red")
    const [image, setImage] = useState(userToEdit.image ? userToEdit.image : null)

    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(USER_TO_EDIT, JSON.stringify(userToEdit))
    }, [userToEdit])
    //Update Current user as form changes
    const handleChange = e => {
        setUserToEdit((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const onRadioChange = e => {
        setUserToEdit((prev) => ({
            ...prev,
            adminlevel: Number(e.target.value),
        }))
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
        setUserToEdit((prev) => ({
            ...prev,
            image: image.result,
        }))
    }

    if (!userToEdit) return <div> Loading </div>

    return (
        <div className="container" style={{ padding: 32 }}>
            <div className="row">
                <div className="col">
                    <div className="card" style={{ padding: 16 }}>
                        <h5 >Account For: {userToEdit.username}</h5>
                        <form>
                            <label style={{ marginTop: 16 }} > Current Password:
                                <input
                                    className="form-control"
                                    style={{ width: 200, marginLeft: 8 }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="currentpassword"
                                    autoComplete="current-password"
                                ></input>
                            </label>

                            <label style={{ marginTop: 16 }}> New Password:
                                <input
                                    className="form-control"
                                    style={{ width: 200, marginLeft: 8 }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="newpassword"
                                    autoComplete="new-password"
                                ></input>
                            </label>

                            <label style={{ marginTop: 16 }}> Re-Type New Password:
                                <input
                                    className="form-control"
                                    style={{ width: 200, marginLeft: 8 }}
                                    type="password"
                                    onChange={handlePasswordChange}
                                    name="newpasswordcheck"
                                    autoComplete="new-password"
                                ></input>
                            </label>
                        </form>
                        <p style={{ color: passwordNoticeColor, marginTop: 32 }}>{passwordNotice}</p>
                        <button type="button" className="btn btn-primary" style={{ marginTop: 30 }} onClick={() => {
                            if (adminPasswordChange(passwords) === true) {
                                setUserToEdit((prev) => ({
                                    ...prev,
                                    password: passwords.newpassword
                                }))
                                setPasswordNotice("Password Changed Sucessful")
                                setPasswordNoticeColor("green")
                            } else {
                                setPasswordNotice("Unable to change password")
                                setPasswordNoticeColor("red")
                            }
                        }}>Update Password</button>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{ padding: 16 }}>
                        <div className="container flex col">
                            <br />
                            {image != null && <img alt="" height={260} src={`${image}`} />}
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
                        <button type="button" className="btn btn-primary" style={{ marginLeft: 8, marginTop: 16 }} onClick={() => saveUserSettings(userToEdit)}>Save Profile Image</button>
                    </div>
                </div>
                {/* Settings column */}
                <div className="col">
                    <div className="card" style={{ padding: 16 }}>

                        <form>
                            <div className="form-control" style={{ marginLeft: 8, whiteSpace: "nowrap" }}>

                                <div className="form-check form-check-inline" style={{ marginLeft: 16 }}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={userToEdit.adminlevel === 3} value={3} disabled />
                                    <label className="form-check-label" htmlFor="inlineRadio1">3</label>
                                </div>
                                <div className="form-check form-check-inline" style={{ marginLeft: 16 }}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" checked={userToEdit.adminlevel === 2} onChange={onRadioChange} value={2} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                </div>
                                <div className="form-check form-check-inline" style={{ marginLeft: 16 }}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" checked={userToEdit.adminlevel === 1} onChange={onRadioChange} value={1} />
                                    <label className="form-check-label" htmlFor="inlineRadio3">1</label>
                                </div> <span style={{ marginLeft: 8, whiteSpace: "nowrap" }}>Admin Level</span>
                            </div>
                        </form>
                        <form style={{ marginTop: 16 }}>
                            <label className="form-control" style={{ marginLeft: 8 }}>
                                <input type="checkbox" name="notify" checked={notify} onChange={(e) => {
                                    setUserToEdit((prev) => ({
                                        ...prev,
                                        notify: !notify,
                                    }))
                                    setNotify(!notify)
                                }} />
                                <span style={{ marginLeft: 8, whiteSpace: "nowrap" }}>Enable Notifications</span>
                            </label>
                        </form>
                        <form>
                            <label style={{ marginTop: 16 }}> Low Stock Threshold:
                                <input
                                    className="form-control"
                                    style={{ width: 200, marginLeft: 8 }}
                                    type="text"
                                    onChange={handleChange}
                                    name="itemlimit"
                                    placeholder={userToEdit.itemlimit}
                                ></input>
                            </label>

                            <label style={{ marginTop: 16 }}> Expiry Threshold (Days):
                                <input
                                    className="form-control"
                                    style={{ width: 200, marginLeft: 8 }}
                                    type="text"
                                    onChange={handleChange}
                                    name="expirylimit"
                                    placeholder={userToEdit.expirylimit}
                                ></input>
                            </label>

                            <label style={{ marginTop: 16 }}> Email:
                                <input
                                    className="form-control"
                                    style={{ marginLeft: 8 }}
                                    type="text"
                                    onChange={handleChange}
                                    name="email"
                                    placeholder={userToEdit.email}
                                ></input>
                            </label>
                        </form>
                        <button type="button" className="btn btn-primary" style={{ marginTop: 40 }} onClick={() => { saveUserSettings(userToEdit) }}>Update Settings</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings