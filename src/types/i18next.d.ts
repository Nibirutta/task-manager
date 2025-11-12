import 'i18next';
import { ptBR } from '../locales/pt-BR';

declare module 'i18next' {
  interface CustomTypeOptions {
    // Define o tipo dos seus recursos de tradução.
    // Usamos o `ptBR` como base, pois ambos os arquivos têm a mesma estrutura.
    resources: typeof ptBR;
  }
}