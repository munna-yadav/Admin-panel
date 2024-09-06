FROM node:slim
WORKDIR /app
COPY package.json /app/
EXPOSE 3000
RUN npm install
COPY . .
CMD ["npm", "dev"]

