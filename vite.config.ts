import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode } ) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/fenc_api' :{
	  target: env.VITE_PROXY_TARGET,
	  changeOrigin:true,
	  secure:false,
	  configure: (proxy) => {
            proxy.on('proxyReq', (_, req) => console.log('proxy ->', req.url))
          }
	}
      }
    }
  }
});
