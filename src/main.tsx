import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Font Awesome library
import "./lib/fontawesome";

createRoot(document.getElementById("root")!).render(<App />);
