# Etapa 1: Construção da aplicação Angular
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --output-path=dist/hering --configuration production

# Etapa 2: Configuração do Nginx para servir a aplicação
FROM nginx:alpine

COPY --from=build-stage /app/dist/hering/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
