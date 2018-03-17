FROM debian:stretch

RUN apt-get update && apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    gnupg \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g webpack webpack-cli

RUN mkdir -p /srv/sudoku/spa
RUN mkdir -p /srv/tmp/logs

COPY . /srv/sudoku/spa

WORKDIR /srv/sudoku/spa
CMD npm install && npm run build
CMD nginx -c /srv/sudoku/spa/nginx.conf
