import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from "react-webcam";
import { getWindowDimensions } from '../modules/hooks/use-window-dimensions';
import { useState, useEffect, useRef } from 'react';
import Overlay from '../modules/index_modules/overlay';
import ShutterSection from '../modules/index_modules/shutter-section';
import StatusOverlay from '../modules/index_modules/status-overlay';
import * as tf from '@tensorflow/tfjs';
import Lottie from 'lottie-web'

import { ImageRequest  } from "../modules/proto_libs/predictor_pb"
import { PredictClient } from "../modules/proto_libs/predictor_grpc_web_pb"
import { AnimationOverlay } from '../modules/index_modules/styles';
import { GameStarted } from '../modules/game-started';

const GrpcClient = new PredictClient('https://rps.ai.hect.dev/api', null, null)
const GameST = new GameStarted()

export default function Home() {
  const webcamRef = useRef(null);
  const AnimatorRock = useRef(null);
  const AnimatorPaper = useRef(null);
  const AnimatorScissors = useRef(null);
  const [aHeight, setHeight] = useState(0)
  const [displayOverlay, setDisplayOverlay] = useState(true)
  const [aiScore, setAiScore] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [currentStatus, setCurrentStatus] = useState("Welcome!")
  const [keep, setKeep] = useState(true)
  const [playAnimation, setPlayAnimation] = useState(true)
  const [userSelection, setUserSelection] = useState(3)
  const [aiSelection, setAiSelection] = useState(3)

  useEffect(() => {
    if (playAnimation) {
      setPlayAnimation(false)
      Lottie.destroy()
      Lottie.loadAnimation({
        container: AnimatorRock.current,
        renderer: 'svg',
        name: "rockA",
        loop: false,
        autoplay: false,
        path: "/animations/rock.json",
      })
      
      Lottie.loadAnimation({
        container: AnimatorPaper.current,
        renderer: 'svg',
        name: "paperA",
        loop: false,
        autoplay: false,
        path: "/animations/paper.json",
      })
      
      Lottie.loadAnimation({
        container: AnimatorScissors.current,
        renderer: 'svg',
        name: "scissorsA",
        loop: false,
        autoplay: false,
        path: "/animations/scissors.json",
      })
    }
  }, [playAnimation])

  const tensorAsBuffer = async (tensor) => {
    const [height, width] = tensor.shape;
    const buffer = new Uint8ClampedArray(width * height * 4);
    const data = await tensor.data();
    let i = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pos = (y * width + x) * 4;
        buffer[pos] = data[i]; // R
        buffer[pos + 1] = data[i + 1]; // G
        buffer[pos + 2] = data[i + 2]; // B
        buffer[pos + 3] = 255; // Alpha
        i += 3;
      }
    }
    return buffer;
  };

  async function runPrediction() {
    return new Promise(async (res, rej) => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc != null) {
        tf.engine().startScope()
        var src = await load(imageSrc)
        var tensor = tf.browser.fromPixels(src)
        tensor = tf.image.resizeBilinear(tensor, [160, 160])
        encodeJpeg(tensor).then((data) => {
          var imageRequest = new ImageRequest()
          imageRequest.setBase64image(data.replace(/^data:image\/[a-z]+;base64,/, ""))

          GrpcClient.predictRoPaSc(imageRequest, null, (err, response) => {
            if (err) res(console.log(err))
            var takenClass = response.getPredictedclass();
            var confi = response.getConfidence();
            res([takenClass, confi])
          })
        })

        tf.engine().endScope()
        tf.dispose(tensor) 
      }
    })
    
  }

  function encodeJpeg(tensor) { 
    return new Promise(async (resolve) => {
      const [height, width] = tensor.shape;
      const buffer = await tensorAsBuffer(tensor);
      const imageData = new ImageData(width, height);
      imageData.data.set(buffer);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    })
  }

  function load(url){
    return new Promise((resolve, reject) => {
      const im = new Image()
          im.crossOrigin = 'anonymous'
          im.src = url
          im.onload = () => {
            resolve(im) 
          }
     })
  }

  function handleResize() {
    var {width, height} = getWindowDimensions();
    setHeight(height);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  function random(numbers) {
    return numbers[Math.floor(Math.random()*numbers.length)];
  }

  function findMajority(arr, n){
    let maxCount = 0;
    let index = -1;
     
    for(let i = 0; i < n; i++)
    {
        let count = 0;
        for(let j = 0; j < n; j++)
        {
            if (arr[i] == arr[j])
                count++;
        }
 
        if (count > maxCount)
        {
            maxCount = count;
            index = i;
        }
    }

    if (maxCount > n / 2)
        return arr[index];
    else
        return -1;
  }

  function evaluate(validationGroup, trigerer) {
    const sum = validationGroup.reduce((a, b) => a + b, 0);
    const avg = (sum / validationGroup.length) || 0;

    if (avg > 0.2 && avg < 0.7) {
      setCurrentStatus("Hold it for 2 seconds 🕑");
      window.setTimeout(() => {
        evaluate(validationGroup, trigerer)
      }, 250)
    } else if (avg > 0.7) {
      if (!GameST.getStarted()) {
        GameST.setStart(true)
        clearInterval(trigerer);
        setCurrentStatus("Starting! 🎉")
        startGame()
      }
    } else {
      setCurrentStatus("Detecting fist ✊")
      window.setTimeout(() => {
        evaluate(validationGroup, trigerer)
      }, 80)
    }
  }

  function waitForFist() {
    setUserSelection(-1)
    setAiSelection(-1)
    GameST.setStart(false)
    setDisplayOverlay(false);
    if (webcamRef.current != null) {
      setKeep(true)
      const validationGroup = [0, 0, 0, 0]

      const fistInterval = window.setInterval(() => {
        runPrediction().then((result) => {
          if (result != undefined && result != null && result[0] == 0) {
            validationGroup.pop()
            validationGroup.unshift(result[1])
          } else {
            validationGroup.pop()
            validationGroup.unshift(0)
          }
        })
      }, 50)

      evaluate(validationGroup, fistInterval)
    }
  }

  function startGame() {
    let decision = random([0, 1, 2])
    Lottie.stop()
    Lottie.play(["rockA", "paperA", "scissorsA"][decision])

    const validationGroup = [-1, -1, -1, -1]
    setTimeout(() => {

      let choiceInterval = setInterval(() => {
        runPrediction().then((result) => {
          if (result != undefined && result != null) {
            validationGroup.pop()
            validationGroup.unshift(result[0])
          } else {
            validationGroup.pop()
            validationGroup.unshift(-1)
          }
        })
      }, 50)

      let evaluationInterval = setInterval(() => {
        let selection = findMajority(validationGroup, 4)
        if (selection != -1) {
          clearInterval(evaluationInterval)
          clearInterval(choiceInterval)

          setUserSelection(selection)
          setAiSelection(decision)
          if((decision == 0 && selection == 2) || (decision == 1 && selection == 0) || (decision == 2 && selection == 1)) {
            setAiScore(aiScore => aiScore + 1)
            setCurrentStatus("AI wins! 😀")
          } else if (decision == selection) {
            setCurrentStatus("It's a tie 🪢")
          } else {
            setUserScore(userScore => userScore + 1)
            setCurrentStatus("Human wins! 😭")
          }
          setTimeout(waitForFist, 2000)
        }
      }, 80)
    }, 1800)
  }

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Rock Paper Scissors</title>
        <meta name="description" content="Play rock paper scissor with AI" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <AnimationOverlay ref={AnimatorRock} />
        <AnimationOverlay ref={AnimatorPaper} />
        <AnimationOverlay ref={AnimatorScissors} />
        <Overlay show={displayOverlay} />
        <StatusOverlay status={currentStatus} keep={keep} />
        <Webcam
          className={styles.camera}
          height={aHeight}
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <ShutterSection AiSelection={aiSelection} UserSelection={userSelection} AiScore={aiScore} UserScore={userScore} onClick={waitForFist}/>
      </main>
    </div>
  )
}
