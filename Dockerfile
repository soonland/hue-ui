FROM node:lts-alpine

WORKDIR /app
# RUN set -ex && \
#     adduser node root && \
#     apk add --update --no-cache \
#       curl

COPY . .

RUN npm install
RUN npm run build

USER node
EXPOSE 8080

ENTRYPOINT ["npm"]
CMD ["run", "start"]