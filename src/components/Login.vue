<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Login</h1>
        <hr>
        <form-tag @submitEvent="submitHandler" name="myform" event="submitEvent">
          <text-input v-model="email" label="Email" name="email" type="email" :required="true"></text-input>
          <text-input v-model="password" label="Password" name="password" type="password" :required="true"></text-input>
          <input type="submit" class="btn btn-primary" value="Login">
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from './store.js'
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

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
      }

      fetch(`${process.env.VUE_APP_API_URL}/users/login`, requestOptions)
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

</style>