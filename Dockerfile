# Stage 1: Build the React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

# Stage 2: Create the Production Server
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
# Copy the built React app from the previous stage
COPY --from=frontend-builder /app/frontend/dist ./public/react
EXPOSE 5000
CMD ["node", "server.js"]
