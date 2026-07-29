# Saairishi Polymers Pvt. Ltd. — React + Vite Edition 🚀

Welcome to the premium, modern **React + Vite** migration of the Saairishi Polymers corporate web application! 

This version has been built using structural modular components, clean stateful UI effects, dynamic filters, and local caching while maintaining **100% style fidelity** and **complete mobile responsiveness**.

---

## 📋 Features Implemented

1. **Modular Architecture:** Fully separated layout templates (`Header`, `Footer`, `QuickEnquiryForm`, `showToast`) and page views (`Home`, `About`, `Products`, `Quality`, `Contact`).
2. **Dynamic Product Catalog:** Live keywords search filtering, interactive category filters (retaining dynamic counts per segment), and visual format selectors (swap between Cans and Tubes with a smooth fade).
3. **Advanced State Management:** Automated hero background carousels and smooth flasher card transitions running on native React states (without direct DOM touch).
4. **Subdirectory Routing Safe:** Set up using React Router's `<HashRouter>`, guaranteeing the application runs perfectly inside any subdirectory or hosting provider without requiring complex Nginx or Apache server URL rewrite rules.
5. **Form Integration & Offline Caching:** All quick quote and technical modal specification forms are validated and saved locally inside `localStorage` under `saairishi_enquiries`, retaining complete compatibility with the production dataset.
6. **ScrollToTop UX:** Automatic window scroll reset on page routes so switching pages begins from the top screen coordinate.

---

## ⚡ How to Run Locally

Since your Windows environment doesn't have Node.js/npm installed globally yet, follow these quick steps to get up and running:

### Step 1: Install Node.js (Choose Option A or B)

*   **Option A (Fastest — Windows Terminal):**
    Open **PowerShell** or **Command Prompt** and run this single command to install Node.js automatically:
    ```powershell
    winget install OpenJS.NodeJS
    ```
    *(After installation finishes, restart your terminal or VS Code to apply updates)*

*   **Option B (Manual Web Download):**
    Download and run the official installer for **Node.js LTS (v20 or v22)** from:
    🔗 [https://nodejs.org/](https://nodejs.org/)

---

### Step 2: Install Project Dependencies

1. Open your terminal in VS Code.
2. Navigate to the `react-version` folder (if you aren't already there):
   ```bash
   cd react-version
   ```
3. Run the installer:
   ```bash
   npm install
   ```
   *(This downloads React, React Router, and the fast Vite bundler tool chain)*

---

### Step 3: Run the Development Server

Start the local hot-reloading server:
```bash
npm run dev
```

Your terminal will show a local address like:
🔗 **`http://localhost:5173/`**

Ctrl + Click the link to open the premium React app in your browser! Try editing any `.jsx` component in `src/` to see changes update on your screen instantly.

---

## 🏗️ Production Bundle Build

To compile a highly optimized, minified production package ready for live deployment, run:
```bash
npm run build
```
This generates a standalone `/dist` bundle containing flat html, css, and js assets that can be uploaded directly to your hosting server!
