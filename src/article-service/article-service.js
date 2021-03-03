/* eslint-disable */
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
}

export default ArticleService