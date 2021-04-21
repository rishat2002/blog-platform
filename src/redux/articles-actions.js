import ArticleService from '../article-service/article-service';

const serv = new ArticleService();

export default function noInitArticlesFetch(limit, offset) {
  return async (dispatch) => {
    const getObj = await serv.noInitArticles(limit, offset);
    dispatch({ type: 'FETCH-NO-INIT-ARTICLES', articles: getObj });
  };
}
