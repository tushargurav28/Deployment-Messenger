import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
<<<<<<< HEAD
		proxy: {
			"/api": {
				target: "http://localhost:5000",
=======
		host: "0.0.0.0",
		proxy: {
			"/api": {
				target: "http://backend:5000",
>>>>>>> 5bc0de1 (test)
			},
		},
	},
});
