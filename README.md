# Saairishi Polymers Web Application

A modern, high-performance showcase platform and catalog developed for **Saairishi Polymers**. The project showcases industrial polymer products and adhesive solutions through an interactive interface with premium custom aesthetics, responsive layouts, and local storage data persistence.

This project was built in two phases to explore different web paradigms:
1. **Vanilla Web Stack:** Created using semantic HTML5, custom responsive CSS3, and native JavaScript.
2. **Modern SPA Stack (React & Vite):** Migrated to a modular Single Page Application (SPA) to practice component architecture, state handling, and client-side routing.

---

## 🚀 Key Features

*   **Single Page Application (SPA):** Seamless, instant page routing implemented using `react-router-dom` (v6) to prevent full-page reloads and enhance user experience.
*   **Premium Custom Styling:** Built entirely with **Vanilla CSS3** (utilizing CSS Custom Properties for theme tokens, CSS Grid/Flexbox layouts, and keyframe micro-animations for high-fidelity interactive elements). No heavy CSS frameworks were used, keeping page loads ultra-fast.
*   **Serverless Enquiry Pipeline:** Integrated a serverless backend approach using the **Web3Forms API** and native `Fetch` requests to submit client contact and inquiry forms directly to email inbox targets.
*   **Client-Side Persistence:** Local persistence implemented with **HTML5 LocalStorage** to cache client inquiry history (`saairishi_enquiries`) across sessions in JSON format.
*   **Automated Asset Pipeline (Python):** Included automated image preprocessing scripts to inspect product image color palettes, calculate bounding crops, and prepare assets for the UI grid.

---

## 🛠️ Tech Stack

*   **Frontend Core:** React (v18), JavaScript (ES6+), HTML5
*   **Routing & Bundling:** React Router v6, Vite (for hot-module reloading and production compilation)
*   **Styling:** Vanilla CSS3 (Modular Layouts, Custom Properties)
*   **Backend Integration:** Web3Forms API, HTML5 LocalStorage API
*   **Automation Utilities:** Python (for image asset cropping & color classification)

---

## ⚙️ How to Run Locally

### React Version
1. Navigate to the React directory:
   ```bash
   cd react-version
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```

### Vanilla Version
*   Simply open the root `index.html` file directly in any modern browser or run it using an editor extension like Live Server.
