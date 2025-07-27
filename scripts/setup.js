#!/usr/bin/env node

/**
 * Setup script for new Global Shapers Hub websites
 * This script helps configure the website for a new hub
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`
${colors.blue}${colors.bright}╔════════════════════════════════════════════════╗
║       Global Shapers Hub Website Setup         ║
╚════════════════════════════════════════════════╝${colors.reset}

Welcome! This script will help you customize the website for your hub.
`);

async function main() {
  try {
    // Gather hub information
    console.log(`${colors.yellow}📝 Hub Information${colors.reset}\n`);
    
    const hubInfo = {
      hubName: await question('Hub name (e.g., "London Hub III"): '),
      cityName: await question('City name (e.g., "London"): '),
      country: await question('Country (e.g., "United Kingdom"): '),
      email: await question('Contact email: '),
      websiteUrl: await question('Website URL (e.g., "https://londonhubiii.com"): '),
    };

    console.log(`\n${colors.yellow}📱 Social Media Links${colors.reset}\n`);
    
    const socialMedia = {
      twitter: await question('Twitter handle (e.g., "@londonshapersiii") [optional]: '),
      facebook: await question('Facebook URL [optional]: '),
      instagram: await question('Instagram URL [optional]: '),
      linkedin: await question('LinkedIn URL [optional]: '),
    };

    console.log(`\n${colors.yellow}🔐 Firebase Configuration${colors.reset}\n`);
    console.log('You\'ll need these values from your Firebase project settings.\n');
    
    const firebase = {
      apiKey: await question('Firebase API Key: '),
      authDomain: await question('Auth Domain: '),
      projectId: await question('Project ID: '),
      storageBucket: await question('Storage Bucket: '),
      messagingSenderId: await question('Messaging Sender ID: '),
      appId: await question('App ID: '),
    };

    // Create .env.local file
    console.log(`\n${colors.blue}Creating environment configuration...${colors.reset}`);
    
    const envContent = `# Hub Configuration
NEXT_PUBLIC_HUB_NAME="${hubInfo.hubName}"
NEXT_PUBLIC_CITY_NAME="${hubInfo.cityName}"
NEXT_PUBLIC_COUNTRY="${hubInfo.country}"
NEXT_PUBLIC_EMAIL_ADDRESS="${hubInfo.email}"
NEXT_PUBLIC_HUB_URL="${hubInfo.websiteUrl}"

# Social Media
NEXT_PUBLIC_TWITTER_HANDLE="${socialMedia.twitter}"
NEXT_PUBLIC_TWITTER_URL="${socialMedia.twitter ? `https://twitter.com/${socialMedia.twitter.replace('@', '')}` : ''}"
NEXT_PUBLIC_FACEBOOK_URL="${socialMedia.facebook}"
NEXT_PUBLIC_INSTAGRAM_URL="${socialMedia.instagram}"
NEXT_PUBLIC_LINKEDIN_URL="${socialMedia.linkedin}"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="${firebase.apiKey}"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="${firebase.authDomain}"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="${firebase.projectId}"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="${firebase.storageBucket}"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="${firebase.messagingSenderId}"
NEXT_PUBLIC_FIREBASE_APP_ID="${firebase.appId}"

# Additional Configuration
NEXT_PUBLIC_SITE_URL="${hubInfo.websiteUrl}"
ENCRYPTION_KEY="${generateRandomKey()}"
`;

    fs.writeFileSync('.env.local', envContent);
    console.log(`${colors.green}✓ Created .env.local file${colors.reset}`);

    // Update package.json
    console.log(`\n${colors.blue}Updating package.json...${colors.reset}`);
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = hubInfo.hubName.toLowerCase().replace(/\s+/g, '-');
    packageJson.description = `Official website for ${hubInfo.hubName}`;
    packageJson.homepage = hubInfo.websiteUrl;
    
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log(`${colors.green}✓ Updated package.json${colors.reset}`);

    // Create placeholder images directory
    console.log(`\n${colors.blue}Creating placeholder directories...${colors.reset}`);
    
    const dirs = [
      'public/assets/images/projects',
      'public/assets/images/partners',
      'public/assets/images/team',
    ];
    
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`${colors.green}✓ Created ${dir}${colors.reset}`);
      }
    });

    // Final instructions
    console.log(`
${colors.green}${colors.bright}✅ Setup Complete!${colors.reset}

${colors.yellow}Next Steps:${colors.reset}

1. ${colors.bright}Install dependencies:${colors.reset}
   npm install (or bun install)

2. ${colors.bright}Replace placeholder images:${colors.reset}
   - Hub logo: public/assets/images/gs_white_logo.png
   - Hero image: public/assets/images/hub3photo.jpg
   - Team photos in: public/assets/images/

3. ${colors.bright}Customize content:${colors.reset}
   - Edit src/lib/texts.ts for all text content
   - Edit src/lib/impact-config.ts for impact page content
   - Edit src/lib/config.ts for site-wide settings

4. ${colors.bright}Set up Firebase:${colors.reset}
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Add your email to the 'admins' collection

5. ${colors.bright}Run the development server:${colors.reset}
   npm run dev (or bun run dev)

6. ${colors.bright}Deploy to production:${colors.reset}
   - Push to GitHub
   - Deploy with Vercel or Netlify

${colors.blue}Need help? Check the docs/ directory or open an issue on GitHub.${colors.reset}
`);

  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  } finally {
    rl.close();
  }
}

function generateRandomKey() {
  return Array.from({ length: 32 }, () => 
    Math.random().toString(36).charAt(2)
  ).join('');
}

main();