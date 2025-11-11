import { useEffect } from 'react';

/**
 * Interface para os metadados da página.
 */
interface PageMetadata {
  title: string;
  description: string;
  themeColor?: string; // Cor do tema para navegadores mobile
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

function usePageMetadata({ title, description, themeColor, ogTitle, ogDescription, ogUrl }: PageMetadata) {
  useEffect(() => {
    // Atualiza o título do documento
    if (title) {
      document.title = title;
    }

    // Atualiza a meta-tag de descrição
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        // Se a tag não existir, cria e adiciona ao <head>
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Atualiza a meta-tag de theme-color
    if (themeColor) {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', themeColor);
    }

    // Atualiza ou cria as tags Open Graph
    const updateOrCreateOgTag = (property: string, content: string | undefined) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (content) {
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      } else if (ogTag) {
        ogTag.remove(); // Remove a tag se o conteúdo não for fornecido
      }
    };

    updateOrCreateOgTag('og:title', ogTitle || title); // Fallback para o título da página
    updateOrCreateOgTag('og:description', ogDescription || description); // Fallback para a descrição da página
    updateOrCreateOgTag('og:url', ogUrl || window.location.href); // Fallback para a URL atual

  }, [title, description, themeColor, ogTitle, ogDescription, ogUrl]);
}

export default usePageMetadata;