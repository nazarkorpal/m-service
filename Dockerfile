FROM node:18

WORKDIR /api
COPY . /api
RUN npm install
EXPOSE 8080
RUN chmod +x startup.sh

ENTRYPOINT [ "./startup.sh" ]