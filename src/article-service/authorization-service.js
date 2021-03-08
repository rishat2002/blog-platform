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
        let response = await fetch(
            `${this.apiBase}users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(profileInfo),
            }
        );
        let result = await response.json();
        return result
    }

    async signInPost(profileInfo) {
        let response = await fetch(
            `${this.apiBase}users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(profileInfo),
            }
        );
        let result = await response.json();
        console.log(result)
    }
}

export default AuthorizationService