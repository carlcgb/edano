# Configuration de la Clé API Google Maps

## 🔑 Clé API fournie

```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAe4Gb3UubLAgUr6rqgh3B4MLPsuXxSep4
```

## 📝 Configuration Locale

### 1. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAe4Gb3UubLAgUr6rqgh3B4MLPsuXxSep4
```

### 2. Redémarrer le serveur de développement

```bash
npm run dev
```

La clé sera automatiquement chargée depuis le fichier `.env`.

## ☁️ Configuration GitHub Secrets (Déploiement)

### 1. Ajouter le secret dans GitHub

1. Allez sur : https://github.com/carlcgb/edano/settings/secrets/actions
2. Cliquez sur **"New repository secret"**
3. Ajoutez :
   - **Name** : `VITE_GOOGLE_MAPS_API_KEY`
   - **Value** : `AIzaSyAe4Gb3UubLAgUr6rqgh3B4MLPsuXxSep4`
4. Cliquez sur **"Add secret"**

### 2. Vérifier le workflow

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) utilisera automatiquement ce secret lors du build.

## ✅ Vérification

### Test Local

1. Créez le fichier `.env` avec la clé
2. Lancez `npm run dev`
3. Ouvrez la console du navigateur
4. Vérifiez qu'il n'y a pas d'erreur "API key not valid"

### Test Déploiement

1. Faites un commit et push
2. Allez dans l'onglet "Actions" de GitHub
3. Vérifiez que le build se termine sans erreur

## 🐛 Dépannage

### Erreur : "This API key is not authorized"

**Solution** :
1. Vérifiez que l'API "Maps JavaScript API" est activée dans Google Cloud Console
2. Vérifiez que la clé API a les bonnes restrictions

### Erreur : "API key not valid"

**Solution** :
1. Vérifiez que la clé est correctement copiée (pas d'espaces)
2. Vérifiez que le fichier `.env` est à la racine du projet
3. Redémarrez le serveur de développement

### La carte ne s'affiche pas

**Solution** :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que `VITE_GOOGLE_MAPS_API_KEY` est bien défini
3. Vérifiez que les restrictions HTTP referrers incluent votre domaine

---

**Note** : L'API YouTube a été retirée pour l'instant. Seule l'API Google Maps est utilisée.
