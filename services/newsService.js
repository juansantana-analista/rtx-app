import { apiRequest } from './api';

/**
 * Busca notícias (todas ou por categoria)
 * @param {string|number} categoriaId - ID da categoria (opcional)
 * @returns {Promise<Array>} Lista de notícias
 */
export const getNoticias = async (categoriaId = null) => {
  try {
    const requestData = {
      classe: 'NoticiaRestService',
      metodo: 'getNoticias'
    };

    // Adiciona categoria_id apenas se fornecido
    if (categoriaId && categoriaId !== 'todas') {
      requestData.params = {
        categoria_id: categoriaId
      };
    }

    const result = await apiRequest(requestData);

    if (result.status === 'success' && result.data && result.data.success) {
      return result.data.noticias;
    } else {
      throw new Error('Erro ao buscar notícias');
    }
  } catch (error) {
    throw new Error('Erro ao buscar notícias: ' + error.message);
  }
};

/**
 * Busca categorias de notícias
 * @returns {Promise<Array>} Lista de categorias
 */
export const getCategorias = async () => {
  try {
    const result = await apiRequest({
      classe: 'NoticiaRestService',
      metodo: 'listarCategorias'
    });

    if (result.status === 'success' && result.data && result.data.categorias) {
      return result.data.categorias;
    } else {
      throw new Error('Erro ao buscar categorias');
    }
  } catch (error) {
    throw new Error('Erro ao buscar categorias: ' + error.message);
  }
};

/**
 * Busca notícias por categoria (alias para getNoticias)
 * @param {string|number} categoriaId - ID da categoria
 * @returns {Promise<Array>} Lista de notícias filtradas
 */
export const getNoticiasPorCategoria = async (categoriaId) => {
  return getNoticias(categoriaId);
}; 