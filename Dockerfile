FROM node:20

WORKDIR /app

RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

# Install deps and (re)generate package-lock each build
COPY package.json ./
RUN npm install --ignore-scripts

# Copy the rest of the source (no .git expected)
COPY . .

EXPOSE 8080

CMD ["node", "scripts/dev-supervisor.js"]
