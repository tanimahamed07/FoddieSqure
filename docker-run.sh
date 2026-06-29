#!/bin/bash

# FoodieSquare - Simple Docker Run Script
# শুধু এই file run করলেই সব হয়ে যাবে!

echo "🍔 FoodieSquare Docker Setup"
echo "============================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file নেই!"
    echo "প্রথমে .env.local file তৈরি করুন এবং MongoDB URI দিন।"
    exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

echo "Step 1: Docker image build করছি..."
docker build -t foodiesquare .

echo ""
echo "Step 2: Container run করছি..."
docker run -d -p 3000:3000 \
  --name foodiesquare-app \
  -e MONGODB_URI="$MONGODB_URI" \
  -e NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
  -e NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost:3000}" \
  -e GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID" \
  -e GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET" \
  foodiesquare

echo ""
echo "✅ Done! App চলছে http://localhost:3000 এ"
echo ""
echo "Useful commands:"
echo "  Stop:    docker stop foodiesquare-app"
echo "  Logs:    docker logs -f foodiesquare-app"
echo "  Remove:  docker rm -f foodiesquare-app"
