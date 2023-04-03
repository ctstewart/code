IMAGE_NAME ?= "heelercs/hiddenvillage-performancetest:latest"
.DEFAULT_GOAL := push

.PHONY: all build push

all: build push

build:
	docker build --platform=linux/amd64 -t $(IMAGE_NAME) .

push: build
	docker push $(IMAGE_NAME)