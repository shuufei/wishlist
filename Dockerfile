FROM node:12-alpine
EXPOSE 3333
WORKDIR /wishlist
COPY package.json ./
RUN npm install
COPY . .
RUN npx nx build wishlist-graphql-api
CMD ["node", "./dist/apps/wishlist-graphql-api/main.js"]
