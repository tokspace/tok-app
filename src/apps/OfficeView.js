import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function() {
    const { officeId } = useParams();

    return <p>Hello and welcome to {officeId}</p>;
}