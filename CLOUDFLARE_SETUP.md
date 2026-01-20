# Configuration Cloudflare pour le Déploiement

## ❌ Erreur Actuelle

Le workflow GitHub Actions échoue avec l'erreur :
```
Error: Input required and not supplied: apiToken
```

Cela signifie que les secrets Cloudflare ne sont pas configurés dans GitHub.

## 🔧 Solution : Configurer les Secrets GitHub

### Étape 1 : Obtenir le Token API Cloudflare

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Cliquez sur votre profil (en haut à droite) → **"My Profile"**
3. Allez dans l'onglet **"API Tokens"**
4. Cliquez sur **"Create Token"**
5. Utilisez le template **"Edit Cloudflare Workers"** ou créez un token personnalisé avec :
   - **Permissions** :
     - `Account:Cloudflare Pages:Edit`
     - `Zone:Zone:Read` (si vous avez un domaine)
   - **Account Resources** : Sélectionnez votre compte
6. Cliquez sur **"Continue to summary"** puis **"Create Token"**
7. **Copiez le token immédiatement** (vous ne pourrez plus le voir après)

### Étape 2 : Obtenir l'Account ID Cloudflare

1. Dans le [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sélectionnez votre compte (si vous en avez plusieurs)
3. L'**Account ID** est visible dans l'URL ou dans la barre latérale droite
4. C'est une chaîne de caractères alphanumériques (ex: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Étape 3 : Ajouter les Secrets dans GitHub

1. Allez sur votre repository : https://github.com/carlcgb/edano
2. Cliquez sur **"Settings"** (Paramètres)
3. Dans le menu de gauche : **"Secrets and variables"** → **"Actions"**
4. Cliquez sur **"New repository secret"** et ajoutez :

#### Secret 1 : CLOUDFLARE_API_TOKEN
- **Name** : `CLOUDFLARE_API_TOKEN`
- **Value** : Collez le token API que vous avez créé à l'étape 1
- Cliquez sur **"Add secret"**

#### Secret 2 : CLOUDFLARE_ACCOUNT_ID
- **Name** : `CLOUDFLARE_ACCOUNT_ID`
- **Value** : Collez votre Account ID de l'étape 2
- Cliquez sur **"Add secret"**

### Étape 4 : Vérifier le Workflow

Une fois les secrets ajoutés :

1. Allez dans l'onglet **"Actions"** de votre repository
2. Le workflow se déclenchera automatiquement au prochain push
3. Ou vous pouvez le relancer manuellement en cliquant sur le dernier workflow et **"Re-run jobs"**

## ✅ Checklist

- [ ] Token API Cloudflare créé
- [ ] Account ID Cloudflare trouvé
- [ ] Secret `CLOUDFLARE_API_TOKEN` ajouté dans GitHub
- [ ] Secret `CLOUDFLARE_ACCOUNT_ID` ajouté dans GitHub
- [ ] Workflow testé et fonctionnel

## 🚀 Alternative : Déploiement Manuel

Si vous préférez ne pas configurer le déploiement automatique pour l'instant, vous pouvez :

1. Build localement : `npm run build`
2. Déployer manuellement via l'interface Cloudflare Pages
3. Ou commenter temporairement l'étape de déploiement dans le workflow

## 📝 Note sur le Nom du Projet

Le workflow utilise `projectName: 'edano-podcast'`. Assurez-vous que :
- Soit un projet Cloudflare Pages avec ce nom existe déjà
- Soit vous créez un projet avec ce nom dans Cloudflare Pages
- Soit vous modifiez le nom dans `.github/workflows/deploy.yml` pour correspondre à votre projet

---

**Besoin d'aide ?** Consultez la [documentation Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/git-integration/)
