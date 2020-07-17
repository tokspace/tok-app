import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../styled/Card";
import { Button } from "../components/Inputs";

export default function () {
    const { officeId } = useParams();

    return (
        <Card className="lt-card lt-shadow">
            <div class="Office">
                <p className="lt-card lt-hover text-align:left">
                    <b>Office Name</b>
                    <Button className="lt-button lt-hover  --lt-colours-lightgray: #f0f0f0">
                        Leave
                    </Button>
                </p>
            </div>

            <div class="Desk">
                <p className="lt-card lt-hover text-align:left">
                    <b>John D's Desk</b>
                    <Button className="lt-button lt-hover  --lt-colours-secondary: #84a59d">
                        Pull Up
                    </Button>{" "}
                </p>
                <p className="lt-card lt-hover text-align:left">
                    <b>Doanas's Desk</b>
                    <Button className="lt-button lt-hover  --lt-colours-secondary: #84a59d">
                        Pull Up
                    </Button>{" "}
                </p>

                <p className="lt-card lt-hover text-align:left">
                    <b>Mark's Desk</b>
                    <Button className="lt-button lt-hover  --lt-colours-secondary: #84a59d">
                        Pull Up
                    </Button>
                </p>
            </div>
        </Card>
    );
}
