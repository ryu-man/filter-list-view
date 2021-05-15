import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { config } from "dotenv";

config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	optimizeDeps: {
		exclude: [
			"@urql/svelte",
			"@urql/exchange-multipart-fetch",
			"svelte-routing",
		],
	},
	resolve: {
		alias: [
			{
				find: "src",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
	define: {
		ADMIN_SECRET: JSON.stringify(process.env.ADMIN_SECRET),
	},
});
