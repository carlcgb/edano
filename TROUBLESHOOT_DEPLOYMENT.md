# 🔍 Diagnostic du Déploiement Cloudflare

## Pourquoi le déploiement ne fonctionne pas ?

Plusieurs raisons possibles :

### 1. ❌ Secrets GitHub non configurés

**Vérification :**
1. Allez sur : https://github.com/carlcgb/edano/settings/secrets/actions
2. Vérifiez que ces secrets existent :
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

**Solution :** Ajoutez les secrets si ils n'existent pas (voir `ADD_CLOUDFLARE_SECRETS.md`)

---

### 2. ❌ Token API invalide ou sans permissions

**Symptômes :**
- Erreur 401 (Authentication error) dans les logs GitHub Actions
- Le workflow échoue à l'étape "Deploy to Cloudflare Pages"

**Solution :**
1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **My Profile** → **API Tokens**
3. Créez un nouveau token avec :
   - Permission : `Account:Cloudflare Pages:Edit`
   - Account Resources : Votre compte
4. Mettez à jour le secret `CLOUDFLARE_API_TOKEN` dans GitHub

---

### 3. ❌ Projet Cloudflare Pages n'existe pas

**Symptômes :**
- Erreur "Failed to get Pages project" dans les logs
- Le projet `edano-podcast` n'existe pas dans Cloudflare

**Solution :**
1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → **Pages**
3. Cliquez sur **"Create application"** → **"Pages"** → **"Connect to Git"**
4. Connectez votre repository GitHub
5. Configurez :
   - **Project name** : `edano-podcast`
   - **Production branch** : `main`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
6. Cliquez sur **"Save and Deploy"**

**Alternative :** Le workflow peut créer le projet automatiquement si le token a les bonnes permissions.

---

### 4. ⚠️ Le workflow utilise `continue-on-error: true`

**Problème :** Le workflow ne plantera pas même si le déploiement échoue, ce qui peut masquer les erreurs.

**Solution :** J'ai mis à jour le workflow pour :
- Vérifier que les secrets sont configurés avant de déployer
- Retirer `continue-on-error` pour voir les vraies erreurs
- Ajouter des messages de diagnostic

---

## 🔍 Comment diagnostiquer

### Étape 1 : Vérifier les logs GitHub Actions

1. Allez sur : https://github.com/carlcgb/edano/actions
2. Cliquez sur le dernier workflow
3. Regardez l'étape "Deploy to Cloudflare Pages"
4. Vérifiez les erreurs affichées

### Étape 2 : Vérifier les secrets

Le workflow vérifie maintenant automatiquement si les secrets sont configurés. Si ce n'est pas le cas, vous verrez un message d'erreur clair.

### Étape 3 : Tester l'authentification manuellement

Vous pouvez tester si votre token fonctionne avec cette commande (remplacez les valeurs) :

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/3a7b38e32b3d792baa395ed259fe8fe6/pages/projects" \
  -H "Authorization: Bearer hivYkMXG0-z1PplbpDwfigk_PBkUz5QWqJVMrKjC" \
  -H "Content-Type: application/json"
```

Si vous obtenez une réponse 200, l'authentification fonctionne.

---

## ✅ Checklist de Vérification

- [ ] Secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` existent dans GitHub
- [ ] Le token API a la permission `Account:Cloudflare Pages:Edit`
- [ ] Le projet `edano-podcast` existe dans Cloudflare Pages (ou sera créé automatiquement)
- [ ] Le workflow GitHub Actions s'exécute sans erreur
- [ ] Les logs montrent un déploiement réussi

---

## 🚀 Prochaines Étapes

1. **Vérifiez les secrets GitHub** : https://github.com/carlcgb/edano/settings/secrets/actions
2. **Relancez le workflow** : Allez dans Actions → Dernier workflow → "Re-run jobs"
3. **Vérifiez les logs** : Regardez l'étape "Deploy to Cloudflare Pages" pour voir les erreurs
4. **Créez le projet Cloudflare** si nécessaire (voir Solution 3 ci-dessus)

---

**Besoin d'aide ?** Consultez les fichiers :
- `ADD_CLOUDFLARE_SECRETS.md` - Comment ajouter les secrets
- `FIX_CLOUDFLARE_AUTH.md` - Résoudre les erreurs d'authentification
- `CLOUDFLARE_SETUP.md` - Configuration complète
