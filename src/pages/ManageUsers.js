import React, { useEffect } from "react";
import { checkAdminLogin, displayUsers } from "../utils/users"
import { useNavigate } from "react-router-dom"
import { CUR_USER } from "../config/localStorage";

function ManageUsers() {
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div>
            {displayUsers(navigate)}
        </div>
    )
}
export default ManageUsers