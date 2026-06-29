# 🐳 FoodieSquare - সহজ Docker + CI/CD গাইড

একদম beginner friendly! শুধু copy-paste করুন।

---

## 📦 Part 1: Docker দিয়ে Local এ Run করুন

### Step 1: Docker Install করুন

Mac এর জন্য: https://docs.docker.com/desktop/install/mac-install/

Download করে install করুন। সব default settings রাখুন।

### Step 2: Docker Image Build করুন

Terminal open করে এই command দিন:

```bash
cd /Users/tanimahamed/FoddieSqure
docker build -t foodiesquare .
```

⏳ প্রথমবার 5-10 মিনিট লাগতে পারে। চা খেয়ে আসুন! ☕

### Step 3: Docker Container Run করুন

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="আপনার-mongodb-uri-এখানে-দিন" \
  -e NEXTAUTH_SECRET="আপনার-secret-এখানে-দিন" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  foodiesquare
```

**Environment variables কোথা থেকে পাবেন?**

- Vercel Dashboard → Your Project → Settings → Environment Variables
- সব variables copy করে উপরের command এ দিন

### Step 4: Browser এ Open করুন

http://localhost:3000

🎉 Done! আপনার app Docker এ চলছে!

---

## 🚀 Part 2: GitHub + Docker Hub এ CI/CD Setup

### Step 1: Docker Hub Account তৈরি করুন

1. যান: https://hub.docker.com/
2. Sign up করুন (free account)
3. Username মনে রাখুন (পরে লাগবে)

### Step 2: Docker Hub Token তৈরি করুন

1. Docker Hub এ login করার পর: **Account Settings**
2. **Security** → **New Access Token**
3. Name দিন: `github-actions`
4. **Generate** button এ click করুন
5. Token **copy** করে রাখুন (একবারই দেখাবে!)

### Step 3: GitHub Repository তে Secrets Add করুন

1. আপনার GitHub repo তে যান
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** এ click করুন

এই দুইটা secret add করুন:

**Secret 1:**

- Name: `DOCKERHUB_USERNAME`
- Value: আপনার Docker Hub username

**Secret 2:**

- Name: `DOCKERHUB_TOKEN`
- Value: আগে copy করা token

### Step 4: Code Push করুন

```bash
git add .
git commit -m "Add Docker and CI/CD"
git push origin main
```

### Step 5: Check করুন

1. GitHub এ যান: **Actions** tab
2. দেখবেন একটা workflow run হচ্ছে
3. 5-10 মিনিট পর সফল হলে ✅ দেখাবে
4. এখন Docker Hub এ যান: https://hub.docker.com/
5. আপনার `foodiesquare` image দেখতে পাবেন!

---

## 🎯 এখন কি হচ্ছে?

যখনই আপনি `main` branch এ code push করবেন:

1. ✅ GitHub Actions automatically start হবে
2. ✅ Docker image build হবে
3. ✅ Docker Hub এ upload হবে
4. ✅ যেকোনো server থেকে pull করতে পারবেন

---

## 🖥️ যেকোনো Server এ Deploy করুন

আপনার Docker Hub এ image upload হয়ে গেলে যেকোনো server এ এভাবে run করতে পারবেন:

```bash
docker pull yourusername/foodiesquare:latest

docker run -d -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  yourusername/foodiesquare:latest
```

**কোন কোন platform এ deploy করতে পারবেন:**

- ✅ Railway (সবচেয়ে সহজ, free tier আছে)
- ✅ Render (free tier আছে)
- ✅ DigitalOcean (৪ ডলার/মাস)
- ✅ AWS/Azure/GCP (complex কিন্তু powerful)
- ✅ যেকোনো VPS (Ubuntu server থাকলে)

---

## 🐛 সমস্যা হলে

### Docker build error হলে:

```bash
# Cache clear করুন
docker system prune -a
# আবার build করুন
docker build -t foodiesquare .
```

### GitHub Actions fail হলে:

1. Actions tab এ গিয়ে error log পড়ুন
2. DOCKERHUB_USERNAME এবং DOCKERHUB_TOKEN ঠিক আছে কিনা check করুন
3. Secrets এ space বা extra character নেই তো?

### Docker run error হলে:

```bash
# Running containers দেখুন
docker ps

# Logs দেখুন
docker logs <container-id>

# Stop করুন
docker stop <container-id>
```

---

## 📝 Useful Commands

```bash
# Docker image দেখুন
docker images

# Running containers দেখুন
docker ps

# Container stop করুন
docker stop <container-id>

# সব কিছু clean করুন
docker system prune -a

# Logs দেখুন
docker logs -f <container-id>
```

---

## ✅ Checklist

Deploy করার আগে নিশ্চিত করুন:

- [ ] Docker Desktop installed এবং running
- [ ] Docker Hub account created
- [ ] GitHub repository তে DOCKERHUB_USERNAME secret added
- [ ] GitHub repository তে DOCKERHUB_TOKEN secret added
- [ ] `.github/workflows/deploy.yml` file আছে
- [ ] `Dockerfile` file আছে
- [ ] Code push করেছেন

---

## 🎉 Congratulations!

এখন আপনার project এ Docker + CI/CD আছে!

**এর মানে:**

- ✅ যেকোনো machine এ same ভাবে run হবে
- ✅ Automatic deployment
- ✅ Professional setup
- ✅ Portfolio তে দেখানো যাবে!

**আরো help লাগলে:**

- Docker docs: https://docs.docker.com/
- GitHub Actions: https://docs.github.com/en/actions

Happy coding! 🚀
