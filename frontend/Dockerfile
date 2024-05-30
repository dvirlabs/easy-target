FROM node:20.13.1

WORKDIR /easy-target/frontend       

COPY public/ /easy-target/frontend/public
COPY src/ /easy-target/frontend/src
COPY package.json /easy-target/frontend/
COPY tsconfig.json /easy-target/frontend/
COPY .env /easy-target/frontend/

RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev

RUN npm install

CMD ["npm", "start"]