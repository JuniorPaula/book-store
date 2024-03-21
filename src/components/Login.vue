<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="login-container">
          <h1 class="login-title">Login</h1>
          <hr>
          <form-tag @submitEvent="submitHandler" name="myform" event="submitEvent">
            <text-input v-model="email" label="Email" name="email" type="email" :required="true"></text-input>
            <text-input v-model="password" label="Password" name="password" type="password" :required="true"></text-input>
            <input type="submit" class="btn login-btn" value="Login">
          </form-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from './store.js'
import { Security } from './security.js'
import TextInput from './forms/TextInput.vue'
import FormTag from './forms/FormTag.vue'
import router from '../router/index.js'
import notie from 'notie'

export default {
  name: 'Login',
  components: {
    TextInput,
    FormTag
  },
  data() {
    return {
      email: '',
      password: '',
      store,
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        email: this.email,
        password: this.password
      }

      fetch(`${process.env.VUE_APP_API_URL}/users/login`, Security.requestOptions(payload))
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            notie.alert({
              type: 'error',
              text: data.message,
              time: 3
            })
          } else {
            store.token = data.data.token.token

            store.user = {
              id: data.data.user.id,
              first_name: data.data.user.first_name,
              last_name: data.data.user.last_name,
              email: data.data.user.email,
            }

            // save info to cookie
            let date = new Date()
            let expDays = 1
            date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
            const expires = 'expires=' + date.toUTCString()

            // set cookie
            document.cookie = "_site_data="
            + JSON.stringify(data.data)
            + "; " 
            + expires
            + "; path=/; SameSite=strict; Secure;"

            router.push('/')
          }
        })
    }
  }
}

</script>

<style>
.login-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px #ddd;
  max-width: 400px;
  margin: 100px auto 0 auto;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
}
.login-btn {
  width: 100%;
  margin-top: 20px;
  background-color: #33AFFF;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.35s;
}

.login-container input[type="email"], .login-container input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>