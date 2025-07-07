# Meu Boilerplat Oficial

## Instalações de coisas com react

### Criar projeto react + Vite  

npx  create-vite@latest ComponentesReact  --template react-ts
     *entrar no arquivo criado
npm install
npm run dev

### instalar FontAwesome

npm install --save @fortawesome/fontawesome-svg-core
npm install --save @awesome.me/kit-db1c54e319
npm install --save @fortawesome/react-fontawesome@latest

### instalar  Tailwind

npm install tailwindcss @tailwindcss/vite
no index.css adicionar `@import 'tailwindcss'`

### instalar Lucide Icons

npm install lucide-react

### instalar UID (gerador de ID)

npm install uuid
import { v4 as idGenerator } from 'uuid';

### instalar reacts router

npm i react-router

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    <!-- element: <div>Hello World</div>, -->
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <!-- <RouterProvider router={router} /> -->
);
