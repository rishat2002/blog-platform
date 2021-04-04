class ArticleService {
  apiBase = 'https://conduit.productionready.io/api/';

  api = ``;

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async noInitArticles(limit, offset) {
    return this.getResource(`articles?limit=${limit}&offset=${offset}`);
  }

  async initArticles(author, limit, offset) {
    const result = await this.getResource(`articles?author=${author}&${limit}&${offset}`);
    return result;
  }

  async createArticle(articleInfo, token) {
    const servObj = {
      article: articleInfo,
    };
    const response = await fetch(`${this.apiBase}articles`, {
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
    const response = await fetch(`${this.apiBase}articles/${slug}`, {
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
    const response = await fetch(`${this.apiBase}articles/${slug}`, {
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
    const result = await this.getResource(`articles/${slug}`);
    return result;
  }
}

export default ArticleService;
