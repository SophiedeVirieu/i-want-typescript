FROM alpine:3.20 AS builder

# créer l'exécutable
WORKDIR ./compilation
RUN apk add --no-cache nodejs npm

COPY package*.json ./
RUN npm ci
# prend ce qui est dans le lock (presque install)(les mêmes que la dernière exécution)
COPY ./ ./
RUN npm run build

# compilation
FROM alpine:3.20 AS runner

RUN apk add --no-cache nodejs npm
WORKDIR ./execution
COPY --from=builder ./compilation/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder ./compilation/dist ./dist/

EXPOSE 8000

# exécution
CMD ["node", "./dist/index.js"]