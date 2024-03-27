import { CUR_STORAGE, CUR_USER, THEME } from "../config/localStorage"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import { checkUserLogin } from "../utils/users";
import { displayAdjustableItems } from "../utils/storage";


function AdjustStorage() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const currentItemList = JSON.parse(localStorage.getItem(CUR_STORAGE))

    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()

    //Check if user is logged in
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])


    return (
        <div className="container" style={{ padding: 16 }}>
            <div className="card" style={{ padding: 16 }}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{alignContent:"center"}}>
                                <div className="container" style={{marginLeft:16}} >
                                    <h1>{currentItemList.name}</h1>
                                    <br></br>
                                    <h2 >{currentItemList.type} at {currentItemList.location}</h2>
                                </div>
                            </td>
                            <td style={{display:"flex",justifyContent:"center"}}>
                                <Avatar unstyle={true} size={300} color={Avatar.getRandomColor('sitebase', theme.avatar)} src={currentItemList.image} name={currentItemList.name} textSizeRatio={1.5} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: 16 }}>
                    {displayAdjustableItems(navigate)}
                </div>
            </div>
        </div>
    )
}

export default AdjustStorage