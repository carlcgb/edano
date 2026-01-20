# Édano - Podcast Website

Site web interactif pour le podcast Édano, présentant une carte du Québec avec des marqueurs cliquables pour chaque ville, liés aux épisodes YouTube correspondants.

## 🚀 Technologies

- **Vite.js** - Build tool et dev server
- **React** - Framework UI
- **Tailwind CSS** - Styling
- **Leaflet** - Cartes interactives
- **Cloudflare Pages** - Hébergement

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

## 🎨 Palette de couleurs

La palette de couleurs est inspirée de l'ambiance du podcast :
- **Mustard** (#f59e0b) - Couleur principale des marqueurs et accents
- **Forest** (#1a4129) - Vert foncé des murs
- **Brown** (#b88a5a) - Marron du tapis et meubles
- **Dark** (#1a1a1a) - Fond sombre

## 🗺️ Configuration de la carte

Les villes du Québec sont configurées dans `src/components/MapComponent.jsx`. Pour ajouter une nouvelle ville :

```javascript
{
  id: 9,
  name: 'Nom de la ville',
  position: [latitude, longitude],
  youtubeUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  description: 'Description de l\'épisode',
}
```

## ☁️ APIs Google Cloud nécessaires

Pour utiliser Google Maps au lieu d'OpenStreetMap (optionnel), vous aurez besoin de :

1. **Google Maps JavaScript API** - Pour afficher la carte
2. **Google Maps Geocoding API** - Pour convertir les noms de villes en coordonnées (optionnel)
3. **YouTube Data API v3** - Pour récupérer les métadonnées des vidéos (optionnel)

### Configuration

1. Créez un projet dans [Google Cloud Console](https://console.cloud.google.com/)
2. Activez les APIs nécessaires
3. Créez une clé API
4. Ajoutez la clé dans un fichier `.env` :

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

## 🚢 Déploiement sur Cloudflare

Le projet est configuré pour se déployer automatiquement sur Cloudflare Pages via GitHub Actions.

### Configuration requise

1. **Secrets GitHub** (dans les paramètres du repo) :
   - `CLOUDFLARE_API_TOKEN` - Token API Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID` - ID du compte Cloudflare

2. **Cloudflare Pages** :
   - Créez un nouveau projet dans Cloudflare Pages
   - Connectez votre repository GitHub
   - Le workflow GitHub Actions se chargera du déploiement

### Workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` contient la configuration de déploiement automatique.

## 📝 Notes

- Les URLs YouTube dans `MapComponent.jsx` doivent être remplacées par les vraies URLs des épisodes
- La carte utilise actuellement OpenStreetMap (gratuit). Pour utiliser Google Maps, modifiez le composant `MapComponent.jsx`
- Le site est entièrement en français

## 📄 Licence

MIT
