@echo off
docker build -t front/bs .
docker run -p 80:80 front/bs
