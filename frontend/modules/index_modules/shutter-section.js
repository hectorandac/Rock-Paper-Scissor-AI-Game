import Image from "next/image";
import { useState } from "react";
import ScoreElement from "./score-element";
import { ShutterOverlay, ShutterRottaingIMG } from "./styles";

export default function ShutterSection({ callbackFunc, UserScore, AiScore, onClick, AiSelection, UserSelection }) {
    const [shutterActive, setShutterActive] = useState(false)
    const [showScore, setShowScore] = useState(true)
    const [onlyOnce, setOnlyOnce] = useState(false)

    function shutterClicked() {
        if (!onlyOnce) {
            setShutterActive(true)
            setShowScore(false)
            if (callbackFunc) {
                callbackFunc()
            }
            setOnlyOnce(true)
            onClick()
        }
    }

    return (
        <ShutterOverlay>
            <ScoreElement selection={AiSelection} out={showScore} title={"AI score"} score={AiScore} />
            <ShutterRottaingIMG alt="Shutter  button" src={"/rec.png"} active={shutterActive.toString()} width="80" height="80" onClick={shutterClicked} />
            <ScoreElement selection={UserSelection} out={showScore} title={"Your score"} score={UserScore} />
        </ShutterOverlay>
    )
}