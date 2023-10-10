# syntax=docker/dockerfile:1

FROM node:14.15.5
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000