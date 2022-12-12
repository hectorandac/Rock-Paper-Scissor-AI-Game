FROM nvidia/cuda:11.6.2-base-ubuntu20.04

RUN apt-get update
RUN apt-get install software-properties-common -y
RUN add-apt-repository --yes ppa:deadsnakes/ppa
RUN apt-get install -y python3.10-dev curl build-essential ffmpeg libsm6 libxext6
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

WORKDIR /app
ADD . .

RUN pip --version
RUN pip install nvidia-pyindex
RUN pip install pytorch-quantization
RUN pip --no-cache install -r requirements.txt

ADD builder.py /usr/local/lib/python3.10/dist-packages/google/protobuf/internal/

EXPOSE 50051
ENV PORT 50051

CMD python3.10 server.py