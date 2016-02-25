FROM node:5.3.0

MAINTAINER Traceray o3oNet <917843296@qq.com>

#将本地的代码添加到目录，并指定其为当前的工作目录
COPY . /app
WORKDIR /app

# Install the dependencies modules
RUN npm install

# Run build
RUN npm run build

# Set the working directory

ENV NODE_ENV production

EXPOSE 9100

ENTRYPOINT ["node", "./bin/server.js"]
