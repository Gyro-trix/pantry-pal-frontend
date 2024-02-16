import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStorage } from "../utils/storage"



function CreateStorage() {
    const navigate = useNavigate()
    const [newStorage, setNewStorage] = useState()

    const handleChange = e => {
        setNewStorage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <div className="card w-25 mb-3" style={{ background: "lightblue", padding: 32, margin: "auto", marginTop: 64 }}>
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