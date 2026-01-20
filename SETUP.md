# Guide de Configuration - Édano Podcast

## 🚀 Démarrage Rapide

### 1. Installation

```bash
npm install
```

### 2. Configuration des URLs YouTube

Éditez `src/components/MapComponent.jsx` et remplacez les URLs YouTube par vos vraies vidéos :

```javascript
{
  id: 1,
  name: 'Montréal',
  position: [45.5017, -73.5673],
  youtubeUrl: 'https://www.youtube.com/watch?v=VOTRE_VIDEO_ID', // ← Remplacez ici
  description: 'Épisode sur Montréal',
}
```

### 3. Développement Local

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### 4. Build pour Production

```bash
npm run build
```

Les fichiers seront générés dans `dist/`

## ☁️ Configuration Cloudflare

### Étape 1 : Créer un projet Cloudflare Pages

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sélectionnez "Workers & Pages"
3. Cliquez sur "Create application" → "Pages" → "Connect to Git"
4. Connectez votre repository GitHub
5. Configurez :
   - **Project name** : `edano-podcast`
   - **Production branch** : `main`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`

### Étape 2 : Obtenir les tokens Cloudflare

1. Dans Cloudflare Dashboard, allez dans "My Profile" → "API Tokens"
2. Créez un token avec les permissions :
   - `Account:Cloudflare Pages:Edit`
   - `Zone:Zone:Read`
3. Copiez le token

### Étape 3 : Configurer les secrets GitHub

Dans votre repository GitHub :

1. Allez dans **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez les secrets suivants :
   - `CLOUDFLARE_API_TOKEN` : Votre token API Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID` : Votre Account ID (visible dans l'URL du dashboard Cloudflare)

### Étape 4 : Déployer

Le workflow GitHub Actions se déclenchera automatiquement à chaque push sur `main`.

Pour tester manuellement :
1. Faites un commit et push
2. Allez dans l'onglet "Actions" de GitHub
3. Vérifiez que le workflow s'exécute correctement

## 🔑 APIs Google Cloud (Optionnel)

### Si vous voulez utiliser Google Maps

1. Créez un projet sur [Google Cloud Console](https://console.cloud.google.com/)
2. Activez "Maps JavaScript API"
3. Créez une clé API
4. Ajoutez dans GitHub Secrets :
   - `VITE_GOOGLE_MAPS_API_KEY` : Votre clé API

### Si vous voulez utiliser YouTube Data API

1. Dans le même projet Google Cloud
2. Activez "YouTube Data API v3"
3. Créez une clé API
4. Ajoutez dans GitHub Secrets :
   - `VITE_YOUTUBE_API_KEY` : Votre clé API

**Note** : Le site fonctionne parfaitement sans ces APIs en utilisant OpenStreetMap (gratuit).

## 📝 Personnalisation

### Changer les couleurs

Éditez `tailwind.config.js` pour modifier la palette de couleurs.

### Ajouter des villes

Éditez `src/components/MapComponent.jsx` et ajoutez des entrées dans le tableau `quebecCities`.

### Modifier le texte

Tous les textes sont dans les composants React :
- `src/components/Header.jsx` : Navigation
- `src/components/MapComponent.jsx` : Descriptions des villes
- `src/components/EpisodeModal.jsx` : Texte de la modale

## 🐛 Dépannage

### La carte ne s'affiche pas

- Vérifiez que Leaflet CSS est chargé (déjà dans `index.html`)
- Vérifiez la console du navigateur pour les erreurs

### Les marqueurs ne s'affichent pas

- Vérifiez que les coordonnées sont correctes (latitude, longitude)
- Vérifiez la console pour les erreurs JavaScript

### Le déploiement échoue

- Vérifiez que les secrets GitHub sont correctement configurés
- Vérifiez les logs dans GitHub Actions
- Vérifiez que `CLOUDFLARE_ACCOUNT_ID` est correct

## 📚 Documentation

- [CONTEXT.md](./CONTEXT.md) : Contexte et alignement du design
- [GOOGLE_CLOUD_APIS.md](./GOOGLE_CLOUD_APIS.md) : Détails sur les APIs Google Cloud
- [README.md](./README.md) : Documentation générale

## ✅ Checklist de Déploiement

- [ ] URLs YouTube remplacées dans `MapComponent.jsx`
- [ ] Projet Cloudflare Pages créé
- [ ] Secrets GitHub configurés (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
- [ ] Workflow GitHub Actions testé
- [ ] Site déployé et accessible
- [ ] (Optionnel) APIs Google Cloud configurées si nécessaire

---

**Besoin d'aide ?** Consultez les fichiers de documentation ou les logs d'erreur.
