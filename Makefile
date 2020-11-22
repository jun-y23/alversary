login:
	aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 925179803769.dkr.ecr.ap-northeast-1.amazonaws.com/alversary

build:
	docker-compose build
	docker tag alversary_node:latest 925179803769.dkr.ecr.ap-northeast-1.amazonaws.com/alversary:latest
push:
	docker push 925179803769.dkr.ecr.ap-northeast-1.amazonaws.com/alversary:latest
