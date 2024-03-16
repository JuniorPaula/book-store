<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          <span v-if="this.$route.params.userId > 0">Edit User</span>
          <span v-else >Add New User</span>
        </h1>
        <hr />

        <FormTag @userEditEvent="submitHandler" name="userform" event="userEditEvent">
          <TextInput
            v-model="user.first_name"
            type="text"
            :required="true"
            label="First Name"
            :value="user.first_name"
            name="first_name"
          />

          <TextInput
            v-model="user.last_name"
            type="text"
            :required="true"
            label="Last Name"
            :value="user.last_name"
            name="last_name"
          />

          <TextInput
            v-model="user.email"
            type="email"
            :required="true"
            label="Email"
            :value="user.email"
            name="email"
          />

          <TextInput
            v-if="user.id === 0"
            v-model="user.password"
            type="password"
            :required="true"
            label="Password"
            :value="user.password"
            name="password"
          />

          <TextInput
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            help="Leave blank to keep the existing password"
            :value="user.password"
            name="password"
          />

          <div class="form-check">
            <input v-model="user.active" class="form-check-input" type="radio" id="user-active" :value="1">
            <label class="form-check-label" for="user-active">Active</label>
          </div>

          <div class="form-check">
            <input v-model="user.active" class="form-check-input" type="radio" id="user-active-2" :value="0">
            <label class="form-check-label" for="user-active-2">Inactive</label>
          </div>

          <hr>
          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save">
            <router-link to="/admin/users" class="btn btn-secondary">Cancel</router-link>
          </div>
          <div class="float-end">
            <a v-if="(this.$route.params.userId > 0) && (parseInt(String(this.$route.params.userId), 10)) !== store.user.id"
              class="btn btn-danger" href="javascript:void(0);" @click="confirmDelete(this.user.id)">Delete</a>
          </div>
          <div class="clearfix"></div>
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import { Security } from './security.js'
import { store } from './store.js'
import FormTag from './forms/FormTag.vue'
import TextInput from './forms/TextInput.vue'
import notie from 'notie'
import router from '../router/index.js'

export default {
  beforeMount() {
    Security.requireToken()

    if (parseInt(String(this.$route.params['userId']), 10) > 0) {
      fetch(`${process.env.VUE_APP_API_URL}/admin/users/get/${this.$route.params['userId']}`, Security.requestOptions(''))
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            // This emit an error event to the parent component
            // The parent component will handle the error event
            // and display the error message using notie
            this.$emit('error', data.message)
          } else {
            this.user = data
            this.user.password = ''
          }
        })
    }
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        active: 0,
      },
      store
    }
  },
  components: {
    FormTag,
    TextInput
  },
  methods: {
    submitHandler() {
      const payload = {
        id: parseInt(String(this.$route.params['userId']), 10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        active: this.user.active
      }

      fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.$emit('error', data.message)
          } else {
            this.$emit('success', 'User saved successfully')
            router.push('/admin/users') // redirect to the users list page
        }
      })
      .catch(() => {
        this.$emit('error', 'An error occurred while saving the user')
      })
    },
    confirmDelete(id) {
      notie.confirm({
        text: 'Are you sure you want to delete this user?',
        submitText: 'Delete',
        submitCallback: function() {
          let payload = {
            id: id
          }

          fetch(`${process.env.VUE_APP_API_URL}/admin/users/delete`, Security.requestOptions(payload))
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                this.$emit('error', data.message)
              } else {
                this.$emit('success', 'User deleted successfully')
                router.push('/admin/users')
              }
            })
            .catch(() => {
              this.$emit('error', 'An error occurred while deleting the user')
            })
        }
      })
    }
  }
}
</script>