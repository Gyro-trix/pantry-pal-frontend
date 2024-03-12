import React, { useEffect, useState, useRef } from "react";

function Nutrition(props) {
    console.log(props)
    const nutrData = Object.entries(props.nutrition)
    console.log(nutrData)
    return (props.trigger) ? (
        <div className="card">
            <button>X</button>
            <table className="table table-info table-striped" style={{ background: "white" }}>
            <tbody>
                <tr key="header">
                    <th scope="col">Nutrition</th>
                    <th scope="col">Value</th>
                </tr>
                {nutrData.map((entry,index)=>
                <tr>
                    <td>
                       {entry[0]}
                    </td>
                    <td>
                        {entry[1]}
                    </td>
                </tr>
                )}
                
            </tbody>
            </table>
        </div>
    ) : ""

}
//
export default Nutrition