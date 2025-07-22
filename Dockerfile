FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

ARG VITE_API_URL
ARG VITE_RECAPTCHA_SITE_KEY

RUN VITE_API_URL=${VITE_API_URL} VITE_RECAPTCHA_SITE_KEY=${VITE_RECAPTCHA_SITE_KEY} npm run build

FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./

COPY --from=frontend-builder /app/frontend/dist ./public/react
EXPOSE 5001
CMD ["node", "server.js"]
