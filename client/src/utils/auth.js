// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    if(this.getToken())
      return decode(this.getToken());
    return null;
    // Decodes to { data: { username, email, _id }
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // extract google auth
  getGoogleAuth() {
    const token = this.getToken();
    try {
      const decoded = decode(token);
      const json = decoded.data.secretGoogleCloudAuth;
      const primitive = JSON.parse(json);
      return primitive;
    } catch (err) {
      return false;
    }
  }

  // extract google storage
  getGoogleStorage() {
    const token = this.getToken();
    try {
      const decoded = decode(token);
      // console.log({decoded});
      const json = decoded.data.secretGoogleCloudStorage;
      const primitive = JSON.parse(json);
      return primitive;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/app/image-gallery-nft-collab');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/app/image-gallery-nft-collab');
  }

  permanentlyRevoke() {
    // console.log("Permanently revoked user on the browser");
    localStorage.removeItem("id_token");
    window.location.assign('/app/image-gallery-nft-collab');
  } // permanentlyRevoke
}

export default new AuthService();
