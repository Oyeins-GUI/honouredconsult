#!/bin/bash

echo "========================================="
echo "Backend API Test Suite"
echo "========================================="
echo ""

# Test health endpoint
echo "1. Testing Health Endpoint..."
curl -s http://localhost:5000/health | head -3
echo -e "\n"

# Test admin login
echo "2. Testing Admin Login..."
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"info@honouredconsult.com","password":"honouredconsult$10,000,000@100%"}')
echo "$TOKEN_RESPONSE" | head -3
echo -e "\n"

# Extract token
TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi

echo "✅ Login successful! Token obtained"
echo -e "\n"

# Test authenticated endpoint
echo "3. Testing Admin Stats Endpoint..."
curl -s -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | head -10
echo -e "\n"

# Test consultations endpoint
echo "4. Testing Consultations List (Admin)..."
curl -s -X GET http://localhost:5000/api/consultations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | head -10
echo -e "\n"

echo "========================================="
echo "Tests completed!"
echo "========================================="
