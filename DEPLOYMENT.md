# BalaG Portfolio — Deployment Guide

## 📁 Project Structure

```
balag-portfolio/
├── src/
│   ├── App.jsx                    ← Main portfolio component (paste BalaG_Portfolio.jsx here)
│   └── main.jsx
├── netlify/
│   └── functions/
│       └── contact-notification.js  ← Serverless function
├── public/
│   └── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── netlify.toml
```

---

## 🚀 Step 1 — Create Vite Project

```bash
npm create vite@latest balag-portfolio -- --template react
cd balag-portfolio
npm install
```

---

## 📦 Step 2 — Install Dependencies

```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 📂 Step 3 — Add Files

1. Copy `BalaG_Portfolio.jsx` → `src/App.jsx`
2. Copy `contact-notification.js` → `netlify/functions/contact-notification.js`

---

## ⚙️ Step 4 — Configure Vite for Netlify Functions

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## 🤖 Step 5 — Set Up Telegram Bot (FREE)

### Create the bot:
1. Open Telegram → search **@BotFather**
2. Send `/newbot`
3. Follow prompts → get your **BOT_TOKEN**

### Get your Chat ID:
1. Start a conversation with your new bot
2. Visit: `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
3. Send any message to the bot
4. Refresh the URL → find `"chat":{"id": XXXXXXX}` — that's your **CHAT_ID**

---

## 🔑 Step 6 — Set Environment Variables

### On Netlify dashboard:
1. Go to **Site Settings → Environment Variables**
2. Add:
   - `TELEGRAM_BOT_TOKEN` = your bot token
   - `TELEGRAM_CHAT_ID` = your chat ID

### For local testing, create `.env`:
```
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

---

## 💻 Step 7 — Run Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev with functions support
netlify dev
```

Visit: `http://localhost:8888`

---

## 🏗️ Step 8 — Build for Production

```bash
npm run build
```

---

## 🌐 Step 9 — Deploy to Netlify

### Option A — Netlify CLI:
```bash
netlify login
netlify init
netlify deploy --prod
```

### Option B — GitHub + Netlify:
1. Push project to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site**
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables
7. Deploy! 🚀

---

## ✅ Customization Checklist

- [ ] Update phone number in `Contact` section
- [ ] Update email address
- [ ] Update LinkedIn URL
- [ ] Replace project placeholder links with real GitHub/demo URLs
- [ ] Add real profile photo (replace emoji avatar)
- [ ] Add Telegram BOT_TOKEN and CHAT_ID to Netlify env vars
- [ ] Update project descriptions to match real work

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Animations | Framer Motion |
| Styling | TailwindCSS + Inline Styles |
| Fonts | Poppins, Inter, JetBrains Mono |
| Serverless | Netlify Functions |
| Notifications | Telegram Bot API (FREE) |
| Hosting | Netlify (FREE tier) |

---

Made with ❤️ for S R Balaji (BalaG)
