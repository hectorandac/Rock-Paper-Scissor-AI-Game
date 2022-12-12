# Rock Paper Scissor AI Game
This repository holds the code and that belongs to an AI Rock Paper Scissors Game. We've organized it in a way that allow any one to run it in a docker environment, however some changes might be required considering that our local IPs and Public accessible uri are hard coded in the code 10.147.20.151; so in order to make it run replace the existence of both of them with your own local IP and rebuild the docker images.

We are using some code that wasn't developed by us ([yolov6](https://github.com/hectorandac/Rock-Paper-Scissor-AI-Game/tree/main/backend/yolov6)) this belongs to the (YOLOv6)[https://github.com/meituan/YOLOv6] project. We are using an slightly version of their work to extract the inference results. Additional work will be done in the future to only extract the required function.

Feel free to access this project on your mobile device at https://rps.ai.hect.dev/

The weights were generated with our [Backend Git Project](https://github.com/hectorandac/AI-Rock-Paper-Scissors-DEV)

![tutorial](https://user-images.githubusercontent.com/20134188/206982865-cbc5c985-9d4a-4788-9819-8c2b84f1c21a.gif)
