# BalaG Portfolio 🚀

A modern, responsive portfolio website built with React, Vite, and Framer Motion. Features smooth animations, dark mode support, and an integrated contact form with Google Sheets backend.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.0-646CFF?style=flat&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.35.1-FF0055?style=flat&logo=framer)

## ✨ Features

- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Contact Form** - Integrated with Google Sheets for form submissions
- **Performance Optimized** - Fast loading with Vite's build optimization
- **SEO Friendly** - Semantic HTML and proper meta tags

## 🎯 Sections

- **Hero** - Eye-catching introduction with animated elements
- **About** - Professional background and experience timeline
- **Skills** - Interactive skill categories with progress bars
- **Services** - Offered services with detailed descriptions
- **Projects** - Featured work with tech stack highlights
- **Contact** - Functional contact form with validation

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 8.0.0
- **Animation Library:** Framer Motion 12.35.1
- **Styling:** CSS-in-JS (Inline Styles)
- **Fonts:** Google Fonts (Poppins, Inter, JetBrains Mono)
- **Form Backend:** Google Sheets API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd balag-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_SHEET_URL=your_google_sheets_web_app_url
   VITE_EMAIL_ID=your_email@example.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Configuration

### Google Sheets Integration

To enable the contact form:

1. Create a Google Sheet for storing form submissions
2. Set up a Google Apps Script web app to handle POST requests
3. Add the web app URL to your `.env` file as `VITE_GOOGLE_SHEET_URL`

Example Google Apps Script:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.name, data.email, data.message]);
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}));
}
```

### Customization

**Update Personal Information:**
- Edit the data constants at the top of `src/App.jsx`
- Modify `NAV_LINKS`, `SKILLS`, `SERVICES`, and `PROJECTS` arrays

**Change Color Scheme:**
- Update gradient colors in the component styles
- Primary colors: `#5B6CFF`, `#6E3AFF`, `#8F6BFF`

**Add/Remove Sections:**
- Components are modular - add or remove sections in the main `App` component

## 📁 Project Structure

```
balag-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx          # Main application component
│   ├── App.css          # Global styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Base CSS
├── .env                 # Environment variables (not in git)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Key Components

- **Navbar** - Sticky navigation with smooth scroll and theme toggle
- **Hero** - Animated hero section with floating badges
- **About** - Timeline-based experience showcase
- **Skills** - Category-based skill display with progress bars
- **Services** - Service cards with hover effects
- **Projects** - Project showcase with tech stack tags
- **Contact** - Form with validation and Google Sheets integration
- **Footer** - Simple footer with copyright

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**S R Balaji (BalaG)**
- LinkedIn: [Profile](https://www.linkedin.com/in/balaji-s-r-1327201a1/)
- Email: balaji.dev.mailbox@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Built with ❤️ by S R Balaji
