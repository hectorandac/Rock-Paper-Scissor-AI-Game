# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: predictor.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0fpredictor.proto\x12\tpredictor\"#\n\x0cImageRequest\x12\x13\n\x0b\x62\x61se64image\x18\x01 \x01(\t\"=\n\x0fPredictionReply\x12\x16\n\x0epredictedClass\x18\x01 \x01(\x05\x12\x12\n\nconfidence\x18\x02 \x01(\x01\x32Q\n\x07Predict\x12\x46\n\rPredictRoPaSc\x12\x17.predictor.ImageRequest\x1a\x1a.predictor.PredictionReply\"\x00\x42.\n\x14io.grpc.ai.predictorB\x0ePredictorProtoP\x01\xa2\x02\x03HLWb\x06proto3')



_IMAGEREQUEST = DESCRIPTOR.message_types_by_name['ImageRequest']
_PREDICTIONREPLY = DESCRIPTOR.message_types_by_name['PredictionReply']
ImageRequest = _reflection.GeneratedProtocolMessageType('ImageRequest', (_message.Message,), {
  'DESCRIPTOR' : _IMAGEREQUEST,
  '__module__' : 'predictor_pb2'
  # @@protoc_insertion_point(class_scope:predictor.ImageRequest)
  })
_sym_db.RegisterMessage(ImageRequest)

PredictionReply = _reflection.GeneratedProtocolMessageType('PredictionReply', (_message.Message,), {
  'DESCRIPTOR' : _PREDICTIONREPLY,
  '__module__' : 'predictor_pb2'
  # @@protoc_insertion_point(class_scope:predictor.PredictionReply)
  })
_sym_db.RegisterMessage(PredictionReply)

_PREDICT = DESCRIPTOR.services_by_name['Predict']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\024io.grpc.ai.predictorB\016PredictorProtoP\001\242\002\003HLW'
  _IMAGEREQUEST._serialized_start=30
  _IMAGEREQUEST._serialized_end=65
  _PREDICTIONREPLY._serialized_start=67
  _PREDICTIONREPLY._serialized_end=128
  _PREDICT._serialized_start=130
  _PREDICT._serialized_end=211
# @@protoc_insertion_point(module_scope)
