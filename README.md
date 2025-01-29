# Comprehensive Analytics Dashboard

This project showcases a **Comprehensive Analytics Dashboard** built with modern front-end technologies, incorporating advanced features, interactive animations, and robust state management. It demonstrates high-performance, accessible, and responsive design principles 

---

## **Key Features**
### **1. Weather Dashboard**
- Displays current weather and a 7-day forecast with details such as temperature trends, humidity, wind speed, and weather conditions.
- Geolocation support to fetch weather data for the user’s current location. 
- Interactive charts for weather trends using **Recharts**.

### **2. News Dashboard**
- Displays categorized news (Technology, Sports, Business, Health, Entertainment).
- Offers filtering, pagination  for articles.
- Includes detailed modals for in-depth article exploration, with external links to original sources.

### **3. Finance Dashboard**
- Provides real-time stock market data for user-selected symbols.
- Interactive stock charts (line, candlestick) with historical data analysis for various time ranges.
- Autocomplete search functionality for stock symbols.
- Key financial metrics like current price, daily high/low, volume, and percentage change.
- Interactive visualizations powered by **Chart.js**.

---

## **Technologies Used**
- **Framework**: Next.js with React and TypeScript.
- **Styling**: Tailwind CSS (customized with additional utilities and breakpoints) and SCSS Modules for scoped styles.
- **State Management**: Redux Toolkit with RTK Query for efficient data fetching and caching.
- **Animations**: Advanced animations .
- **API Integrations**:
  - Weather: OpenWeatherMap API
  - News: NewsAPI
  - Finance: Alpha Vantage API

---

## **Authentication**
- **Login Options**: 
  - Sign in with GitHub.
  - Username and password for direct login:
    - Username: `Fardeen`
    - Password: `HelloWorld@123`

---

## **Environment Configuration**
- Create a `.env.local` file in the root directory and add the required API keys:
  ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET = NEXT_AUTH_SECRET
   GITHUB_SECRET = YOUR_GITHUB_SECRET
   GITHUB_ID = YOUR_GITHUB_ID 
   NEXT_PUBLIC_WEATHER_API_KEY=<Your OpenWeatherMap API Key>
   NEXT_PUBLIC_NEWS_API_KEY=<Your NewsAPI Key>
   NEXT_PUBLIC_FINANCE_API_KEY=<Your Alpha Vantage API Key>
  ```

---

## **Project Highlights**
- **Performance Optimization**:
  - Code splitting and dynamic imports.
  - Optimized rendering and caching using RTK Query.
  - Reduced bundle size by hoisting images on KITT.
  
 

- **Responsiveness**:
  - Fully mobile-responsive design with Tailwind CSS breakpoints.
  - Fluid layouts for seamless usability on various screen sizes.

- **Folder Structure**:
  ```
  ├── components/       # Reusable UI components
  ├── styles/           # Global styles and Tailwind configurations
  ├── hooks/            # Custom React hooks
  ├── redux/            #  redux wrapper and store setup
  ├── utils/            # Utility functions
  ├── services/         # API service integrations
  ├── public/           # Static assets
  ```

---

## **How to Run**
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/syedfardeenjeelani/pagagi.git
   cd pagagi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local` as described above.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## **Conclusion**
This project demonstrates proficiency in modern front-end development, incorporating advanced features, state management, and API integrations while adhering to best practices for accessibility, responsiveness, and performance. 🎉
