

/**
 * authEvent.ts
 * 
 * Cria um despachante de eventos customizado para lidar com eventos de autenticação,
 * como a necessidade de um logout forçado quando a sessão expira.
 * Isso permite que partes do sistema que não são componentes React (como o apiClient)
 * comuniquem eventos de autenticação para o AuthContext.
 */

import type { ProfileTypes } from "../../../types/AccountServiceTypes";

type AuthEventType = 'forceLogout' | 'updateProfile';

const authEventTarget = new EventTarget(); // Cria uma instância de EventTarget

export const dispatchAuthEvent = (type: AuthEventType, data?: CustomEventInit<ProfileTypes>) => {
  authEventTarget.dispatchEvent(new CustomEvent(type, data)); // Dispara um CustomEvent com o tipo e os dados
};

export const addAuthEventListener = (type: AuthEventType, listener: EventListener) => {
  authEventTarget.addEventListener(type, listener);
};
