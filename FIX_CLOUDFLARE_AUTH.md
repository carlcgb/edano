# 🔧 Résolution de l'Erreur d'Authentification Cloudflare

## ❌ Erreur Actuelle

```
Cloudflare API returned non-200: 401
Authentication error
Failed to get Pages project, API returned non-200
```

Cela signifie que l'authentification Cloudflare échoue. Voici les solutions :

## ✅ Solution 1 : Vérifier le Token API

### Étape 1 : Vérifier que le Token est Correct

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **My Profile** → **API Tokens**
3. Vérifiez que votre token existe et est actif
4. Si nécessaire, créez un nouveau token avec les permissions suivantes :

**Permissions requises :**
- `Account:Cloudflare Pages:Edit`
- `Account:Account:Read` (optionnel mais recommandé)

### Étape 2 : Vérifier les Secrets GitHub

1. Allez sur : https://github.com/carlcgb/edano/settings/secrets/actions
2. Vérifiez que :
   - `CLOUDFLARE_API_TOKEN` existe et contient le bon token
   - `CLOUDFLARE_ACCOUNT_ID` existe et contient le bon ID
3. **Important** : Assurez-vous qu'il n'y a pas d'espaces avant/après les valeurs

## ✅ Solution 2 : Créer le Projet Cloudflare Pages

Le projet `edano-podcast` doit exister dans Cloudflare Pages avant le déploiement.

### Option A : Créer via l'Interface Web

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → **Pages**
3. Cliquez sur **"Create application"** → **"Pages"** → **"Connect to Git"**
4. Connectez votre repository GitHub `carlcgb/edano`
5. Configurez :
   - **Project name** : `edano-podcast`
   - **Production branch** : `main`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
6. Cliquez sur **"Save and Deploy"**

### Option B : Créer via l'API (si vous préférez)

Le workflow créera automatiquement le projet s'il n'existe pas, mais il faut que le token ait les bonnes permissions.

## ✅ Solution 3 : Vérifier le Token a les Bonnes Permissions

### Créer un Nouveau Token avec les Bonnes Permissions

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **My Profile** → **API Tokens** → **Create Token**
3. Utilisez le template **"Edit Cloudflare Workers"** ou créez un token personnalisé :

**Configuration du Token :**
- **Permissions** :
  - `Account` → `Cloudflare Pages` → `Edit`
  - `Account` → `Account` → `Read` (optionnel)
- **Account Resources** :
  - Include → All accounts (ou sélectionnez votre compte spécifique)
- **Zone Resources** : None (pas nécessaire pour Pages)

4. Cliquez sur **"Continue to summary"** puis **"Create Token"**
5. **Copiez le nouveau token**
6. Mettez à jour le secret GitHub `CLOUDFLARE_API_TOKEN` avec ce nouveau token

## ✅ Solution 4 : Vérifier l'Account ID

1. Dans [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sélectionnez votre compte
3. L'**Account ID** est visible :
   - Dans l'URL (après `/accounts/`)
   - Ou dans la barre latérale droite sous "Account ID"
4. Vérifiez que le secret `CLOUDFLARE_ACCOUNT_ID` dans GitHub correspond exactement

## 🧪 Tester l'Authentification

Vous pouvez tester si votre token fonctionne avec cette commande (remplacez les valeurs) :

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/3a7b38e32b3d792baa395ed259fe8fe6/pages/projects" \
  -H "Authorization: Bearer hivYkMXG0-z1PplbpDwfigk_PBkUz5QWqJVMrKjC" \
  -H "Content-Type: application/json"
```

Si vous obtenez une réponse 200 avec une liste de projets, l'authentification fonctionne.

## 📝 Checklist de Vérification

- [ ] Token API Cloudflare existe et est actif
- [ ] Token a les permissions `Account:Cloudflare Pages:Edit`
- [ ] Secret `CLOUDFLARE_API_TOKEN` dans GitHub est correct (pas d'espaces)
- [ ] Secret `CLOUDFLARE_ACCOUNT_ID` dans GitHub est correct
- [ ] Projet Cloudflare Pages `edano-podcast` existe (ou sera créé automatiquement)
- [ ] Le token a accès au bon compte Cloudflare

## 🔄 Après Avoir Corrigé

1. Mettez à jour les secrets GitHub si nécessaire
2. Relancez le workflow dans l'onglet "Actions"
3. Le déploiement devrait maintenant fonctionner

---

**Note** : Si le problème persiste, régénérez complètement le token API et mettez à jour le secret GitHub.
