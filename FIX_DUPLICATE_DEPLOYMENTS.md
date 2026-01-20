# Fix: Déploiements en double sur Cloudflare Pages

## Problème

Les déploiements apparaissent en double dans Cloudflare Pages car :
1. Le workflow GitHub Actions crée un déploiement à chaque push
2. L'intégration GitHub directe de Cloudflare Pages crée aussi un déploiement automatique

## Solution

### Option 1 : Désactiver l'intégration GitHub directe (Recommandé)

Si vous utilisez GitHub Actions pour déployer, vous devez **désactiver** l'intégration GitHub directe dans Cloudflare Pages :

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Naviguez vers **Pages** > **edano-podcast**
3. Allez dans **Settings** > **Builds & deployments**
4. Si vous voyez une connexion GitHub, **déconnectez-la** ou **désactivez les déploiements automatiques**
5. Les déploiements se feront uniquement via GitHub Actions

### Option 2 : Utiliser uniquement l'intégration Cloudflare (Alternative)

Si vous préférez utiliser l'intégration directe de Cloudflare :
1. Supprimez le workflow `.github/workflows/deploy.yml`
2. Configurez Cloudflare Pages pour se connecter directement à GitHub
3. Configurez les variables d'environnement dans Cloudflare Pages (pas dans GitHub Secrets)

## Recommandation

**Option 1 est recommandée** car :
- Vous gardez le contrôle total via GitHub Actions
- Vous pouvez voir les logs de build dans GitHub
- Les secrets restent dans GitHub (plus sécurisé)
- Vous pouvez personnaliser le processus de build
