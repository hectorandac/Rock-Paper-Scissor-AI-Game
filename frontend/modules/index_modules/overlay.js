import Image from 'next/image'
import { TextSubtitle, TitleBottom, TitleTop, TitleWrapper, TransLuccentCover } from './styles'

export default function Overlay({ show }) {
    return (
        <TransLuccentCover out={!show}>
            <Image alt='Tutorial' src={"/tutorial.gif"} width="150" height="290" style={{marginBottom: "24px"}}/>
            AI Rock Paper Scissor
            <TextSubtitle>Press the shutter button to start playing!</TextSubtitle>
        </TransLuccentCover>
    )
}