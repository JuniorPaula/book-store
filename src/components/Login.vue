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

      fetch('http://localhost:8081/users/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log('Error:', data.message)
          } else {
            console.log(data)
            store.token = data.data.token.token
          }
        })
    }
  }
}

</script>

<style>

</style>