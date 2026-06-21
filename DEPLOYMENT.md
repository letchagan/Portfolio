# Static Website Deployment Guide

Your portfolio is now configured as a **fully static website**! Here's how to build and deploy it.

---

## 🏗️ Building the Static Site

Run this command to generate the static files:

```bash
npm run build
```

This will create an `out` folder containing all your static HTML, CSS, and JavaScript files.

---

## 📁 What Gets Generated

After building, you'll have:
- **`out/`** folder - Contains all static files ready for deployment
- **`out/index.html`** - Your main page
- **`out/_next/`** - Optimized JavaScript and CSS
- **`out/*.html`** - All your pages as static HTML

---

## 🚀 Deployment Options

### Option 1: **Netlify** (Recommended - Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Deploy manually"
4. Drag and drop your **`out`** folder
5. Done! Your site is live 🎉

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --dir=out --prod
```

---

### Option 2: **Vercel** (Next.js Native)

1. Go to [vercel.com](https://vercel.com)
2. Import your project from GitHub
3. Vercel auto-detects Next.js and deploys
4. Your site is live! 🚀

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel --prod
```

---

### Option 3: **GitHub Pages**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"scripts": {
  "deploy": "gh-pages -d out"
}
```

3. Deploy:
```bash
npm run build
npm run deploy
```

4. Enable GitHub Pages in your repo settings

---

### Option 4: **Any Static Host** (Hostinger, Bluehost, etc.)

1. Build your site:
```bash
npm run build
```

2. Upload the **entire `out` folder** contents to your web host via:
   - FTP/SFTP
   - cPanel File Manager
   - Host's upload interface

3. Make sure `index.html` is in the root directory

---

## 🔧 Custom Domain Setup

After deployment, you can add your custom domain:

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update your DNS records

### For Vercel:
1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS

### For GitHub Pages:
1. Add a `CNAME` file in the `out` folder with your domain
2. Configure DNS to point to GitHub Pages

---

## ✅ Pre-Deployment Checklist

- [ ] Update email in contact section (`components/colophon-section.tsx`)
- [ ] Add your real social media links
- [ ] Update project descriptions with your actual projects
- [ ] Test the build locally: `npm run build && npx serve out`
- [ ] Check mobile responsiveness
- [ ] Verify all links work

---

## 🧪 Testing Locally

To test your static build before deploying:

```bash
# Build the site
npm run build

# Serve it locally
npx serve out
```

Then open `http://localhost:3000` to preview.

---

## 📊 Performance Tips

Your site is already optimized with:
- ✅ Static HTML generation
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Fast loading animations
- ✅ Mobile responsive

---

## 🆘 Troubleshooting

**Build fails?**
- Check for TypeScript errors (currently ignored)
- Ensure all dependencies are installed: `npm install`

**Site looks broken after deployment?**
- Check browser console for errors
- Verify all assets are uploaded
- Clear browser cache

**Animations not working?**
- Ensure JavaScript is enabled
- Check if CDN is blocking scripts

---

## 🎉 You're Ready!

Your portfolio is production-ready. Choose your deployment method and go live!

**Recommended:** Start with Netlify for the easiest deployment experience.
