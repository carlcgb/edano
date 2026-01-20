# APIs Google Cloud nécessaires

Ce document liste les APIs Google Cloud et produits du Marketplace nécessaires pour le site web du podcast Édano.

## 📋 APIs requises

### 1. Google Maps JavaScript API (Optionnel mais recommandé)

**Usage**: Pour afficher une carte interactive du Québec avec un style personnalisé.

**Activation**:
1. Allez dans [Google Cloud Console](https://console.cloud.google.com/)
2. Créez ou sélectionnez un projet
3. Activez l'API "Maps JavaScript API"
4. Créez une clé API dans "Credentials"

**Configuration**:
- Ajoutez la clé dans `.env` : `VITE_GOOGLE_MAPS_API_KEY=your_key_here`
- Configurez les restrictions de domaine dans Google Cloud Console pour la sécurité

**Coût**: 
- 200$ de crédit gratuit par mois
- Après crédit: $7.00 par 1000 chargements de carte

**Alternative**: Le projet utilise actuellement OpenStreetMap (gratuit) via Leaflet. Pour utiliser Google Maps, modifiez `src/components/MapComponent.jsx`.

---

### 2. Google Maps Geocoding API (Optionnel)

**Usage**: Pour convertir automatiquement les noms de villes en coordonnées GPS (latitude/longitude).

**Activation**:
1. Dans le même projet Google Cloud
2. Activez l'API "Geocoding API"

**Configuration**:
- Utilise la même clé API que Maps JavaScript API
- Ou créez une clé séparée si vous préférez

**Coût**:
- 200$ de crédit gratuit par mois
- Après crédit: $5.00 par 1000 requêtes

**Note**: Les coordonnées des villes sont actuellement codées en dur dans `MapComponent.jsx`. Cette API n'est nécessaire que si vous voulez rechercher dynamiquement des villes.

---

### 3. YouTube Data API v3 (Optionnel mais recommandé)

**Usage**: Pour récupérer automatiquement les métadonnées des épisodes (titre, description, miniature, durée) depuis YouTube.

**Activation**:
1. Dans le même projet Google Cloud
2. Activez l'API "YouTube Data API v3"
3. Créez une clé API OAuth 2.0 ou API Key

**Configuration**:
- Ajoutez la clé dans `.env` : `VITE_YOUTUBE_API_KEY=your_key_here`
- Pour OAuth 2.0, configurez les domaines autorisés

**Coût**:
- Gratuit jusqu'à 10,000 unités par jour
- 1 requête = ~1 unité
- Au-delà: contactez Google pour les tarifs

**Endpoints utiles**:
- `videos.list` - Récupérer les détails d'une vidéo
- `search.list` - Rechercher des vidéos par canal ou mots-clés

**Exemple d'utilisation**:
```javascript
// Récupérer les détails d'une vidéo YouTube
const videoId = 'YOUR_VIDEO_ID'
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`
)
```

---

## 🛒 Marketplace Google Cloud (Optionnel)

### Map Tiles API

**Usage**: Pour obtenir des tuiles de carte personnalisées avec votre propre style.

**Activation**:
1. Allez dans [Google Cloud Marketplace](https://console.cloud.google.com/marketplace)
2. Recherchez "Map Tiles API"
3. Activez le service

**Coût**: Voir la documentation Google pour les tarifs actuels

**Note**: Généralement utilisé pour des applications à grande échelle. Pour ce projet, l'API Maps JavaScript standard devrait suffire.

---

## 🔐 Configuration de sécurité

### Restrictions de clé API

Pour chaque clé API créée, configurez les restrictions :

1. **Restrictions d'application**:
   - Restreignez par domaine HTTP (ex: `edano-podcast.pages.dev`)
   - Ou par adresse IP si vous avez un serveur backend

2. **Restrictions d'API**:
   - Limitez à seulement les APIs nécessaires (Maps JavaScript, Geocoding, YouTube Data)

3. **Quotas**:
   - Définissez des quotas quotidiens pour éviter les coûts inattendus

---

## 📊 Résumé des coûts estimés

Pour un site web de podcast avec trafic modéré :

| API | Usage mensuel estimé | Coût |
|-----|---------------------|------|
| Maps JavaScript API | 5,000 chargements | Gratuit (dans crédit) |
| Geocoding API | 100 requêtes | Gratuit (dans crédit) |
| YouTube Data API | 1,000 requêtes | Gratuit (dans crédit) |
| **Total** | | **$0/mois** (dans crédit gratuit) |

**Note**: Les 200$ de crédit gratuit mensuel de Google Cloud couvrent largement les besoins d'un site de podcast standard.

---

## 🚀 Configuration rapide

1. Créez un compte [Google Cloud](https://cloud.google.com/)
2. Créez un nouveau projet
3. Activez les APIs nécessaires :
   - Maps JavaScript API
   - YouTube Data API v3
4. Créez une clé API
5. Ajoutez les clés dans `.env` :
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_maps_key
   VITE_YOUTUBE_API_KEY=your_youtube_key
   ```
6. Configurez les restrictions de sécurité
7. Déployez !

---

## 📚 Documentation

- [Google Maps Platform](https://developers.google.com/maps)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Tarification Google Maps](https://mapsplatform.google.com/pricing/)

---

## ⚠️ Important

**Le projet fonctionne actuellement sans Google Maps** en utilisant OpenStreetMap (gratuit). Les APIs Google sont optionnelles mais recommandées pour :
- Un meilleur style de carte
- Des performances améliorées
- L'intégration YouTube native
- Un support professionnel
