FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent
<<<<<<< HEAD
CMD ["npm", "start"]
=======
CMD ["npm", "start"]
>>>>>>> 1c342a75106ff8869bbc758bb27d82e8eae2d35f
