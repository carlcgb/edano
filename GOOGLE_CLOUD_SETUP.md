# Guide de Configuration des APIs Google Cloud

Ce guide vous explique étape par étape comment configurer les APIs Google Cloud pour votre site web Édano.

## 📋 Prérequis

- Un compte Google (Gmail)
- Une carte de crédit (requise pour activer la facturation, mais vous bénéficiez de 200$ de crédit gratuit par mois)

## 🚀 Étape 1 : Créer un Projet Google Cloud

### 1.1 Accéder à Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Connectez-vous avec votre compte Google
3. Si c'est votre première fois, acceptez les conditions d'utilisation

### 1.2 Créer un Nouveau Projet

1. En haut de la page, cliquez sur le sélecteur de projet (à côté de "Google Cloud")
2. Cliquez sur **"NEW PROJECT"** (Nouveau projet)
3. Remplissez les informations :
   - **Project name** : `edano-podcast` (ou le nom de votre choix)
   - **Organization** : Laissez par défaut si vous n'avez pas d'organisation
   - **Location** : Laissez "No organization" si vous êtes un particulier
4. Cliquez sur **"CREATE"** (Créer)
5. Attendez quelques secondes que le projet soit créé
6. Sélectionnez le projet dans le sélecteur en haut

## 💳 Étape 2 : Activer la Facturation

**Important** : Même si vous avez un crédit gratuit, Google Cloud nécessite une carte de crédit pour activer les APIs.

1. Dans le menu de gauche, allez dans **"Billing"** (Facturation)
2. Cliquez sur **"LINK A BILLING ACCOUNT"** (Lier un compte de facturation)
3. Cliquez sur **"CREATE BILLING ACCOUNT"** (Créer un compte de facturation)
4. Remplissez les informations :
   - **Account name** : `edano-podcast-billing`
   - **Country** : Votre pays
   - **Currency** : Votre devise
5. Cliquez sur **"SUBMIT AND CONTINUE"**
6. Entrez les informations de votre carte de crédit
7. Cliquez sur **"START MY FREE TRIAL"** ou **"SUBMIT"**

**Note** : Vous recevrez 200$ de crédit gratuit valable 90 jours, et 200$ de crédit mensuel permanent pour les APIs Maps.

## 🔑 Étape 3 : Activer les APIs

### 3.1 Activer Google Maps JavaScript API

1. Dans le menu de gauche, allez dans **"APIs & Services"** → **"Library"** (Bibliothèque)
2. Dans la barre de recherche, tapez : `Maps JavaScript API`
3. Cliquez sur **"Maps JavaScript API"**
4. Cliquez sur le bouton **"ENABLE"** (Activer)
5. Attendez quelques secondes que l'API soit activée

### 3.2 Activer YouTube Data API v3

1. Toujours dans **"APIs & Services"** → **"Library"**
2. Dans la barre de recherche, tapez : `YouTube Data API v3`
3. Cliquez sur **"YouTube Data API v3"**
4. Cliquez sur **"ENABLE"** (Activer)

### 3.3 Activer Google Maps Geocoding API (Optionnel)

1. Dans **"APIs & Services"** → **"Library"**
2. Recherchez : `Geocoding API`
3. Cliquez sur **"Geocoding API"**
4. Cliquez sur **"ENABLE"**

## 🔐 Étape 4 : Créer les Clés API

### 4.1 Créer une Clé API pour Maps

1. Allez dans **"APIs & Services"** → **"Credentials"** (Identifiants)
2. En haut de la page, cliquez sur **"+ CREATE CREDENTIALS"** (Créer des identifiants)
3. Sélectionnez **"API key"** (Clé API)
4. Une clé API sera générée automatiquement
5. **IMPORTANT** : Cliquez sur **"RESTRICT KEY"** (Restreindre la clé) pour la sécurité

### 4.2 Configurer les Restrictions de la Clé API

Dans la fenêtre qui s'ouvre :

#### Restrictions d'application

1. Sous **"Application restrictions"**, sélectionnez **"HTTP referrers (web sites)"**
2. Cliquez sur **"ADD AN ITEM"** (Ajouter un élément)
3. Ajoutez vos domaines (un par ligne) :
   ```
   http://localhost:5173/*
   https://edano-podcast.pages.dev/*
   https://*.pages.dev/*
   ```
   (Remplacez `edano-podcast.pages.dev` par votre domaine Cloudflare)

#### Restrictions d'API

1. Sous **"API restrictions"**, sélectionnez **"Restrict key"**
2. Cochez uniquement :
   - ✅ **Maps JavaScript API**
   - ✅ **Geocoding API** (si vous l'avez activée)
3. Cliquez sur **"SAVE"** (Enregistrer)

### 4.3 Créer une Clé API pour YouTube (Séparée)

1. Retournez dans **"APIs & Services"** → **"Credentials"**
2. Cliquez sur **"+ CREATE CREDENTIALS"** → **"API key"**
3. Cliquez sur **"RESTRICT KEY"**

#### Restrictions d'application

1. Sélectionnez **"HTTP referrers (web sites)"**
2. Ajoutez les mêmes domaines que précédemment

#### Restrictions d'API

1. Sélectionnez **"Restrict key"**
2. Cochez uniquement :
   - ✅ **YouTube Data API v3**
3. Cliquez sur **"SAVE"**

## 📝 Étape 5 : Copier les Clés API

1. Dans **"APIs & Services"** → **"Credentials"**
2. Vous verrez vos clés API listées
3. Pour chaque clé, cliquez sur l'icône de copie à droite
4. **Gardez ces clés en sécurité** - ne les partagez jamais publiquement

Vous devriez avoir :
- Une clé pour Maps (Maps JavaScript API + Geocoding API)
- Une clé pour YouTube (YouTube Data API v3)

## 🔧 Étape 6 : Configurer dans le Projet

### 6.1 Pour le Développement Local

Créez un fichier `.env` à la racine du projet :

```env
VITE_GOOGLE_MAPS_API_KEY=votre_cle_maps_ici
VITE_YOUTUBE_API_KEY=votre_cle_youtube_ici
```

**Important** : Ajoutez `.env` à votre `.gitignore` (déjà fait) pour ne pas commiter vos clés.

### 6.2 Pour le Déploiement (GitHub Secrets)

1. Allez dans votre repository GitHub
2. Cliquez sur **"Settings"** (Paramètres)
3. Dans le menu de gauche, allez dans **"Secrets and variables"** → **"Actions"**
4. Cliquez sur **"New repository secret"** (Nouveau secret)
5. Créez deux secrets :
   - **Name** : `VITE_GOOGLE_MAPS_API_KEY`
     - **Value** : Votre clé API Maps
   - **Name** : `VITE_YOUTUBE_API_KEY`
     - **Value** : Votre clé API YouTube

Ces secrets seront automatiquement disponibles lors du build dans GitHub Actions.

## 🗺️ Étape 7 : Intégrer Google Maps dans le Code (Optionnel)

Actuellement, le projet utilise OpenStreetMap (gratuit). Si vous voulez utiliser Google Maps, vous devrez modifier `src/components/MapComponent.jsx`.

### Option A : Continuer avec OpenStreetMap (Recommandé)

**Avantages** :
- ✅ Gratuit et illimité
- ✅ Pas de configuration nécessaire
- ✅ Fonctionne parfaitement

**Inconvénients** :
- ❌ Style moins personnalisable
- ❌ Pas d'intégration native avec Google

### Option B : Passer à Google Maps

Si vous voulez utiliser Google Maps, je peux vous aider à modifier le code. Cela nécessitera :
1. Installer `@react-google-maps/api`
2. Modifier `MapComponent.jsx`
3. Utiliser votre clé API

## 📊 Étape 8 : Surveiller l'Utilisation

### 8.1 Vérifier les Quotas

1. Allez dans **"APIs & Services"** → **"Dashboard"**
2. Vous verrez l'utilisation de chaque API
3. Cliquez sur une API pour voir les détails

### 8.2 Définir des Alertes de Budget

1. Allez dans **"Billing"** → **"Budgets & alerts"**
2. Cliquez sur **"+ CREATE BUDGET"**
3. Configurez :
   - **Budget name** : `edano-podcast-budget`
   - **Budget amount** : `10` (ou le montant que vous voulez)
   - **Alert threshold** : `50%`, `90%`, `100%`
4. Cliquez sur **"CREATE"**

Vous recevrez des emails si vous approchez de votre limite.

## ✅ Checklist de Configuration

- [ ] Projet Google Cloud créé
- [ ] Facturation activée (carte de crédit ajoutée)
- [ ] Maps JavaScript API activée
- [ ] YouTube Data API v3 activée
- [ ] Geocoding API activée (optionnel)
- [ ] Clé API Maps créée et restreinte
- [ ] Clé API YouTube créée et restreinte
- [ ] Fichier `.env` créé avec les clés (développement local)
- [ ] Secrets GitHub configurés (déploiement)
- [ ] Alertes de budget configurées

## 🐛 Dépannage

### Erreur : "This API key is not authorized"

**Solution** : Vérifiez que :
1. L'API est bien activée dans votre projet
2. La clé API a les bonnes restrictions d'API
3. Le domaine est bien dans les restrictions HTTP referrers

### Erreur : "API key not valid"

**Solution** : 
1. Vérifiez que vous avez copié la clé complète
2. Vérifiez qu'il n'y a pas d'espaces avant/après
3. Recréez une nouvelle clé si nécessaire

### La carte ne s'affiche pas

**Solution** :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que le domaine est dans les restrictions
3. Vérifiez que la clé API est correctement chargée dans `.env`

## 💰 Comprendre les Coûts

### Crédit Gratuit Mensuel (200$)

- **Maps JavaScript API** : ~28,500 chargements gratuits/mois
- **Geocoding API** : ~40,000 requêtes gratuites/mois
- **YouTube Data API** : 10,000 unités/jour (gratuit)

### Après le Crédit Gratuit

- **Maps JavaScript API** : $7.00 par 1,000 chargements
- **Geocoding API** : $5.00 par 1,000 requêtes
- **YouTube Data API** : Contactez Google pour les tarifs

**Pour un site de podcast** : Vous ne devriez jamais dépasser le crédit gratuit avec un trafic normal.

## 📚 Ressources

- [Google Cloud Console](https://console.cloud.google.com/)
- [Documentation Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Documentation YouTube Data API](https://developers.google.com/youtube/v3)
- [Tarification Google Maps](https://mapsplatform.google.com/pricing/)

---

**Besoin d'aide ?** Consultez les logs d'erreur dans la console du navigateur ou dans Google Cloud Console.
