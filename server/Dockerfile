# ---------- Stage 1 ----------
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

COPY --from=base /app ./

EXPOSE 3000

CMD ["npm", "start"]