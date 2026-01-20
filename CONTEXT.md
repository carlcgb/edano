# Contexte et Alignement du Design - Édano Podcast

Ce document sert de référence pour maintenir la cohérence du design et de l'expérience utilisateur du site web.

## 🎯 Vision du Projet

Site web interactif pour le podcast Édano, présentant une carte du Québec comme élément central de la page d'accueil. Chaque ville sur la carte est cliquable et mène à l'épisode YouTube correspondant.

## 🎨 Palette de Couleurs

La palette de couleurs est extraite de la capture d'écran du podcast (deux personnes assises) :

### Couleurs Principales
- **Mustard (#f59e0b)** : Couleur principale des marqueurs de ville, boutons CTA, et accents
  - Utilisé pour : marqueurs de carte, boutons, liens hover, titres
- **Forest Dark (#1a4129)** : Vert foncé des murs
  - Utilisé pour : arrière-plans, sections sombres
- **Brown (#b88a5a)** : Marron du tapis et meubles
  - Utilisé pour : accents secondaires, bordures
- **Dark (#1a1a1a)** : Fond très sombre
  - Utilisé pour : arrière-plan principal, modales, header

### Application
- Fond principal : `bg-dark-900`
- Texte principal : `text-white`
- Accents et CTA : `bg-mustard-500`, `text-mustard-500`
- Cartes et sections : `bg-dark-800`
- Bordures : `border-mustard-500/20`

## 🏗️ Inspiration Design : Monkeypaw Productions

Le layout et le style général sont basés sur [monkeypawproductions.com](https://www.monkeypawproductions.com/).

### Caractéristiques à maintenir :
1. **Hero Section Immersive**
   - Plein écran, élément visuel dominant
   - Overlay semi-transparent pour le contenu
   - Typographie grande et audacieuse

2. **Navigation Minimaliste**
   - Header fixe avec effet de blur au scroll
   - Transparent au début, devient opaque au scroll
   - Menu simple et épuré

3. **Typographie**
   - Police display pour les titres : `Playfair Display`
   - Police body : `Inter`
   - Hiérarchie claire : titres grands, sous-titres moyens, texte body

4. **Espacement et Layout**
   - Beaucoup d'espace blanc (ou sombre dans notre cas)
   - Contenu centré
   - Sections bien espacées

5. **Interactions**
   - Transitions douces (300ms)
   - Hover states visibles
   - Modales avec backdrop blur

6. **Esthétique Cinématique**
   - Contraste élevé
   - Ombres subtiles
   - Effets de profondeur

## 🗺️ Carte Interactive

### Caractéristiques
- **Carte pleine écran** : Prend toute la hauteur de la viewport
- **Style sombre** : Utilise des tuiles de carte sombres (CartoDB Dark Matter)
- **Marqueurs personnalisés** : Icônes en forme de pin, couleur mustard
- **Interactivité** :
  - Clic sur marqueur → ouvre modal avec épisode YouTube
  - Popup au hover avec nom de la ville
  - Zoom et pan libres

### Villes du Québec
Les villes sont configurées dans `src/components/MapComponent.jsx` :
- Montréal
- Québec
- Laval
- Gatineau
- Longueuil
- Sherbrooke
- Saguenay
- Trois-Rivières

**Pour ajouter une ville** :
```javascript
{
  id: 9,
  name: 'Nom de la ville',
  position: [latitude, longitude],
  youtubeUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  description: 'Description de l\'épisode',
}
```

## 🌐 Langue et Contenu

### Langue : Français
- Tous les textes de l'interface en français
- Navigation : "Épisodes", "À propos", "Contact", "S'abonner"
- Modales : "Voir l'épisode", "Regarder sur YouTube", "Fermer"
- Messages : "Épisode sur [Ville]"

### Contenu
- Titre du site : "ÉDANO"
- Sous-titre : "Podcast"
- Textes descriptifs pour chaque ville

## 🎬 Modale d'Épisode

### Caractéristiques
- S'ouvre au clic sur un marqueur de ville
- Affiche :
  - Nom de la ville (titre)
  - Description de l'épisode
  - Player YouTube intégré (iframe)
  - Bouton "Regarder sur YouTube" (lien externe)
  - Bouton "Fermer"
- Style :
  - Fond sombre avec blur
  - Bordure subtile mustard
  - Responsive (mobile-friendly)

## 📱 Responsive Design

### Breakpoints Tailwind
- Mobile : par défaut (< 640px)
- Tablet : `md:` (≥ 768px)
- Desktop : `lg:` (≥ 1024px)

### Adaptations
- Navigation : menu réduit sur mobile
- Carte : reste pleine écran sur tous les appareils
- Modale : padding réduit sur mobile
- Typographie : tailles ajustées par breakpoint

## ⚡ Performance

### Optimisations
- Lazy loading des composants si nécessaire
- Images optimisées
- Build Vite optimisé pour production
- Leaflet chargé via CDN

## 🚀 Déploiement

### Cloudflare Pages
- Build automatique via GitHub Actions
- Déploiement sur chaque push vers `main`
- Preview deployments pour les PRs

### Variables d'environnement
- `VITE_GOOGLE_MAPS_API_KEY` (optionnel)
- `VITE_YOUTUBE_API_KEY` (optionnel)

## 🔄 Workflow de Développement

1. **Local** : `npm run dev`
2. **Build** : `npm run build`
3. **Preview** : `npm run preview`
4. **Deploy** : Push vers `main` → GitHub Actions → Cloudflare

## 📝 Checklist de Cohérence

Avant de faire des changements majeurs, vérifier :
- [ ] Palette de couleurs respectée (mustard, forest, brown, dark)
- [ ] Style inspiré de Monkeypaw (immersive, cinématique)
- [ ] Tous les textes en français
- [ ] Carte reste l'élément central
- [ ] Interactions fluides (transitions 300ms)
- [ ] Responsive sur mobile
- [ ] Accessibilité (contraste, clavier)

## 🎯 Objectifs Utilisateur

1. **Découvrir** : L'utilisateur arrive sur la carte du Québec
2. **Explorer** : Il peut zoomer, panner, voir les villes
3. **Cliquer** : Il clique sur une ville qui l'intéresse
4. **Regarder** : La modale s'ouvre avec l'épisode YouTube
5. **Partager** : Il peut partager l'épisode ou s'abonner

---

**Dernière mise à jour** : Date de création du projet
**Maintenu par** : Équipe Édano
