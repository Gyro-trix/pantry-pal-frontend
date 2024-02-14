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
        <div>
            <div className="container ">
                <form className="flex row-auto" style={{ width: 200 }} >
                    <input
                        placeholder="Storage Name"
                        type="text"
                        name="name"
                        onChange={handleChange} />
                    <input
                        placeholder="Storage Type"
                        type="text"
                        name="type"
                        onChange={handleChange} />
                    <input
                        placeholder="Location"
                        type="text"
                        name="location"
                        onChange={handleChange} />
                </form>
                <button onClick={() => createStorage(newStorage, navigate)}>Add Storage</button>
            </div>
            <div className="container">

            </div>
        </div>
    )
}

export default CreateStorage;