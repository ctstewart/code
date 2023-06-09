FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent
CMD ["npm", "start", "--", "time=1m", "fps=30"]