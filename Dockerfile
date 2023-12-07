FROM node:18.19.0-alpine

WORKDIR /courier_saas_web

RUN npm i npm@latest -g
RUN npm i -g serve

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["npm", "start"]
CMD serve ./build
