import ServConfig from './serv-config';

class ArticleService {
  servConfig = new ServConfig();

  async noInitArticles(limit, offset) {
    return this.servConfig.getResource(`articles?limit=${limit}&offset=${offset}`);
  }

  async createArticle(articleInfo, token) {
    const servObj = {
      article: articleInfo,
    };
    const response = await fetch(`${this.servConfig.apiBase}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(servObj),
    });
    const result = await response.json();
    return result;
  }

  async editArticle(articleInfo, token, slug) {
    const servObj = { article: articleInfo };
    const response = await fetch(`${this.servConfig.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(servObj),
    });
    const result = await response.json();
    return result;
  }

  async deleteArticle(token, slug) {
    const response = await fetch(`${this.servConfig.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await response.json();
    return result;
  }

  async getCurrentArticle(slug) {
    const result = await this.servConfig.getResource(`articles/${slug}`);
    return result;
  }
}

export default ArticleService;
