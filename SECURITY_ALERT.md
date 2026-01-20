# ⚠️ ALERTE SÉCURITÉ - Clés API Exposées

## 🚨 ACTION IMMÉDIATE REQUISE

Vos clés API Google Cloud ont été partagées publiquement. Vous devez **IMMÉDIATEMENT** :

### 1. Régénérer vos clés API

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Naviguez vers **"APIs & Services"** → **"Credentials"**
3. Pour chaque clé API exposée :
   - Cliquez sur la clé
   - Cliquez sur **"REGENERATE KEY"** (Régénérer la clé)
   - Confirmez la régénération
4. **Supprimez l'ancienne clé** si possible

### 2. Vérifier les Restrictions

Assurez-vous que vos nouvelles clés ont des restrictions :
- **Restrictions d'application** : HTTP referrers avec vos domaines uniquement
- **Restrictions d'API** : Seulement les APIs nécessaires

### 3. Surveiller l'Utilisation

1. Allez dans **"APIs & Services"** → **"Dashboard"**
2. Vérifiez s'il y a eu une utilisation suspecte
3. Si oui, contactez le support Google Cloud immédiatement

## 🔒 Bonnes Pratiques

### ❌ NE JAMAIS :
- Partager vos clés API dans des messages publics
- Commiter `.env` dans Git (déjà protégé par `.gitignore`)
- Partager des clés API dans des screenshots
- Utiliser la même clé pour plusieurs projets sans restrictions

### ✅ TOUJOURS :
- Utiliser des clés séparées pour chaque API
- Configurer des restrictions strictes
- Utiliser des variables d'environnement (`.env`)
- Configurer des alertes de budget
- Régénérer les clés si elles sont compromises

## 📝 Prochaines Étapes

Une fois vos nouvelles clés générées :
1. Mettez-les dans le fichier `.env` (local uniquement)
2. Ajoutez-les comme secrets GitHub (pour le déploiement)
3. Ne les partagez plus jamais publiquement

---

**Date de l'incident** : Maintenant
**Action requise** : Régénérer les clés immédiatement
