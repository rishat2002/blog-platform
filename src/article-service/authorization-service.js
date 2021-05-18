import ServConfig from "./serv-config";

class AuthorizationService {
  servConfig = new ServConfig();

  async signUpPost(profileInfo) {
    const response = await fetch(`${this.servConfig.apiBase}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }

  async signInPost(profileInfo) {
    const response = await fetch(`${this.servConfig.apiBase}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }

  async updateUserPut(profileInfo, token) {
    const response = await fetch(`${this.servConfig.apiBase}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await response.json();
    return result;
  }
}

export default AuthorizationService;
