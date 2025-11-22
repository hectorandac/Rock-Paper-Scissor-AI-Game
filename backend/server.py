from concurrent import futures
import logging
import base64
import numpy as np
import grpc
import predictor_pb2
import predictor_pb2_grpc
import cv2 as cv
from yolov6.core.inferer import Inferer

# Initialize the Inferer
inferer = Inferer("", "./weights/yHand6.pt", 0, "./data.yaml", [160, 160], False)
class_names = ['rock', 'paper', 'scissors']

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Predictor(predictor_pb2_grpc.PredictServicer):
    def PredictRoPaSc(self, request, context):
        logging.info("Received request for prediction")
        
        # Decode the base64 image
        imageB64 = request.base64image
        try:
            # logging.info("Decoding base64 image")
            base64_decoded = base64.b64decode(imageB64)
            image = np.asanyarray(bytearray(base64_decoded), dtype=np.uint8)
            image = cv.imdecode(image, cv.IMREAD_COLOR)
            # logging.info("Image decoded successfully")
        except Exception as e:
            # logging.error(f"Failed to decode the image: {e}")
            return predictor_pb2.PredictionReply(predictedClass=-1, confidence=0)

        # Perform inference
        try:
            # logging.info("Running inference on the image")
            output2 = inferer.infer2(image)
            output = output2.cpu().numpy()[0]
            predicted_class = int(output[5])
            confidence = output[4]
            # logging.info(f"Inference successful. Predicted class: {predicted_class}, Confidence: {confidence}")
            return predictor_pb2.PredictionReply(predictedClass=predicted_class, confidence=confidence)
        except Exception as e:
            logging.error(f"Inference failed: {e}")
            return predictor_pb2.PredictionReply(predictedClass=-1, confidence=0)

def serve():
    port = '50051'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    predictor_pb2_grpc.add_PredictServicer_to_server(Predictor(), server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    logging.info(f"Server started, listening on port {port}")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
