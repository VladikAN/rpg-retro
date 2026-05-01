# syntax=docker/dockerfile:1
# Multi-stage: Vite + TypeScript client build, then static embed into Go binary.

FROM node:20-alpine AS client
WORKDIR /src/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM golang:1.22-alpine AS server
RUN apk add --no-cache ca-certificates
WORKDIR /src/server
COPY server/go.mod ./
RUN go mod download
COPY server/ ./
COPY --from=client /src/client/dist ./web/dist
ENV CGO_ENABLED=0
RUN go build -trimpath -ldflags "-s -w" -o /rpg-retro .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates && \
  adduser -D -H -s /sbin/nologin app
COPY --from=server /rpg-retro /usr/local/bin/rpg-retro
USER app
EXPOSE 8080
ENV PORT=8080
CMD ["rpg-retro"]
