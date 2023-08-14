# Utilisez une image de base Node.js
FROM node:18-alpine

# Créez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et package-lock.json pour installer les dépendances
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

# Copiez le code source de l'application
COPY . .

# Exposez le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
