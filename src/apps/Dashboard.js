import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, Redirect } from "react-router-dom";

export default function() {
    const user = useContext(UserContext);

    if (user.tokProfile.offices.length === 1) {
        return <Redirect to={`/office/${user.tokProfile.offices[0].office.id}`}/>;
    } else {
        return (
            <ul>
                {user.tokProfile.offices.map(office =>
                    <li><Link to={`/office/${office.office.id}`}>{office.name}</Link></li>)}
            </ul>
        );
    }
}