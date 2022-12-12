
import { useEffect, useState } from "react";
import { ScoreTeller } from "./styles";

const EMOJIS = ["✊", "✋", "✌️", "🤔"]

export default function ScoreElement({title, score, out, selection}) {
    const [displaying, setDiplaying] = useState("🤔")
    useEffect(() => {
        setDiplaying(EMOJIS[selection == -1 ? 3  : selection])
    }, [selection])

    return (
        <ScoreTeller out={out}>
            <div>{ displaying }</div>
            <div style={{ fontWeight: '500' }}>{ title }</div>
            <div style={{ fontWeight: '100' }}>{ score }</div>
        </ScoreTeller>
    )
}