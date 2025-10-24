import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';
import flowbiteReact from "flowbite-react/plugin/vite";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/


export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), flowbiteReact(), basicSsl()],
  server: {
    https: true, // Habilita o servidor HTTPS
    host: true, // Permite acesso externo, útil para testar em outros dispositivos na rede
    port: 3000, // Ou a porta que você preferir
  },

})