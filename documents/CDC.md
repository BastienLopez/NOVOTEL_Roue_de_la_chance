### Cahier des charges pour le projet "Roue de la Chance - NOVOTEL Reims Tinqueux"

---

## 1. **Contexte et objectifs du projet**

L'objectif du projet est de créer un site web interactif pour **NOVOTEL Reims Tinqueux** afin de recueillir les avis des clients et de les récompenser pour leur participation. Le site permet aux utilisateurs de laisser un avis sur leur expérience dans l'établissement et d'accéder à un jeu de la roue de la chance pour gagner des récompenses.

## 2. **Enjeux et bénéfices**

- **Améliorer l'engagement client** en incitant les clients à laisser des avis sur leur séjour.
- **Augmenter la visibilité** de l'hôtel sur Google grâce aux avis clients.
- **Récompenser la fidélité** des clients avec des offres promotionnelles.
- **Collecter des retours d'expérience** pour améliorer la qualité du service.

---

## 3. **Fonctionnalités requises**

### 3.1 **Formulaire de collecte d'avis**

**Statut : Terminé**

- Formulaire comprenant :
  - Sélection d'un emoji pour exprimer le niveau de satisfaction.
  - Champ pour saisir un avis (minimum de 50 caractères).
  - Champ pour entrer une adresse email.
- Validation :
  - Tous les champs doivent être remplis.
  - L'avis doit contenir au moins 50 caractères pour être validé.
- Soumission :
  - Une fois le formulaire soumis, l'utilisateur accède au jeu de la roue.

**À faire :**

- Ajouter une redirection vers la page d'avis Google **après la soumission du formulaire interne**, tout en incitant les utilisateurs à laisser un avis officiel.

### 3.2 **Jeu de la roue de la chance**

**Statut : Terminé**

- Affichage d'une roue interactive utilisant D3.js.
- La roue contient différents segments avec des récompenses (ex : coupons de réduction, voyages, cocktails offerts).
- Animation fluide de la roue avec rotation aléatoire.
- Affichage d'une popup indiquant la récompense obtenue après le tour de la roue.
- Possibilité de télécharger un coupon avec la récompense gagnée.

**À faire :**

- Empêcher le relancement de la roue tant que la popup de résultat est affichée.
- Ajouter une croix pour fermer la popup au lieu du bouton "Fermer".

### 3.3 **Gestion des avis Google (Option 3 et 4 combinées)**

**Statut : À faire**

- **Option 3 : Preuve d'avis Google avec screenshot**

  - Après avoir laissé un avis sur le site interne, rediriger l'utilisateur vers la page d'avis Google.
  - Demander à l'utilisateur de **prendre un screenshot** de l'avis Google laissé.
  - Permettre à l'utilisateur de **soumettre le screenshot** sur le site pour obtenir une récompense supplémentaire.

- **Option 4 : Système hybride**
  - L'utilisateur laisse un avis interne pour accéder au jeu de la roue.
  - Ensuite, l'utilisateur est redirigé vers Google pour laisser un avis officiel (facultatif).
  - Offrir une récompense supplémentaire pour les utilisateurs qui fournissent une preuve de l'avis laissé sur Google.

**Fonctionnalités à implémenter pour ces options :**

- Créer un formulaire de **téléchargement de screenshot** après redirection vers Google.
- Valider le screenshot soumis avant d'accorder la récompense supplémentaire.
- Afficher un message confirmant que l'avis a été enregistré sur Google.

---

## 4. **Design et ergonomie**

**Statut : Terminé pour le design actuel**

- Design responsive adapté pour mobile.
- Utilisation de couleurs en accord avec l'identité visuelle de NOVOTEL.
- Navigation fluide et intuitive pour maximiser l'engagement utilisateur.

**À faire :**

- Optimiser le design du formulaire pour un affichage complet sans défilement.
- Centrer la roue et optimiser sa taille pour tous les écrans.

---

## 5. **Contraintes techniques**

- **Technologies utilisées** : HTML, CSS, JavaScript, D3.js.
- **Compatibilité** : Le site doit être compatible avec les navigateurs modernes (Chrome, Firefox, Safari).
- **Déploiement** : Prévoir un déploiement sur un serveur web avec HTTPS pour sécuriser les échanges.

**À faire :**

- Assurer la compatibilité avec les navigateurs mobiles.
- Vérifier que le système de redirection et de téléchargement de screenshots fonctionne correctement sur tous les appareils.

---

## 6. **Aspects légaux**

**Statut : À faire**

- Ajouter une section **mentions légales** avec un lien vers `https://novotel-reims-tinqueux.com/fr/mentions-legales.html`.
- Créer une **politique de confidentialité** pour expliquer la collecte et l'utilisation des avis.
- Ajouter une **bannière de consentement aux cookies** si nécessaire.
- Ajouter une **case à cocher** dans le formulaire pour obtenir le consentement des utilisateurs avant la collecte des données.

---

## 7. **Planification et échéancier**

| Étape                        | Statut  | Date prévue d'achèvement |
| ---------------------------- | ------- | ------------------------ |
| Implémentation du formulaire | Terminé | -                        |
| Jeu de la roue               | Terminé | -                        |
| Intégration des avis Google  | À faire | +1 semaine               |
| Validation des screenshots   | À faire | +2 semaines              |
| Déploiement et tests finaux  | À faire | +3 semaines              |

---

## 8. **Risques et recommandations**

- **Risque** : Les utilisateurs peuvent quitter le site sans laisser d'avis sur Google.
  - **Solution** : Offrir une récompense supplémentaire pour encourager les utilisateurs à soumettre un screenshot.
- **Risque** : Problèmes de compatibilité avec certains navigateurs mobiles.
  - **Solution** : Tester le site sur différents appareils avant le déploiement final.

---

### 9. **Mise en production sur serveur**

Une fois le développement finalisé, il est essentiel de déployer le site sur un **serveur web** pour le rendre accessible au public. Voici les étapes nécessaires pour la mise en production, y compris le choix du serveur, les configurations requises, ainsi qu'un calendrier estimé.

---

## **Étapes pour la mise en production**

### 9.1 **Choix du serveur**

Avant de commencer le déploiement, il est nécessaire de choisir un **hébergement** adapté aux besoins du projet. Voici quelques options populaires :

1. **Hébergement mutualisé** (OVH, Infomaniak, IONOS) :

   - Avantages : Simple à configurer, peu coûteux.
   - Inconvénients : Performances limitées pour les sites à fort trafic.

2. **Hébergement cloud/VPS** (AWS, DigitalOcean, Vultr) :

   - Avantages : Performances élevées, contrôle total sur l'environnement.
   - Inconvénients : Nécessite des compétences en administration serveur.

3. **Plateformes de déploiement spécialisées** (Netlify, Vercel, GitHub Pages pour sites statiques) :
   - Avantages : Facile à déployer, intégration CI/CD, gratuit pour les petits projets.
   - Inconvénients : Limité pour les projets nécessitant un backend complexe.

**Recommandation** : Pour un site comme le tien (site statique avec du JavaScript), **Netlify** ou **Vercel** seraient des choix rapides et efficaces.

### 9.2 **Pré-requis avant déploiement**

- **Certificat SSL (HTTPS)** pour sécuriser les échanges de données (Netlify, Vercel et la plupart des hébergeurs offrent des certificats gratuits avec Let's Encrypt).
- Vérifier que tous les fichiers sont correctement organisés :
  - `index.html` (formulaire)
  - `roue.html` (jeu de la roue)
  - `style.css` (styles)
  - `script.js`, `roue.js` (scripts)
  - Dossier `img/` pour les images SVG et autres ressources.
- S'assurer que le site est **responsive** sur mobile et desktop.
- Vérifier que **toutes les fonctionnalités** (formulaire, avis Google, roue de la chance) fonctionnent correctement en local avant le déploiement.

### 9.3 **Procédure de déploiement**

#### Étape 1 : Préparation des fichiers

- **Minifier** les fichiers HTML, CSS, et JavaScript pour optimiser les temps de chargement.
- **Vérifier la compatibilité** avec les navigateurs modernes (Chrome, Firefox, Safari, Edge).
- Utiliser des outils comme **Lighthouse** pour analyser la performance et l'accessibilité du site.

#### Étape 2 : Déployer le site (exemple avec Netlify)

1. Crée un compte sur [Netlify](https://www.netlify.com/).
2. Lier le dépôt GitHub du projet ou **uploader manuellement** les fichiers du site.
3. **Configurer le domaine** (Netlify propose des sous-domaines gratuits, ou tu peux utiliser un domaine personnalisé).
4. Activer le **SSL** pour sécuriser le site.
5. Vérifier que le déploiement est réussi en accédant à l'URL fournie par Netlify.

#### Étape 3 : Configuration des redirections

- **Configurer les redirections** dans le fichier `_redirects` pour s'assurer que tous les liens internes fonctionnent :

```
/index.html / 200
/roue.html /roue.html 200
```

#### Étape 4 : Tests finaux en production

- Tester l'ensemble des fonctionnalités en ligne :
  - Formulaire d'avis.
  - Redirection vers Google pour laisser un avis.
  - Téléchargement des coupons après utilisation de la roue.
- S'assurer que le site est bien **indexé par Google** (soumettre le sitemap via Google Search Console).

---

## **Sécurité**

- Activer le **HTTPS** pour sécuriser toutes les communications.
- **Limiter l'accès** aux fichiers critiques en configurant correctement le `.htaccess` (si hébergement Apache).
- **Sauvegarder** régulièrement le site (fichiers et base de données si nécessaire).

---

### 9.4 **Estimation du temps pour la mise en production**

| Tâche                                    | Durée estimée |
| ---------------------------------------- | ------------- |
| Préparation des fichiers                 | 1 jour        |
| Configuration du serveur                 | 0.5 jour      |
| Déploiement initial                      | 0.5 jour      |
| Tests finaux en production               | 1 jour        |
| Configuration des redirections et du SSL | 0.5 jour      |
| Total                                    | **3 jours**   |

**Remarque** : Le temps estimé peut varier en fonction des compétences techniques et des éventuels problèmes rencontrés.

---

### 9.5 **Maintenance post-déploiement**

- **Surveiller régulièrement** les performances du site (utiliser des outils comme Google Analytics et Google Search Console).
- Effectuer des **mises à jour régulières** des dépendances (si applicable).
- Prévoir une **stratégie de sauvegarde** pour les fichiers du site.

---

## 10. **Annexes**

- Lien vers les ressources nécessaires (Google My Business, screenshots de démo, etc.).
- Documentation pour la maintenance du site.
