<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1d7T2TwX1uSnw4266pkma_aGeicCx85Vd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the following environment variables in your `.env.local` file:
   ```
   VITE_PUBLIC_SUPABASE_URL="https://zolrcagiahanxmutregk.supabase.co"
   VITE_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvbHJjYWdpYWhhbnhtdXRyZWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MjA5OTMsImV4cCI6MjA3Nzk5Njk5M30.4NIhyZ7pX3IHyK4fspwHHD2lSNM5ZCRc0-saOGJ5wrU"
   VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```
   Replace `"YOUR_GEMINI_API_KEY"` with your actual key.
3. Run the app:
   `npm run dev`