import { displayUsers } from "../utils/users"
import { useNavigate } from "react-router-dom"

function ManageUsers() {
    const navigate = useNavigate()
    return (
        <div>
            {displayUsers(navigate)}
        </div>
    )
}
export default ManageUsers