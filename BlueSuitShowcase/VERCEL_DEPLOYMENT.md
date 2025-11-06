# Vercel Deployment Guide - Fix for Missing Skills & Achievements

This guide will help you fix the issue where skills and achievements don't show on your Vercel deployment.

## The Problem

When you deploy to Vercel, your **production database** is empty (no tables or data). The development database on Replit has all the data, but Vercel uses a different database.

## The Solution - 3 Steps

### Step 1: Set Up Production Database on Vercel

1. **Go to your Vercel Dashboard**
   - Open your project
   - Click **Settings** → **Environment Variables**

2. **Verify DATABASE_URL exists**
   - Make sure `DATABASE_URL` is set and points to your production PostgreSQL database
   - If you don't have a database yet, create one (Neon, Supabase, or Vercel Postgres)

### Step 2: Push Database Schema to Production

You need to create the tables in your production database. Run this command **on your local machine or Replit**:

```bash
cd BlueSuitShowcase
DATABASE_URL="your-production-database-url-here" npm run db:push
```

**Important:** Replace `your-production-database-url-here` with your actual production DATABASE_URL from Vercel.

If you get a warning about data loss, use:
```bash
DATABASE_URL="your-production-database-url-here" npm run db:push --force
```

This will create these tables in production:
- `users`
- `experiences` 
- `skills`
- `achievements`
- `cv_files`

### Step 3: Deploy to Vercel

Now when you deploy to Vercel:

```bash
git add .
git commit -m "Fix: Add better database seeding"
git push origin main
```

Vercel will automatically:
1. Build your app
2. Start the server
3. Run the seeding function which will populate all the data automatically

## How Automatic Seeding Works

The server checks the database on startup:
- If `experiences` table is empty → Seeds 3 job experiences
- If `skills` table is empty → Seeds 8 skills
- If `achievements` table is empty → Seeds 7 certificates

This happens automatically on **every** deployment, so your data will always be there!

## Verify It's Working

After deployment:

1. Check Vercel deployment logs:
   - Go to your Vercel project → **Deployments** → Click latest deployment → **Runtime Logs**
   - You should see:
     ```
     Checking database and seeding if empty...
     Seeding experiences...
     Seeding skills...
     Seeding achievements...
     Database check complete. Experiences: 3, Skills: 8, Achievements: 7
     ```

2. Open your live website:
   - Navigate to the Skills section → Should show 8 skills
   - Navigate to Achievements → Should show 7 certificates

## Troubleshooting

### If skills/achievements still don't show:

1. **Check Vercel Runtime Logs** for errors:
   - Look for "ERROR seeding database" messages
   - This will tell you exactly what went wrong

2. **Verify DATABASE_URL** is correct:
   - In Vercel Settings → Environment Variables
   - Make sure it's set for **Production** environment

3. **Check certificate images**:
   - The images should be in `client/public/certificates/`
   - They are automatically included in the build

4. **Re-run database push**:
   - If tables don't exist, the seeding will fail
   - Make sure you ran `npm run db:push` with your production DATABASE_URL

## Alternative: Manual SQL Script

If automatic seeding doesn't work, you can use the SQL script I created earlier:

1. Open `seed-achievements-production.sql`
2. Run it against your production database using:
   - Vercel's database dashboard
   - psql command line
   - Any PostgreSQL client (TablePlus, pgAdmin, etc.)

## Quick Checklist

- [ ] Production DATABASE_URL set in Vercel environment variables
- [ ] Ran `npm run db:push` with production DATABASE_URL to create tables
- [ ] Pushed code to GitHub
- [ ] Vercel deployed successfully
- [ ] Checked Vercel runtime logs for seeding messages
- [ ] Verified skills and achievements show on live site

## Need Help?

If you're still having issues:
1. Check the Vercel runtime logs
2. Share the error messages
3. Verify your DATABASE_URL is accessible from Vercel
