@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #F9FAFB;
  color: #1e293b;
}

::selection { background: rgba(200,169,110,0.18); }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb {
  background: rgba(200,169,110,0.3);
  border-radius: 3px;
}

:root {
  --gold: #C8A96E;
  --gold-deep: #8B6B2E;
  --gold-light: rgba(200,169,110,0.10);
  --gold-border: rgba(200,169,110,0.28);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fadeUp { animation: fadeUp 0.6s ease both; }
.animate-fadeIn { animation: fadeIn 0.4s ease both; }
