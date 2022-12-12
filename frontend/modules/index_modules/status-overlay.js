import { useEffect, useState } from "react";
import { StatusFlag } from "./styles";

const ID_LIST = []

export default function StatusOverlay({status, keep}) {
    const [hide, setHide] = useState(false)

    function fadeOut() {
        if (!keep) {
            setHide(true)
        }
    }

    if (keep && typeof window !== "undefined") {
        ID_LIST.push(window.setTimeout(function() {}, 0));

        ID_LIST.forEach((id) => {
            window.clearTimeout(id);
        })
    }

    useEffect(() => {
        setHide(false)
    }, [status])

    useEffect(() => {
        setTimeout(fadeOut, 2000)
    }, [keep])

    return (
        <StatusFlag out={hide}>
            {status}
        </StatusFlag>
    )
}