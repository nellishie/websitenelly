#!/bin/bash

# Production Database Setup Script
# This script helps you set up your production database for Vercel deployment

echo "==================================="
echo "Production Database Setup"
echo "==================================="
echo ""

# Check if DATABASE_URL is provided
if [ -z "$1" ]; then
    echo "ERROR: Please provide your production DATABASE_URL"
    echo ""
    echo "Usage:"
    echo "  ./setup-production-db.sh 'postgresql://user:pass@host/database'"
    echo ""
    echo "Example:"
    echo "  ./setup-production-db.sh 'postgresql://user:password@db.example.com/mydb'"
    echo ""
    exit 1
fi

PROD_DATABASE_URL="$1"

echo "Step 1: Pushing database schema to production..."
echo "This will create all necessary tables (users, experiences, skills, achievements, cv_files)"
echo ""

DATABASE_URL="$PROD_DATABASE_URL" npm run db:push

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Database schema pushed successfully!"
    echo ""
    echo "Step 2: Next steps"
    echo "=================="
    echo "1. Make sure DATABASE_URL is set in your Vercel environment variables"
    echo "2. Push your code to GitHub: git push origin main"
    echo "3. Vercel will deploy and automatically seed the data"
    echo ""
    echo "Your production database is ready!"
    echo ""
    echo "To verify everything works:"
    echo "- Check Vercel deployment logs for 'Seeding...' messages"
    echo "- Visit your live site and check Skills and Achievements sections"
    echo ""
else
    echo ""
    echo "✗ Error pushing schema. Common issues:"
    echo "1. Check your DATABASE_URL is correct"
    echo "2. Make sure the database is accessible"
    echo "3. Verify you have write permissions"
    echo ""
    echo "If you see a data loss warning, run:"
    echo "  DATABASE_URL='$PROD_DATABASE_URL' npm run db:push --force"
    echo ""
fi
