import Image from "next/image";
import styled, { keyframes } from "styled-components";

export const TransLuccentCover = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  display: flex;
  flex-direction: column;
  padding-top: 18vh;
  justify-items: center;
  align-items: center;
  align-content: center;
  font-size: 15pt;
  text-align: center;
  font-weight: lighter;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 0.3s linear;
  transition: visibility 0.3s linear;
`

export const TextSubtitle = styled.h6`
  text-align: center;
  font-weight: 400;
  margin: 20px;
`

export const ShutterOverlay = styled.div`
  width: 100vw;
  height: 20vh;
  max-height: 160px;
  min-height: 140px;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  align-content: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    filter: blur(4px);
    opacity: 0;
  }

  to {
    filter: blur(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    filter: blur(0);
    opacity: 1;
  }

  to {
    filter: blur(4px);
    opacity: 0;
  }
`;

const statitionary = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

export const ShutterRottaingIMG = styled(Image)`
  animation: ${rotate} ${props => props.active == "true" ? "0.3s" : "2s"} linear infinite;
`

export const ScoreTeller = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? statitionary : fadeIn} 0.4s linear;
  transition: visibility 0.4s linear;
`

export const StatusFlag = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  margin: auto;
  background: white;
  width: 180px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 0.3s linear;
  transition: visibility 0.3s linear;
`

export const AnimationOverlay = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
`