### Documentation pour la Maintenance et le Déploiement du Site

#### 1. **Structure des Tags et Processus de Déploiement**

- Les déploiements en production sont déclenchés chaque fois qu'un **tag** est poussé au dépôt GitHub, avec une structure spécifique : `*version-production` (par exemple : `1.0-production`, `2.1.1-production`, etc.).
- **Seuls les tags** terminant par `-production` lanceront le déploiement en production. Cela garantit que seules les versions validées arrivent en production.

#### 2. **Configuration du Déploiement Automatique**

Le déploiement est configuré via GitHub Actions, en utilisant un **fichier de workflow** qui détecte les tags avec le suffixe `-production` et déclenche une série d'instructions pour mettre en production.

##### Étapes de configuration :

1. **Créer un workflow GitHub Actions** :

   - Dans le dépôt GitHub, crée un fichier nommé `.github/workflows/deploiement-production.yml`.

2. **Définir les étapes de déploiement dans le workflow** :
   - Le workflow doit inclure des étapes pour :
     - **Vérifier le tag**.
     - **Construire** le projet si nécessaire.
     - **Déployer les fichiers** sur le serveur de production.

#### 3. **Workflow GitHub Actions : Configuration du fichier `deploiement-production.yml`**

Le fichier `.github/workflows/deploiement-production.yml` est le point central de configuration pour le déploiement en production.

##### Exemple de contenu pour `deploiement-production.yml` :

```yaml
name: Déploiement Production

on:
  push:
    tags:
      - "*-production" # Déclenchement uniquement pour les tags se terminant par '-production'

jobs:
  deploy:
    name: Déploiement en Production
    runs-on: ubuntu-latest

    steps:
      - name: Checkout du code
        uses: actions/checkout@v2

      - name: Configuration des variables d'environnement
        env:
          NODE_ENV: production

      # Étape de construction du projet (si nécessaire, par exemple pour une application React)
      - name: Installer les dépendances
        run: npm install

      - name: Construire le projet
        run: npm run build

      # Étape de déploiement (exemple utilisant un serveur avec SCP, modifiez en fonction de votre méthode)
      - name: Déployer sur le serveur de production
        env:
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_PATH: ${{ secrets.SERVER_PATH }}
        run: |
          scp -r ./build/* $SERVER_USER@$SERVER_HOST:$SERVER_PATH

      - name: Confirmer le déploiement
        run: echo "Le déploiement en production est terminé pour le tag $GITHUB_REF"
```

### 4. **Fichiers modifiés pour la configuration**

Pour mettre en place ce processus, les fichiers suivants devront être créés ou modifiés :

- `.github/workflows/deploiement-production.yml` : Fichier de workflow GitHub pour définir les étapes de déploiement.
- **Secrets GitHub** : Pour sécuriser l'accès à votre serveur de production, configurez les secrets suivants dans les paramètres du dépôt GitHub :
  - `SERVER_HOST` : l’adresse du serveur de production.
  - `SERVER_USER` : l'utilisateur SSH pour accéder au serveur.
  - `SERVER_PATH` : le chemin sur le serveur où les fichiers doivent être déployés.

### 5. **Maintenance et Suivi des Déploiements**

- **Gestion des versions** : Chaque déploiement en production doit être balisé avec un tag `*version-production` pour suivre facilement les versions.
- **Rollback** : En cas de problème, il est possible de revenir à une version précédente en redéployant un tag antérieur, en ajoutant simplement un nouveau tag `*version-production` sur cette version.

### Processus de Déploiement

1. **Créer un nouveau tag de production** :

   - Exemple : `git tag -a 1.0-production -m "Version 1.0 pour la production"`
   - Pousser le tag sur GitHub : `git push origin 1.0-production`

2. **GitHub Actions déclenche le workflow** :
   - GitHub détecte le nouveau tag `1.0-production` et exécute le workflow `deploiement-production.yml`.
   - Le site est automatiquement déployé sur le serveur de production.

### Suivi et Amélioration

- **Logs** : Consultez les logs de GitHub Actions pour vérifier chaque étape de déploiement.
- **Évolutivité** : Pour ajouter des étapes, comme les tests automatisés ou l'analyse de code, ajoutez simplement des étapes dans le fichier `deploiement-production.yml`.
