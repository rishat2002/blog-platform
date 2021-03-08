
import ArticleService from "../article-service/article-service";
const serv = new ArticleService();

export function getFirstArticlesFetch() {
    return async dispatch => {
        const getObj = await serv.getResource('articles?tag=cat')
        console.log(getObj)
        dispatch({type: 'FETCH-ARTICLES', articles: getObj})
    }
}
