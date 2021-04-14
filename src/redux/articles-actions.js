import ArticleService from '../article-service/article-service';

const serv = new ArticleService();

export function noInitArticlesFetch(limit, offset) {
  return async (dispatch) => {
    const getObj = await serv.noInitArticles(limit, offset);
    dispatch({ type: 'FETCH-NO-INIT-ARTICLES', articles: getObj });
  };
}

export function initArticlesFetch(author, limit, offset) {
  return async (dispatch) => {
    const getObj = await serv.initArticles(author, limit, offset);
    dispatch({ type: 'FETCH-INIT-ARTICLES', articles: getObj });
  };
}
