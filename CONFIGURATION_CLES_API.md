# Configuration des Clés API - Guide Rapide

## ⚠️ IMPORTANT : Sécurité

**Vos clés API ont été exposées publiquement. Vous devez les régénérer immédiatement.**

Suivez les instructions dans `SECURITY_ALERT.md` avant de continuer.

## 📝 Configuration Locale (.env)

### Étape 1 : Créer le fichier .env

Le fichier `.env` a été créé à la racine du projet. **Ne le commitez JAMAIS dans Git** (déjà protégé).

### Étape 2 : Ajouter vos clés

Ouvrez `.env` et remplacez les valeurs par vos **nouvelles** clés API :

```env
VITE_GOOGLE_MAPS_API_KEY=votre_nouvelle_cle_maps
VITE_YOUTUBE_API_KEY=votre_nouvelle_cle_youtube
```

### Étape 3 : Vérifier

1. Redémarrez votre serveur de développement (`npm run dev`)
2. Les variables seront disponibles dans votre code via `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`

## ☁️ Configuration GitHub Secrets (Déploiement)

### Étape 1 : Accéder aux Secrets

1. Allez sur votre repository GitHub
2. Cliquez sur **"Settings"** (Paramètres)
3. Dans le menu de gauche : **"Secrets and variables"** → **"Actions"**

### Étape 2 : Ajouter les Secrets

Cliquez sur **"New repository secret"** et ajoutez :

#### Secret 1 : Maps API
- **Name** : `VITE_GOOGLE_MAPS_API_KEY`
- **Value** : Votre nouvelle clé API Maps

#### Secret 2 : YouTube API
- **Name** : `VITE_YOUTUBE_API_KEY`
- **Value** : Votre nouvelle clé API YouTube

### Étape 3 : Vérifier le Workflow

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) utilisera automatiquement ces secrets lors du build.

## 🔑 Recommandation : Clés Séparées

**Actuellement** : Vous utilisez la même clé pour Maps et YouTube.

**Recommandé** : Créez deux clés séparées :

1. **Clé Maps** : Restreinte à "Maps JavaScript API" + "Geocoding API"
2. **Clé YouTube** : Restreinte à "YouTube Data API v3"

**Avantages** :
- ✅ Meilleure sécurité (si une clé est compromise, l'autre est sûre)
- ✅ Meilleur suivi de l'utilisation
- ✅ Restrictions plus précises

## 🧪 Tester la Configuration

### Test Local

```bash
# Démarrer le serveur
npm run dev

# Dans la console du navigateur, vérifiez :
console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
```

### Test Déploiement

1. Faites un commit et push
2. Allez dans **"Actions"** sur GitHub
3. Vérifiez que le workflow se termine sans erreur
4. Vérifiez que les variables d'environnement sont bien chargées dans les logs

## 🐛 Dépannage

### Erreur : "API key not valid"

**Causes possibles** :
- La clé n'est pas correctement copiée (espaces avant/après)
- L'API n'est pas activée dans Google Cloud Console
- Les restrictions bloquent votre domaine

**Solution** :
1. Vérifiez la clé dans Google Cloud Console
2. Vérifiez que l'API est activée
3. Vérifiez les restrictions HTTP referrers

### Erreur : "This API key is not authorized"

**Causes possibles** :
- Les restrictions d'API ne permettent pas cette API
- Le domaine n'est pas dans les restrictions HTTP referrers

**Solution** :
1. Vérifiez les restrictions dans Google Cloud Console
2. Ajoutez votre domaine (ex: `https://edano-podcast.pages.dev/*`)

## 📊 Vérifier l'Utilisation

1. Allez dans [Google Cloud Console](https://console.cloud.google.com/)
2. **"APIs & Services"** → **"Dashboard"**
3. Vérifiez l'utilisation de chaque API
4. Configurez des alertes si nécessaire

---

**Rappel** : Régénérez vos clés si elles ont été exposées publiquement !
