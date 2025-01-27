# Laboratoire : Déploiement d'une Application Web avec Docker

## Objectif
Créer et déployer une application web simple en utilisant Docker, en apprenant à manipuler les images, les volumes et les ports.

## Durée estimée
2 heures

## Prérequis
- Docker installé sur votre machine
- Accès à internet
- Éditeur de texte
- Terminal ou invite de commande

## Matériel fourni
- Template HTML de base (index.html)
- Fichier de configuration nginx (nginx.conf)

## Instructions étape par étape (MacOS / Linux)

### 1. Sélection et importation de l'image (15 min)
1. Rechercher l'image nginx sur Docker Hub
```bash
docker search nginx
```
2. Télécharger l'image nginx officielle
```bash
docker pull nginx:latest
```
3. Vérifier que l'image est bien importée
```bash
docker images
```

### 2. Préparation de l'environnement (20 min)
1. Créer une structure de répertoires pour le projet
```bash
mkdir -p mon-site-web/{html,config}
cd mon-site-web
```

2. Créer le fichier index.html dans le répertoire html/
```html
<!DOCTYPE html>
<html>
<head>
    <title>Ma première page avec Docker</title>
</head>
<body>
    <h1>Bienvenue sur mon site web Docker!</h1>
    <p>Cette page est servie depuis un conteneur Docker.</p>
</body>
</html>
```

### 3. Création du Dockerfile (30 min)
1. Créer un fichier Dockerfile à la racine du projet
2. Ajouter le contenu suivant :
```dockerfile
FROM nginx:latest

# Copier la configuration nginx personnalisée
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers du site
COPY html/ /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80
```

### 4. Configuration des volumes (30 min)
1. Créer un volume Docker pour les fichiers du site
```bash
docker volume create web_data
```

2. Modifier le Dockerfile pour utiliser le volume
```dockerfile
VOLUME /usr/share/nginx/html
```

### 5. Configuration réseau (15 min)
1. Construire l'image
```bash
docker build -t mon-site-web .
```

2. Lancer le conteneur avec les ports et volumes configurés
```bash
docker run -d \
    --name mon-site \
    -p 8080:80 \
    -v web_data:/usr/share/nginx/html \
    -v $(pwd)/html:/usr/share/nginx/html \
    mon-site-web
```

### 6. Test et validation (10 min)
1. Vérifier que le conteneur est en cours d'exécution
```bash
docker ps
```

2. Accéder à l'application via le navigateur
- Ouvrir http://localhost:8080

## Exercices supplémentaires

1. Modification en temps réel
- Modifier le fichier index.html
- Observer les changements en direct grâce au volume monté

2. Exploration des logs
```bash
docker logs mon-site
```

3. Personnalisation
- Ajouter du CSS à votre page
- Ajouter une image à votre site
- Modifier la configuration nginx

## Discussion de groupe
1. Le contenu de votre Dockerfile
2. Les commandes utilisées
3.Les observations
   - Les difficultés rencontrées
   - Les solutions trouvées
   - Les apprentissages réalisés


## Ressources utiles
- Documentation officielle Docker
- Documentation Nginx
- Guide des volumes Docker
- Guide des ports Docker

## Conclusion
À la fin de ce laboratoire, vous aurez acquis les compétences fondamentales pour :
- Manipuler les images Docker
- Créer et configurer des conteneurs
- Gérer les volumes
- Configurer les ports réseau
- Déployer une application web simple
