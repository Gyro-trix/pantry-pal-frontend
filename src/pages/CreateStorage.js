import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStorage } from "../utils/storage"
import { checkUserLogin} from "../utils/users"
import { CUR_USER } from "../config/localStorage"

function CreateStorage() {
    const navigate = useNavigate()
    const [newStorage, setNewStorage] = useState()
    const currentUserStr = localStorage.getItem(CUR_USER)

    const handleChange = e => {
        setNewStorage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div className="card w-25 mb-3" style={{padding: 32, margin: "auto", marginTop: 64, minWidth: 400 }}>
            <form className="flex row-auto"  >
                <div className="input_group mb-3">
                    <input
                        className="form-control"
                        placeholder="Storage Name"
                        type="text"
                        name="name"
                        onChange={handleChange} />
                </div>
                <div className="input_group mb-3">
                    <input
                        className="form-control"
                        placeholder="Storage Type"
                        type="text"
                        name="type"
                        onChange={handleChange} />
                </div>
                <div className="input_group mb-3">
                    <input
                        className="form-control"
                        placeholder="Location"
                        type="text"
                        name="location"
                        onChange={handleChange} />
                </div>

            </form>
            <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap", marginTop: 16 }} onClick={() => createStorage(newStorage, navigate)}>Add Storage</button>

        </div>
    )
}

export default CreateStorage;