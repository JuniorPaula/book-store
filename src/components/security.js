import { store } from './store.js';
import router from '../router/index.js';

export let Security = {
  // make sure user is authenticated
  requireToken: function() {
    if (store.token === '') {
      router.push('/login');
      return false;
    }
  },

  // create request options and send them back
  requestOptions: function(payload) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${store.token}`);

    return {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }
  },

  // validate token
  checkToken: function() {
    if (store.token !== '') {
      const payload = { token: store.token };
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }

      fetch(`${process.env.VUE_APP_API_URL}/validate-token`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log(data.message)
          } else {
            if (!data.data) {
              store.token = '';
              store.user = {};
              // delete cookie
              document.cookie = '_site_data=; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            }
          }
        })
    }
  } 
}