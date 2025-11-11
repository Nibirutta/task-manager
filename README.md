
# Task Manager 📝

O **Task Manager** é uma aplicação full-stack de gerenciamento de tarefas com uma arquitetura de microserviços. O projeto foi desenhado para ser uma ferramenta simples, bonita e inteligente, que se adapta ao ritmo do usuário e facilita a organização de projetos e rotinas diárias.

A interface é inspirada em quadros Kanban, permitindo uma visualização clara do fluxo de trabalho, desde tarefas pendentes até as concluídas.

## Sobre o Projeto 🌟

O **Task Manager** foi desenvolvido com o objetivo de aplicar e aprimorar conhecimentos em React + Typescript + Vite e arquitetura de microserviços, desenvolvimento back-end com NestJS. A ideia central é oferecer uma solução robusta e escalável para gerenciamento de tarefas, utilizando as melhores práticas de desenvolvimento e tecnologias modernas.

## Demonstração 🖥️

![Demonstração do Task Manager](/src/assets/imgs/Task-Manager.gif)
*Interface intuitiva, leve e totalmente personalizável.*

## Funcionalidades Principais ✨

Com base nos arquivos de tradução e na documentação da API, o projeto inclui:

- **Gerenciamento de Tarefas Kanban:** Crie, edite, delete e mova tarefas entre colunas (`Pendente`, `Em Progresso`, `Em Revisão`, `Concluído`).
- **Prioridade Inteligente:** Classifique suas tarefas com níveis de prioridade (`Urgente`, `Alta`, `Média`, `Baixa`, `Opcional`) para focar no que realmente importa.
- **Autenticação Segura:** Sistema completo de login, registro e recuperação de senha com tokens (Access, Session e Reset).
- **Personalização de Tema:** Escolha o tema que mais combina com seu momento.
- **Internacionalização (i18n):** Suporte para múltiplos idiomas (atualmente Português e Inglês).
- **Painel de Controle:** Visualize e filtre suas tarefas por prioridade.
- **Design Responsivo:** Interface adaptada para diferentes tamanhos de tela.
- **Segurança de Ponta a Ponta:** Apenas você tem acesso às suas tarefas.



##  Tecnologias Utilizadas 🛠️

O projeto é dividido em duas partes principais: o front-end e o back-end (microserviços).

### **Front-end**

| Tecnologia | Descrição |
|---|---|
| **React** | Biblioteca principal para a construção da interface. |
| **Vite** | Ferramenta de build moderna e ultrarrápida. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **Tailwind CSS** | Framework CSS utility-first para estilização rápida. |
| **React Router** | Para gerenciamento de rotas na aplicação. |
| **React Hook Form & Zod** | Para construção e validação de formulários. |
| **Framer Motion** | Para animações e microinterações fluidas. |
| **i18next** | Framework para internacionalização. |
| **Radix UI** | Componentes de UI acessíveis e de baixo nível. |
| **Pragmatic Drag and Drop** | Biblioteca da Atlassian para funcionalidade de arrastar e soltar. |

### **Back-end (TaskAPI)**

| Tecnologia | Descrição |
|---|---|
| **NestJS** | Framework Node.js para construir aplicações server-side eficientes e escaláveis. |
| **MongoDB** | Banco de dados NoSQL orientado a documentos. |
| **RabbitMQ** | Message broker para comunicação assíncrona entre microserviços. |
| **Microserviços** | Arquitetura dividida em `Account Service` e `Task Service`. |
| **JWT** | Para autenticação segura baseada em tokens. |

> 🔗 A documentação completa da API do back-end pode ser encontrada em https://github.com/Nibirutta/task-api.


##  Como Executar o Projeto 🚀

Para rodar o front-end localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Nibirutta/task-manager.git
    cd task-manager
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

##  Como Contribuir 🤝

Este é um projeto open source e contribuições são muito bem-vindas! Se você tem alguma ideia, sugestão ou quer reportar um bug, sinta-se à vontade para:

1.  Abrir uma **Issue** para discutir a mudança.
2.  Fazer um **Fork** do projeto.
3.  Criar uma nova **Branch** (`git checkout -b feature/sua-feature`).
4.  Commitar suas mudanças (`git commit -m 'feat: Adiciona nova feature'`).
5.  Enviar um **Pull Request**.

## Autores 🧑‍💻

- [@Nibirutta](https://github.com/Nibirutta)

- [@Alucinado-Dev](https://github.com/Alucinado-dev)


