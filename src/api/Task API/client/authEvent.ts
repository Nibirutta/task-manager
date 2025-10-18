/**
 * authEvent.ts
 * 
 * Cria um despachante de eventos customizado para lidar com eventos de autenticação,
 * como a necessidade de um logout forçado quando a sessão expira.
 * Isso permite que partes do sistema que não são componentes React (como o apiClient)
 * comuniquem eventos de autenticação para o AuthContext.
 */

type AuthEventType = 'forceLogout';

const authEventTarget = new EventTarget();

export const dispatchAuthEvent = (type: AuthEventType) => {
  authEventTarget.dispatchEvent(new CustomEvent(type));
};

export const addAuthEventListener = (type: AuthEventType, listener: EventListener) => {
  authEventTarget.addEventListener(type, listener);
};
