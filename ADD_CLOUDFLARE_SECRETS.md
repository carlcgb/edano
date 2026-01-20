# ⚠️ IMPORTANT : Ajouter les Secrets Cloudflare dans GitHub

**NE COMMITEZ JAMAIS ces valeurs dans le code !** Elles doivent être ajoutées comme secrets GitHub.

## 🔐 Secrets à Ajouter

Vous avez fourni :
- **CLOUDFLARE_ACCOUNT_ID** : `3a7b38e32b3d792baa395ed259fe8fe6`
- **CLOUDFLARE_API_TOKEN** : `hivYkMXG0-z1PplbpDwfigk_PBkUz5QWqJVMrKjC`

## 📝 Instructions pour Ajouter les Secrets

### Étape 1 : Accéder aux Secrets GitHub

1. Allez sur : https://github.com/carlcgb/edano/settings/secrets/actions

### Étape 2 : Ajouter CLOUDFLARE_ACCOUNT_ID

1. Cliquez sur **"New repository secret"**
2. **Name** : `CLOUDFLARE_ACCOUNT_ID`
3. **Secret** : `3a7b38e32b3d792baa395ed259fe8fe6`
4. Cliquez sur **"Add secret"**

### Étape 3 : Ajouter CLOUDFLARE_API_TOKEN

1. Cliquez sur **"New repository secret"**
2. **Name** : `CLOUDFLARE_API_TOKEN`
3. **Secret** : `hivYkMXG0-z1PplbpDwfigk_PBkUz5QWqJVMrKjC`
4. Cliquez sur **"Add secret"**

### Étape 4 : Vérifier

Une fois les secrets ajoutés, vous devriez voir dans la liste :
- ✅ `CLOUDFLARE_ACCOUNT_ID`
- ✅ `CLOUDFLARE_API_TOKEN`

## 🚀 Tester le Déploiement

Après avoir ajouté les secrets :

1. Allez dans l'onglet **"Actions"** de votre repository
2. Le workflow se déclenchera automatiquement au prochain push
3. Ou vous pouvez relancer le dernier workflow manuellement

Le déploiement devrait maintenant fonctionner !

## ⚠️ Sécurité

- ✅ Ces valeurs sont maintenant sécurisées dans GitHub Secrets
- ✅ Elles ne seront jamais visibles dans le code ou les logs publics
- ✅ Seul le workflow GitHub Actions peut y accéder

---

**Note** : Si vous avez accidentellement commité ces valeurs, régénérez immédiatement le token API dans Cloudflare Dashboard.
