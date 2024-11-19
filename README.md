# 🎡 Jeu de la Roue de la Chance - NOVOTEL Reims Tinqueux

Ce projet est un site web interactif conçu pour le **NOVOTEL Reims Tinqueux**, permettant aux utilisateurs de donner leur avis et de tenter leur chance avec une roue de la fortune pour gagner des récompenses.

## 🚀 Fonctionnalités principales

- **Formulaire d'avis** :
  - Collecte d'email, évaluation via emoji et avis textuel (minimum 50 caractères).
  - Envoi des avis vers Google (redirection vers la page dédiée).
- **Roue de la chance interactive** :
  - Animation fluide pour afficher les récompenses.
  - Téléchargement de coupons personnalisés en fonction du résultat.
- **Déploiement automatisé** :
  - Gestion via GitHub Actions, avec déploiement en production déclenché par des tags `*-production`.
- **Aspects légaux** :
  - Mentions légales, politique de confidentialité, et conformité RGPD.

---

## 🛠️ Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript (D3.js).
- **Déploiement** : GitHub Actions avec configuration de déploiement automatique.
- **Sécurité** :
  - HTTPS activé via Let's Encrypt.
  - Protection contre les attaques DDoS avec Fail2Ban ou Cloudflare.

---

## ✅ Checklist : État d'avancement du projet

### Fonctionnalités développées :

- ✅ Formulaire d'avis avec emoji, email et avis textuel.
- ✅ Validation des champs (minimum 50 caractères pour l'avis).
- ✅ Jeu de la roue avec animation fluide et résultats dynamiques.
- ✅ Téléchargement de coupons basés sur les résultats de la roue.
- ✅ Design responsive adapté à tous les écrans.
- ✅ Mentions légales et respect de la confidentialité des données (conformité RGPD).

### Fonctionnalités restantes à développer :

- [ ] Redirection vers Google pour laisser un avis après soumission du formulaire.
- [ ] CSS
- [ ] Intégration des lots avec des images (SVG) dans la roue.
- [ ] Optimisation des fichiers CSS et JS (minification et compression).
- [ ] Bannière pour consentement aux cookies.
- [ ] Configuration HTTPS sur le serveur de production.
- [ ] Tests finaux et déploiement en production.

---

## ⚙️ Déploiement automatisé

Le déploiement en production est géré via **GitHub Actions**. Tout tag se terminant par `-production` déclenchera le pipeline pour :

1. Vérifier le code et exécuter les tests.
2. Construire le projet.
3. Déployer automatiquement sur le serveur de production.

---

## 📜 Mentions légales

Les mentions légales sont accessibles [ici](https://novotel-reims-tinqueux.com/fr/mentions-legales.html).

---

## 📋 Plan de maintenance

- **Surveillance des performances** avec Google Analytics et Google Search Console.
- **Sauvegardes régulières** des fichiers et de la configuration du serveur.
- **Mises à jour de sécurité** et tests sur les fonctionnalités critiques.
