export const ptBR = {
  // Chaves comuns que podem ser reutilizadas
  common: {
    loading: "Carregando...",
    cancel: "Cancelar",
    error: "Erro",
    success: "Sucesso",
    sending: "Enviando...",
    close: "Fechar",
  },
  
  // Componentes reutilizáveis
  components: {
    inputField: {
      invalidInput: "Mensagem de Input Inválido",
    },
  },

  // Layout (Header, Footer, Navbar, etc)
  layout: {
    navbar: {
      home: "Home",
      dashboard: "Dashboard",
      login: "Login",
      register: "Registrar",
      logoAlt: "Logo do Task Manager",
      appName: "Task Manager",
    },
    greetings: {
      hello: "Olá, {{name}}!",
      notYou: "Não é você? Sair",
      logoutRedirect: "Você será redirecionado para a página de login.",
    },
    footer: {
      navigation: "Navegação",
      project: "Projeto",
      frontendRepo: "Repositório Front-end",
      backendRepo: "Repositório Back-end",
      copyright: "© {{year}} Task Manager. Todos os direitos reservados.",
    },
  },

  // Página Inicial (HomePage)
  homePage: {
    meta: {
      title: "Task Manager | Organize suas tarefas com prioridade inteligente",
    },
    heroSection: {
      title: "Task Manager",
      subtitle: "Organize suas tarefas com um design simples e prioridade inteligente",
      developed: "Open source • Feito com ❤ por devs independentes.",
      registerButton: "REGISTRAR",
      loginButton: "LOGIN",
      heroImageAlt: "Imagens de pessoas gerenciando tarefas através de um quadro kanban",
    },
    featuresSection: {
      title: "O Que Nos Torna Únicos?",
      subtitle: "Produtividade com propósito, cada recurso foi pensado pra facilitar sua rotina",
      features: [
        {
          title: "Gerenciamento de Tarefas",
          description: "Crie, edite, exclua suas tarefas com nosso sistema de gerenciamento inspirado em Kanban",
        },
        {
          title: "Prioridade Inteligente",
          description: "Priorize suas tarefas com base na importância real, não só na ordem da lista",
        },
        {
          title: "Selecione sua Vibe",
          description: "Escolha o tema que combina com seu momento",
        },
        {
          title: "Segurança de ponta a ponta",
          description: "Somente você tem permissão de acessar suas tarefas",
        },
      ],
    },
    demoSection: {
      title: "Veja o Task Manager em ação",
      subtitle: "Um design simples, rápido e feito pra ajudar você a focar no que importa.",
      figcaption: "Interface intuitiva, leve e totalmente personalizável.",
    },
    aboutSection: {
      title: "Sobre o projeto",
      text: "O Task Manager é um projeto open source desenvolvido por devs independentes apaixonados por produtividade e design. Nossa missão é criar uma ferramenta simples, bonita e inteligente — que aprenda com o usuário e se adapte ao seu ritmo.\n\nAlém disso, queremos que qualquer pessoa possa contribuir com ideias, código ou temas novos. Porque acreditamos que tecnologia boa é aquela construída em comunidade.",
      devs: {
        lucino: { role: "Front-End", description: "Entusiasta de UI/UX e microinterações" },
        lucas: { role: "Back-End", description: "Arquiteto de sistemas e especialista em performance" },
      },
      devCard: {
        techTitle: "Tecnologias Utilizadas nesse projeto",
        contactTitle: "Me encontre por aqui :",
        avatarAlt: "Avatar de {{name}}",
        socialAlt: {
          linkedin: "ir para o perfil do linkedin do {{name}}",
          github: "ir para o perfil do github do {{name}}",
          portfolio: "ir para o portfolio do {{name}}",
        },
      },
    },
    ctaSection: {
      title: "Pronto pra organizar seus projetos?",
      registerButton: "Criar conta Grátis",
      loginButton: "Login",
    },
  },

  // Página de Dashboard
  dashboard: {
    title: "Meu Painel de Tarefas",
    refreshButtonLabel: "Atualizar tarefas",
    newTaskButtonLabel: "Criar Nova Tarefa",
    loadingTasks: "Carregando tarefas...",
    filterPriority: "Filtrar por prioridade",
    priority: {
      all: "Todas",
      urgent: "Urgente",
      high: "Alta",
      medium: "Média",
      low: "Baixa",
      optional: "Opcional",
    },
  },
  // Formulário de Tarefas (Criação/Edição)
  taskForm: {
    createTitle: "Criar Nova Tarefa",
    editTitle: "Editar Tarefa",
    createDescription: "Preencha as informações para criar uma nova tarefa.",
    editDescription: "Altere os detalhes da sua tarefa.",
    titleLabel: "Título",
    titlePlaceholder: "Ex: Desenvolver a tela de login",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Adicione mais detalhes sobre a tarefa...",
    statusLabel: "Status",
    statusPlaceholder: "Selecione o status",
    dueDateLabel: "Data de Vencimento",
    dueDatePlaceholder: "Escolha uma data",
    priorityLabel: "Prioridade",
    priorityPlaceholder: "Selecione a prioridade",
    clearDate: "Limpar data",
    submitCreate: "Criar Tarefa",
    submitEdit: "Salvar Alterações",
    validation: {
      titleMin: "O título deve ter no mínimo 3 caracteres.",
      dateMin: "A data não pode ser no passado.",
      dateRequired: "A data de vencimento é obrigatória.",
    },
    status: {
      "to-do": "Pendente",
      "in-progress": "Em Progresso",
      "in-review": "Em Revisão",
      done: "Concluído",
    },
    priority: {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente",
      optional: "Opcional",
    },
  },

  // Página de Login
  loginPage: {
    meta: {
      title: "Task Manager | Login",
    },
    form: {
      title: "Login",
      usernameLabel: "Nome de usuário",
      usernamePlaceholder: "Seu nome de usuário",
      passwordLabel: "Senha",
      passwordPlaceholder: "••••••••",
      submitButton: "Entrar",
      forgotPassword: "Esqueceu a senha?",
      noAccount: "Não tenho uma conta",
    },
    toast: {
      pending: "Verificando credenciais...",
      success: "Login realizado com sucesso! Redirecionando...",
      error: "Usuário ou senha inválidos. Tente novamente.",
    },
  },

  // Página de Registro
  registerPage: {
    meta: {
      title: "Task Manager | Registrar",
    },
  },

  // Mensagens de validação (usadas pelo Zod)
  validation: {
    username: {
      required: "O nome de usuário é obrigatório.",
      min: "O nome de usuário deve ter no mínimo 3 caracteres.",
      max: "O nome de usuário não pode ter mais de 30 caracteres.",
      regex: "Use apenas letras, números e underline '_' ou hífen'-'.",
    },
    password: {
      required: "A senha é obrigatória.",
      min: "A senha deve ter no mínimo 8 caracteres.",
      lowercase: "A senha deve conter ao menos uma letra minúscula.",
      uppercase: "A senha deve conter ao menos uma letra maiúscula.",
      number: "A senha deve conter ao menos um número.",
      specialChar: "A senha deve conter ao menos um caractere especial.",
    },
    confirmPassword: {
      required: "A confirmação de senha é obrigatória.",
      match: "As senhas não coincidem.",
    },
    email: {
      invalid: "Utilize um formato válido para E-mail",
    },
    name: {
      required: "O primeiro nome é obrigatório.",
      min: "O primeiro nome deve ter no mínimo 3 caracteres.",
      max: "O primeiro nome não pode ter mais de 30 caracteres.",
      regex: "Use apenas letras.",
    },
    taskTitle: {
      min: "O título deve ter no mínimo 3 caracteres.",
    },
  },

  // Seção de Preferências do Usuário
  preferences: {
    title: "Preferências da Aplicação",
    subtitle: "Personalize a aparência e o comportamento do aplicativo.",
    themeTitle: "Selecione Seu Tema",
    languageTitle: "Selecione o Idioma",
    emailNotificationsTitle: "Notificações por E-mail",
    languageLabels: {
      "pt-BR": "Português",
      "en-US": "English",
    },
    toast: {
      pending: "Salvando suas preferências...",
      success: "Preferências salvas com sucesso!",
      error: "Não foi possível salvar suas preferências. Tente novamente.",
    },
  },

  // Formulário de Registro
  registerForm: {
    title: "Registre-se",
    firstNameLabel: "Primeiro Nome",
    firstNamePlaceholder: "Digite seu primeiro nome",
    emailLabel: "E-mail",
    emailPlaceholder: "Digite seu e-mail",
    usernameLabel: "Nome de Usuário",
    usernamePlaceholder: "Digite seu nome de usuário",
    passwordLabel: "Senha",
    passwordPlaceholder: "Digite sua senha",
    confirmPasswordLabel: "Confirmar Senha",
    confirmPasswordPlaceholder: "Confirme sua senha",
    submitButton: "Criar Conta",
    toast: {
      pending: "Criando sua conta...",
      success: "Conta criada com sucesso! Redirecionando para o login...",
      // A mensagem de erro virá da API, mas podemos ter um fallback
      errorFallback: "Não foi possível criar a conta. Verifique os dados e tente novamente.",
    },
  },

  // Página de Configurações do Usuário
  userSettingsPage: {
    meta: {
      title: "Task Manager | Configurações",
    },
    profileSection: {
      title: "Perfil Público de {{name}}",
      subtitle: "Estas informações podem ser visíveis para outros usuários.",
      form: {
        nameLabel: "Nome de Exibição",
        namePlaceholder: "Digite seu novo nome de exibição",
        submitButton: "Alterar",
      },
      toast: {
        pending: "Atualizando seu nome...",
        success: "Nome atualizado com sucesso!",
        error: "Não foi possível atualizar o nome. Tente novamente.",
      },
    },
    securitySection: {
      password: {
        title: "Alterar Senha",
        subtitle: "Para sua segurança, recomendamos uma senha forte.",
        currentPasswordLabel: "Senha Atual",
        newPasswordLabel: "Nova Senha",
        confirmPasswordLabel: "Confirmar Nova Senha",
        submitButton: "Alterar Senha",
        toast: {
          pending: "Alterando sua senha...",
          success: "Senha alterada com sucesso!",
          error: "Falha ao alterar a senha. Verifique sua senha atual.",
        },
      },
      email: {
        title: "Alterar E-mail",
        subtitle: "Altere o e-mail associado à sua conta.",
        emailLabel: "Novo E-mail",
        submitButton: "Alterar E-mail",
        toast: {
          pending: "Alterando seu e-mail...",
          success: "E-mail alterado com sucesso! O estado global foi atualizado.",
          error: "Falha ao alterar o e-mail. Tente novamente.",
        },
      },
    },
    preferencesSection: {
      title: "Preferências da Aplicação",
      subtitle: "Personalize a aparência e o comportamento do aplicativo.",
      themeTitle: "Selecione Seu Tema",
      languageTitle: "Selecione o Idioma",
      notificationsTitle: "Notificações por E-mail",
      languageLabels: {
        "pt-BR": "Português",
        "en-US": "English",
      },
    },
    dangerZone: {
      title: "Zona de Perigo",
      subtitle: "As ações nesta seção são permanentes e não podem ser desfeitas.",
      deleteButton: "Deletar Minha Conta",
      dialog: {
        title: "Você tem certeza absoluta?",
        description: "Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os seus dados de nossos servidores.",
        confirmLabel: "Por favor, digite \"{{name}}\" para confirmar.",
        cancelButton: "Cancelar",
        confirmButton: "Deletar minha conta",
      },
      toast: {
        pending: "Deletando sua conta...",
        success: "Sua conta foi deletada com sucesso. Você será deslogado.",
        error: "Ocorreu um erro ao deletar sua conta. Tente novamente.",
      },
    },
  },

  // Página de Redefinição de Senha
  resetPasswordPage: {
    meta: {
      title: "Task Manager | Redefinir Senha",
    },
    form: {
      title: "Redefinir Senha",
      passwordLabel: "Digite a Nova Senha",
      confirmPasswordLabel: "Confirme a Nova Senha",
      submitButton: "Confirmar Mudança",
    },
    spinner: {
      validating: "Validando link...",
    },
    toast: {
      invalidLink: "Link de redefinição inválido ou expirado.",
      pending: "Redefinindo sua senha...",
      success: "Senha redefinida com sucesso! Você já pode fazer o login.",
      error: "O link é inválido ou expirou. Por favor, solicite um novo.",
    },
  },

};
