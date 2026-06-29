# GitHub Actions Workflow

এই folder এ আপনার CI/CD configuration আছে।

## কি হয়?

যখন আপনি `main` branch এ code push করবেন:

1. ⚙️ GitHub Actions automatically start হবে
2. 🐳 Docker image build হবে
3. 📤 Docker Hub এ push হবে
4. ✅ Success notification দেখাবে

## Setup করা হয়েছে?

Check করুন:

- [ ] Docker Hub account আছে?
- [ ] `DOCKERHUB_USERNAME` secret added?
- [ ] `DOCKERHUB_TOKEN` secret added?

## কিভাবে দেখবেন?

GitHub repo → **Actions** tab → Latest workflow run

## আরো জানতে

[DOCKER_SIMPLE.md](../../DOCKER_SIMPLE.md) পড়ুন
