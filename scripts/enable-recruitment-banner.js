#!/usr/bin/env node

/**
 * Quick script to enable the recruitment banner
 * Run this script to quickly enable the recruitment banner with default settings
 * 
 * Usage: node scripts/enable-recruitment-banner.js
 */

console.log(`
📣 Recruitment Banner Setup
===========================

To enable the recruitment banner on your website:

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Create a collection called 'site_settings' (if it doesn't exist)
4. Add these documents:

   Document ID: recruitment_banner_enabled
   Field: value = "true"

   Document ID: recruitment_banner_text  
   Field: value = "🎉 Recruitment is now OPEN! Join us in shaping the future."

   Document ID: recruitment_url
   Field: value = "https://docs.google.com/forms/d/e/1FAIpQLSeQG2i-YIVhJHKhmmBk8HcwUbj4iGRwzItB8yPK-6PULPN50A/viewform"

OR

If you have admin access:
1. Go to /hub/dashboard
2. Navigate to "Site Settings"
3. Toggle "Show Recruitment Banner" to Enabled
4. Customize the banner text if desired
5. Save your changes

The banner will appear at the top of all pages and can be dismissed by users for their session.

✨ Happy recruiting!
`);