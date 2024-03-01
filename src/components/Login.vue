<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Login</h1>
        <hr>
        <form-tag @submitEvent="submitHandler" name="myform" event="submitEvent">
          <text-input v-model="email" label="Email" name="email" type="email" required="true"></text-input>
          <text-input v-model="password" label="Password" name="password" type="password" required="true"></text-input>
          <input type="submit" class="btn btn-primary" value="Login">
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
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
      password: ''
    }
  },
  methods: {
    submitHandler() {
      console.log('Form submitted')
    }
  }
}

</script>

<style>

</style>