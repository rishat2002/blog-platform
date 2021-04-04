class AuthorizationService {
  apiBase = 'https://conduit.productionready.io/api/';

  api = ``;

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async signUpPost(profileInfo) {
    const response = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }

  async signInPost(profileInfo) {
    const response = await fetch(`${this.apiBase}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }

  async updateUserPut(profileInfo, token) {
    const response = await fetch(`${this.apiBase}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }
}

export default AuthorizationService;
