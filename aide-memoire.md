Voici l'aide-mémoire mis à jour avec des liens vers des ressources pertinentes pour chaque section. Je vais le mettre à jour au fur et à mesure que nous avançons dans la session. 

# Aide-mémoire pour la gestion d'images et conteneurs Docker sous Windows

## Introduction
Ce document fournit des conseils et astuces pour vous aider à mieux gérer vos images et conteneurs Docker dans un environnement Windows. Vous apprendrez à vérifier la syntaxe de vos fichiers Dockerfile avec Hadolint, à régler des problèmes courants liés à la commande COPY, à comprendre la différence entre ENTRYPOINT et CMD, à gérer le système de fichiers et les permissions dans une image Docker, à effacer le cache et à configurer le pare-feu Windows pour permettre l'accès à vos conteneurs.

## 1. Vérification de la syntaxe des Dockerfiles avec Hadolint 
Hadolint est un outil qui permet de vérifier la syntaxe et les bonnes pratiques dans l'écriture de vos fichiers Dockerfile. Pour l'utiliser :

1. Installez Hadolint en suivant les instructions sur https://github.com/hadolint/hadolint 
2. Ouvrez un terminal PowerShell et naviguez jusqu'au dossier contenant votre Dockerfile
3. Exécutez la commande suivante : 
   ```
   hadolint Dockerfile
   ```
4. Hadolint va analyser votre Dockerfile et signaler les erreurs et suggestions d'amélioration. Corrigez les problèmes avant de construire votre image.

Utiliser Hadolint régulièrement vous aidera à écrire des Dockerfiles plus propres, standardisés et exempts d'erreurs. C'est un peu comme un correcteur orthographique pour vos Dockerfiles. Il vous évitera de perdre du temps à déboguer des erreurs de syntaxe basiques.

**Ressources :**
- Documentation officielle de Hadolint : https://github.com/hadolint/hadolint
- Bonnes pratiques pour écrire des Dockerfiles : https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

## 2. Régler les problèmes avec la commande COPY
Si vous rencontrez des fichiers qui ne sont pas copiés au bon endroit lors de la construction de votre image, vérifiez bien :

- Que les chemins source et destination dans l'instruction COPY sont corrects 
- Que le fichier/dossier source existe bien à l'endroit spécifié par rapport au contexte de build
- Qu'il n'y a pas de faute de frappe dans les noms de fichier/dossier
- Que vous utilisez bien les slashes (/) comme séparateurs de chemin et non les backslashes (\)

Exemple d'utilisation correcte : 
```
COPY src/mon-app/ /app
```

Ici, le contenu du sous-dossier src/mon-app/ est copié dans le dossier /app à la racine du système de fichiers de l'image.

Une erreur fréquente est d'essayer de copier un fichier qui n'existe pas dans le contexte de build (le dossier où se trouve le Dockerfile). Docker ne peut copier que les fichiers présents dans ce contexte ou dans l'une de ses sous-arborescences. Si votre fichier à copier se trouve ailleurs, vous devrez d'abord le déplacer dans un sous-dossier du contexte de build.

**Ressources :**
- Documentation de la commande COPY : https://docs.docker.com/engine/reference/builder/#copy
- Explication du contexte de build : https://docs.docker.com/engine/reference/commandline/build/#extended-description

## 3. Différence entre ENTRYPOINT et CMD
ENTRYPOINT et CMD permettent tous deux de spécifier la commande à exécuter quand le conteneur démarre, mais il y a une différence subtile :

- ENTRYPOINT définit la commande principale du conteneur, son but essentiel. Elle ne doit pas être changée facilement. 
- CMD spécifie les arguments par défaut qui seront envoyés à ENTRYPOINT.  

Quand vous lancez un `docker run`, les arguments après le nom d'image remplaceront ceux définis dans CMD mais pas ceux dans ENTRYPOINT.

Un exemple d'utilisation des deux ensemble : 
```
ENTRYPOINT ["java"]  
CMD ["-jar", "monappli.jar"]
```
Cela lancera le conteneur en exécutant `java -jar monappli.jar`, mais on pourra facilement remplacer monappli.jar par un autre jar lors du docker run.

Imaginez ENTRYPOINT comme le verbe d'une phrase et CMD comme le complément d'objet. ENTRYPOINT est l'action principale, CMD vient la préciser. On peut facilement changer le complément sans changer le sens de la phrase, mais changer le verbe changerait complètement son interprétation !

**Ressources :**
- Documentation ENTRYPOINT : https://docs.docker.com/engine/reference/builder/#entrypoint
- Documentation CMD : https://docs.docker.com/engine/reference/builder/#cmd
- Différences entre ENTRYPOINT et CMD : https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/

## 4. Gestion du système de fichiers et des permissions
Quelques bonnes pratiques pour les droits sur les fichiers :

- N'utiliser `RUN chown` ou `RUN chmod` qu'en cas de nécessité absolue. Préférez copier les fichiers avec les bons droits directement. 
- Évitez d'utiliser sudo dans vos Dockerfiles, cela peut causer des problèmes de permissions.
- Utilisez un utilisateur non-root dédié pour exécuter votre application au sein du conteneur.

Si vous copiez des fichiers depuis l'hôte, utilisez le drapeau --chown pour spécifier l'utilisateur et groupe associés :
```
COPY --chown=user:group src/fichier /app/fichier
```

Il est important de configurer correctement les droits sur les fichiers et dossiers dans vos images Docker. En effet, les conteneurs partagent le même noyau que l'hôte, donc tout conteneur compromis pourrait potentiellement accéder aux fichiers de l'hôte s'ils ont des droits trop permissifs. Appliquer le principe du moindre privilège et n'accorder aux processus conteneurisés que les droits dont ils ont strictement besoin permet de réduire la surface d'attaque.

**Ressources :**
- Gestion des utilisateurs dans les Dockerfiles : https://medium.com/@mccode/understanding-how-uid-and-gid-work-in-docker-containers-c37a01d01cf
- Bonnes pratiques de sécurité : https://snyk.io/blog/10-docker-image-security-best-practices/

## 5. Effacer le fichier vhdx de Docker System
Le fichier Docker.vhdx peut grossir rapidement et causer des problèmes de cache et performance. Il est situé dans le dossier %LOCALAPPDATA%\Docker\wsl\data. Pour le supprimer :

1. Arrêtez le service Docker
2. Supprimez le fichier Docker.vhdx dans %LOCALAPPDATA%\Docker\wsl\data
3. Redémarrez le service Docker

Attention, cela effacera aussi tous vos conteneurs et images, il faudra les re-télécharger/reconstruire.

Ce fichier vhdx sert à stocker les données des conteneurs et images Docker. Il peut vite atteindre une taille conséquente si vous manipulez de nombreuses images, surtout volumineuses. Le supprimer permet de repartir d'un état "propre", mais attention à bien sauvegarder les données importantes de vos conteneurs avant, par exemple avec `docker cp`.

**Ressources :**
- Emplacement et rôle des fichiers Docker sous Windows : https://stackoverflow.com/a/62964028
- Sauvegarder et restaurer des données avec docker cp : https://docs.docker.com/engine/reference/commandline/cp/

## 6. Utiliser `docker system prune` pour nettoyer le cache
Pour supprimer les ressources inutilisées (images, conteneurs, volumes et réseaux) et libérer de l'espace disque :

1. Arrêtez tous vos conteneurs en cours d'exécution
2. Lancez la commande suivante dans PowerShell :
   ```
   docker system prune -a
   ```
3. Tapez "y" pour confirmer

Cela va effacer tous les objets Docker inutilisés. Vos conteneurs devront être recréés et vos images re-téléchargées/reconstruites si besoin.

`docker system prune` est très pratique pour faire un peu de ménage quand votre disque commence à être plein. Cela vous évitera d'avoir à chercher et supprimer manuellement les images et conteneurs dont vous ne vous servez plus. Vous pouvez l'exécuter régulièrement pour garder un système bien organisé et éviter que les fichiers Docker ne mangent tout votre espace disque !

**Ressources :**
- Documentation `docker system prune` : https://docs.docker.com/engine/reference/commandline/system_prune/
- Autres commandes pour gérer l'espace disque : https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes

## 7. Configuration du pare-feu Windows pour l'accès aux conteneurs
Si vos conteneurs ne sont pas accessibles depuis l'hôte sur les ports exposés, il faut autoriser les connexions entrantes dans le pare-feu :

1. Ouvrez le Panneau de configuration > Système et sécurité > Pare-feu Windows Defender 
2. Cliquez sur "Paramètres avancés"
3. Cliquez-droit sur "Règles de trafic entrant" et sélectionnez "Nouvelle règle"
4. Choisissez le type "Port" et cliquez sur "Suivant" 
5. Sélectionnez "TCP" et "Ports locaux spécifiques", renseignez les ports à ouvrir (séparés par des virgules), cliquez sur "Suivant" 
6. Sélectionnez "Autoriser la connexion", cliquez sur "Suivant"
7. Laissez tous les profils sélectionnés, cliquez sur "Suivant"
8. Donnez un nom à la règle, par exemple "Accès Docker" et cliquez sur "Terminer"

Les ports exposés par vos conteneurs devraient maintenant être accessibles. Vous devrez répéter l'opération à chaque fois que vous exposez de nouveaux ports.

Par défaut, le pare-feu Windows bloque toutes les connexions entrantes, y compris celles vers les conteneurs Docker. Pour qu'un conteneur soit accessible depuis le réseau de l'hôte, il ne suffit pas de lui faire écouter un port, il faut aussi dire explicitement au pare-feu d'autoriser le trafic sur ce port. Sinon, les paquets seront bloqués avant même d'atteindre le conteneur !

C'est un mécanisme de sécurité : les conteneurs sont isolés et ne doivent pas être exposés sur le réseau si ce n'est pas absolument nécessaire. Vous garderez ainsi un meilleur contrôle sur la surface d'attaque de votre système.

**Ressources :**
- Documentation Docker sur les règles de pare-feu : https://docs.docker.com/network/network-tutorial-host/#use-case-2-access-an-application-from-the-host-via-a-port
- Création de règles de trafic entrant : https://docs.microsoft.com/fr-fr/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule

## Conclusion
En appliquant ces astuces, vous devriez résoudre la plupart des problèmes couramment rencontrés lors de l'utilisation de Docker sous Windows. Retenez que :

- Hadolint vous aidera à écrire des Dockerfiles propres et sans erreurs
- Les problèmes de COPY viennent souvent d'un chemin non-valide relatif au contexte de build (très courant sur les environnements Windows)
- ENTRYPOINT définit la commande principale, CMD les paramètres par défaut
- Accordez le minimum de droits nécessaire aux fichiers dans l'image
- Effacer le vhdx Docker et utiliser `system prune` aide à garder un système performant 
- Le pare-feu doit être configuré pour laisser passer le trafic vers les conteneurs

Avec de la pratique, vous prendrez vite de bons automatismes pour diagnostiquer et résoudre les petits soucis avec Docker. Gardez à l'esprit les concepts de base comme le contexte de build, l'isolation des conteneurs et le principe des permissions (moindre privilège), cela vous aidera à anticiper sur les enjeux de développement.

Si vous avez encore des difficultés, référez-vous à la documentation officielle de Docker ou ouvrez une discussion sur les forums de la communauté. Vous y trouverez de nombreux retours d'expérience et exemples qui vous aideront à progresser.

**Ressources :**
- Documentation officielle de Docker : https://docs.docker.com/
- Forums de la communauté Docker : https://forums.docker.com/
- Subreddit Docker : https://www.reddit.com/r/docker/
- Blog technique Docker : https://www.docker.com/blog/

N'oubliez pas que comme avec tout outil complexe, la maîtrise de Docker demande du temps et de la persévérance. Mais une fois que vous aurez acquis les bons réflexes, cela deviendra un jeu d'enfant et vous ne pourrez plus vous en passer pour développer et déployer vos applications ! Alors accrochez-vous et continuez à expérimenter, vous avez déjà tous les conseils pour devenir un pro de Docker.
