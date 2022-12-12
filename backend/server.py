from concurrent import futures
import logging
import base64
import numpy as np
import grpc
import predictor_pb2
import predictor_pb2_grpc
import cv2 as cv
from yolov6.core.inferer import Inferer


inferer = Inferer("", "./weights/yHand6.pt", 0, "./data.yaml", [160, 160], False)
class_names = ['rock', 'paper', 'scissors']

class Predictor(predictor_pb2_grpc.PredictServicer):
    def PredictRoPaSc(self, request, context):
        imageB64 = request.base64image
        base64_decoded = base64.b64decode(imageB64)
        image = np.asanyarray(bytearray(base64_decoded), dtype=np.uint8)
        image = cv.imdecode(image, cv.IMREAD_COLOR)
        output2 = inferer.infer2(image)
        try:
            output = output2.cpu().numpy()[0]
            return predictor_pb2.PredictionReply(predictedClass=int(output[5]), confidence=output[4])
        except:
            return predictor_pb2.PredictionReply(predictedClass=-1, confidence=0)


def serve():
    port = '50051'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    predictor_pb2_grpc.add_PredictServicer_to_server(Predictor(), server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()