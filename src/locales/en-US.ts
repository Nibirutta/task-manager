export const enUS = {
  // Common reusable keys
  common: {
    loading: 'Loading...',
    cancel: 'Cancel',
    error: 'Error',
    success: 'Success',
    sending: 'Sending...',
    close: 'Close',
  },

  // Reusable components
  components: {
    inputField: {
      invalidInput: 'Invalid Input Message',
    },
  },

  // Layout (Header, Footer, Navbar, etc)
  layout: {
    navbar: {
      home: 'Home',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
      logoAlt: 'Task Manager Logo',
      appName: 'Task Manager',
    },
    greetings: {
      hello: 'Hello, {{name}}!',
      notYou: 'Not you? Sign Out',
      logoutRedirect: 'You will be redirected to the login page.',
    },
    footer: {
      navigation: 'Navigation',
      project: 'Project',
      frontendRepo: 'Front-end Repository',
      backendRepo: 'Back-end Repository',
      copyright: '© {{year}} Task Manager. Open Source.',
    },
  },

  // HomePage
  homePage: {
    meta: {
      title: 'Task Manager | Organize your tasks with smart priority',
      description: 'Organize your tasks with a simple design and smart priority. Create, manage, and prioritize your projects with Task Manager.',
      ogTitle: 'Task Manager: Organize your tasks with smart priority',
      ogDescription: 'Create, manage, and prioritize your projects and daily routines with Task Manager. A simple, beautiful, and intelligent tool.',
    },
    heroSection: {
      title: 'Task Manager',
      subtitle: 'Organize your tasks with a simple design and smart priority',
      developed: 'Open source • Made with ❤ by independent devs.',
      registerButton: 'REGISTER',
      loginButton: 'LOGIN',
      heroImageAlt: 'Images of people managing tasks through a kanban board',
    },
    featuresSection: {
      title: 'What Makes Us Unique?',
      subtitle: 'Productivity with a purpose, every feature designed to streamline your routine',
      features: [
        {
          title: 'Task Management',
          description: 'Create, edit, and delete your tasks with our Kanban-inspired management system',
        },
        {
          title: 'Smart Priority',
          description: 'Prioritize your tasks based on real importance, not just list order',
        },
        {
          title: 'Select Your Vibe',
          description: 'Choose the theme that matches your mood',
        },
        {
          title: 'End-to-end Security',
          description: 'Only you have permission to access your tasks',
        },
      ],
    },
    demoSection: {
      title: 'See Task Manager in action',
      subtitle: 'A simple, fast design made to help you focus on what matters.',
      figcaption: 'Intuitive, lightweight, and fully customizable interface.',
    },
    aboutSection: {
      title: 'About the project',
      text: 'Task Manager is an open-source project developed by independent devs passionate about productivity and design. Our mission is to create a simple, beautiful, and intelligent tool — one that learns from the user and adapts to their pace.\n\nFurthermore, we want anyone to be able to contribute with ideas, code, or new themes. Because we believe that good technology is built in community.',
      devs: {
        lucino: { role: 'Front-End', description: 'UI/UX and micro-interactions enthusiast' },
        lucas: { role: 'Back-End', description: 'Systems architect and performance specialist' },
      },
      devCard: {
        techTitle: 'Technologies used in this project',
        contactTitle: 'Find me here:',
        avatarAlt: 'Avatar of {{name}}',
        socialAlt: {
          linkedin: 'go to {{name}}\'s LinkedIn profile',
          github: 'go to {{name}}\'s GitHub profile',
          portfolio: 'go to {{name}}\'s portfolio',
        },
      },
    },
    ctaSection: {
      title: 'Ready to organize your projects?',
      registerButton: 'Create Free Account',
      loginButton: 'Login',
    },
  },

  // Task Board (Board, Columns, Cards)
  taskBoard: {
    columns: {
      'to-do': 'To Do',
      'in-progress': 'In Progress',
      'in-review': 'In Review',
      done: 'Done',
    },
    column: {
      addTaskLabel: 'Add task in {{title}}',
      emptyState: {
        drag: 'Drag your tasks here',
        create: 'Or create a new one by clicking the',
      },
    },
    card: {
      deletePopover: 'Delete Task',
      editPopover: 'Edit Task',
      detailsPopover: 'View Details',
      deleteLabel: 'Delete task {{title}}',
      editLabel: 'Edit task {{title}}',
      detailsLabel: 'View details for task {{title}}',
      priority: 'Priority',
    },
  },

  // Dashboard Page
  dashboard: {
    meta: {
      title: 'My Dashboard | Task Manager',
      description: 'Manage your tasks easily and intuitively with the Task Manager dashboard. Drag and drop tasks between columns and filter by priority.',
      ogTitle: 'My Task Dashboard | Task Manager',
      ogDescription: 'Access your personalized dashboard to manage all your tasks. Track progress and stay organized with Task Manager.',
    },
    title: 'My Task Dashboard',
    refreshButtonLabel: 'Refresh tasks',
    newTaskButtonLabel: 'Create New Task',
    loadingTasks: 'Loading tasks...',
    filterPriority: 'Filter by priority',
    priority: {
      all: 'All',
      urgent: 'Urgent',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      optional: 'Optional',
    },
    toast: {
      fetchError: 'Failed to fetch tasks.',
      createPending: 'Creating task...',
      createSuccess: 'Task created successfully!',
      createError: 'Failed to create task.',
      updatePending: 'Updating task...',
      updateSuccess: 'Task updated successfully!',
      updateError: 'Failed to update task.',
      deletePending: 'Deleting task...',
      deleteSuccess: 'Task deleted successfully!',
      deleteError: 'Failed to delete task.',
      moveSuccess: 'Task moved!',
      moveError: 'Failed to move task. Reverting change.',
    },
    task: {
      noDueDate: 'No date',
    },
  },

  // Task Details Modal
  detailsDialog: {
    subtitle: 'Task created at {{createdAt}}, and last modified at {{updatedAt}}.',
    descriptionLabel: 'Description',
    noDescription: 'No description at the moment.',
    badges: {
      status: 'Status',
      priority: 'Priority',
      inTime: 'On time',
      deadline: 'Last Day',
      expired: 'Overdue',
    },
    footer: {
      edit: 'Edit',
      editLabel: 'Edit task',
      delete: 'Delete',
      deleteLabel: 'Delete task',
      close: 'Close',
      closeLabel: 'Close details modal',
    },
  },

  // Delete Confirmation Modal
  deleteDialog: {
    title: 'Confirm Deletion',
    description: 'Are you sure you want to delete the task "{{title}}"? This action cannot be undone.',
    confirmButton: 'Delete',
    cancelButton: 'Cancel',
  },

  // Task Form (Create/Edit)
  taskForm: {
    createTitle: 'Create New Task',
    editTitle: 'Edit Task',
    createDescription: 'Fill in the information to create a new task.',
    editDescription: 'Change the details of your task.',
    titleLabel: 'Title',
    titlePlaceholder: 'e.g., Develop the login screen',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Add more details about the task...',
    statusLabel: 'Status',
    statusPlaceholder: 'Select status',
    dueDateLabel: 'Due Date',
    dueDatePlaceholder: 'Pick a date',
    priorityLabel: 'Priority',
    priorityPlaceholder: 'Select priority',
    clearDate: 'Clear date',
    submitCreate: 'Create Task',
    submitEdit: 'Save Changes',
    validation: {
      titleMin: 'The title must be at least 3 characters long.',
      dateMin: 'The date cannot be in the past.',
      dateRequired: 'The due date is required.',
    },
    status: {
      'to-do': 'To Do',
      'in-progress': 'In Progress',
      'in-review': 'In Review',
      done: 'Done',
    },
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent',
      optional: 'Optional',
    },
  },

  // Login Page
  loginPage: {
    meta: {
      title: 'Task Manager | Login',
      description: 'Access your Task Manager account to start managing your tasks and projects efficiently.',
      ogTitle: 'Login | Task Manager',
      ogDescription: 'Access your Task Manager account to start managing your tasks and projects efficiently.',
    },
    form: {
      title: 'Login',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Your username',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      submitButton: 'Sign In',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
    },
    toast: {
      pending: 'Verifying credentials...',
      success: 'Login successful! Redirecting...',
      error: 'Invalid username or password. Please try again.',
    },
  },

  // Register Page
  registerPage: {
    meta: {
      title: 'Task Manager | Register',
      description: 'Create your free account on Task Manager and start organizing your projects and daily routines today.',
      ogTitle: 'Sign Up | Task Manager',
      ogDescription: 'Create your free account on Task Manager and start organizing your projects and daily routines today.',
    },
  },

  // Validation Messages (used by Zod)
  validation: {
    username: {
      required: 'Username is required.',
      min: 'Username must be at least 3 characters long.',
      max: 'Username cannot be more than 30 characters.',
      regex: "Use only letters, numbers, and underscore '_' or hyphen '-'.",
    },
    password: {
      required: 'Password is required.',
      min: 'Password must be at least 8 characters long.',
      lowercase: 'Password must contain at least one lowercase letter.',
      uppercase: 'Password must contain at least one uppercase letter.',
      number: 'Password must contain at least one number.',
      specialChar: 'Password must contain at least one special character.',
    },
    confirmPassword: {
      required: 'Password confirmation is required.',
      match: 'Passwords do not match.',
    },
    email: {
      invalid: 'Please use a valid email format.',
    },
    name: {
      required: 'First name is required.',
      min: 'First name must be at least 3 characters long.',
      max: 'First name cannot be more than 30 characters.',
      regex: 'Use only letters.',
    },
    taskTitle: {
      min: 'The title must be at least 3 characters long.',
    },
  },

  // User Preferences Section
  preferences: {
    title: 'Application Preferences',
    subtitle: 'Customize the appearance and behavior of the application.',
    themeTitle: 'Select Your Theme',
    languageTitle: 'Select Language',
    emailNotificationsTitle: 'Email Notifications',
    languageLabels: {
      'pt-BR': 'Português',
      'en-US': 'English',
    },
    toast: {
      pending: 'Saving your preferences...',
      success: 'Preferences saved successfully!',
      error: 'Could not save your preferences. Please try again.',
    },
  },

  // Register Form
  registerForm: {
    title: 'Sign Up',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'Enter your first name',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Enter your e-mail',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    submitButton: 'Create Account',
    toast: {
      pending: 'Creating your account...',
      success: 'Account created successfully! Redirecting to login...',
      errorFallback: 'Could not create account. Please check your data and try again.',
    },
  },

  // Forgot Password Dialog
  forgotPassword: {
    title: 'Reset Password',
    description: 'Enter your email below. If it is registered, we will send a link for you to create a new password.',
    submitButton: 'Send Link',
    toast: {
      pending: 'Checking your email...',
      success: 'If an account with this email exists, a recovery link has been sent.',
      error: 'An error occurred. Please try again later.',
    },
  },
  // User Settings Page
  userSettingsPage: {
    meta: {
      title: 'Task Manager | Settings',
      description: 'Customize your profile, security, and theme and language preferences in Task Manager.',
      ogTitle: 'User Settings | Task Manager',
      ogDescription: 'Customize your profile, security, and theme and language preferences in Task Manager.',
    },
    profileSection: {
      title: 'Public Profile of {{name}}',
      subtitle: 'This information may be visible to other users.',
      form: {
        nameLabel: 'Display Name',
        namePlaceholder: 'Enter your new display name',
        submitButton: 'Change',
      },
      toast: {
        pending: 'Updating your name...',
        success: 'Name updated successfully!',
        error: 'Could not update name. Please try again.',
      },
    },
    securitySection: {
      password: {
        title: 'Change Password',
        subtitle: 'For your security, we recommend a strong password.',
        currentPasswordLabel: 'Current Password',
        newPasswordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm New Password',
        submitButton: 'Change Password',
        toast: {
          pending: 'Changing your password...',
          success: 'Password changed successfully!',
          error: 'Failed to change password. Please check your current password.',
        },
      },
      email: {
        title: 'Change E-mail',
        subtitle: 'Change the e-mail associated with your account.',
        emailLabel: 'New E-mail',
        submitButton: 'Change E-mail',
        toast: {
          pending: 'Changing your e-mail...',
          success: 'E-mail changed successfully! The global state has been updated.',
          error: 'Failed to change e-mail. Please try again.',
        },
      },
    },
    preferencesSection: {
      title: 'Application Preferences',
      subtitle: 'Customize the appearance and behavior of the application.',
      themeTitle: 'Select Your Theme',
      languageTitle: 'Select Language',
      notificationsTitle: 'Email Notifications',
      languageLabels: {
        'pt-BR': 'Português',
        'en-US': 'English',
      },
    },
    dangerZone: {
      title: 'Danger Zone',
      subtitle: 'Actions in this section are permanent and cannot be undone.',
      deleteButton: 'Delete My Account',
      dialog: {
        title: 'Are you absolutely sure?',
        description: 'This action cannot be undone. This will permanently delete your account and remove all your data from our servers.',
        confirmLabel: 'Please type "{{name}}" to confirm.',
        cancelButton: 'Cancel',
        confirmButton: 'Delete my account',
      },
      toast: {
        pending: 'Deleting your account...',
        success: 'Your account has been deleted successfully. You will be logged out.',
        error: 'An error occurred while deleting your account. Please try again.',
      },
    },
  },

  // Reset Password Page
  resetPasswordPage: {
    meta: {
      title: 'Task Manager | Reset Password',
      description: 'Reset your password to securely regain access to your Task Manager account.',
      ogTitle: 'Reset Password | Task Manager',
      ogDescription: 'Reset your password to securely regain access to your Task Manager account.',
    },
    form: {
      title: 'Reset Password',
      passwordLabel: 'Enter New Password',
      confirmPasswordLabel: 'Confirm New Password',
      submitButton: 'Confirm Change',
    },
    spinner: {
      validating: 'Validating link...',
    },
    toast: {
      invalidLink: 'Invalid or expired reset link.',
      pending: 'Resetting your password...',
      success: 'Password reset successfully! You can now log in.',
      error: 'The link is invalid or has expired. Please request a new one.',
    },
  },

  // Not Found Page (404)
  notFoundPage: {
    meta: {
      title: '404 - Page Not Found | Task Manager',
      description: 'The page you are looking for was not found. Check the address or go back to the homepage.',
      ogTitle: 'Page Not Found (404) | Task Manager',
      ogDescription: 'Oops! The page you tried to access does not exist. Check the URL or navigate back to the homepage.',
    },
    title: 'Something is not right...',
    subtitle: 'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.',
    button: 'Get back to home page',
  },
};