<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="admin-users-title">All Users</h1>
      </div>
      <hr>

      <table v-if="this.ready" class="table table-compact table-striped table-hover">
        <thead style="background-color: #33AFFF; color: #fff;">
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in this.users" v-bind:key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">{{ u.first_name }} {{ u.last_name }}</router-link>
            </td>
            <td>{{ u.email }}</td>
            <td v-if="u.active === 0">
              <span class="badge bg-danger">Inactive</span>
            </td> 
            <td v-else>
              <span class="badge bg-success">Active</span>
            </td> 
            <td v-if="u.token.id > 0">
              <a href="javascript:void(0);">
                <span class="badge bg-success" @click="logUserOut(u.id)">Logged in</span>
              </a>
            </td>
            <td v-else>
              <span class="badge bg-danger">Logged out</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center">Loading...</p>
    </div>
  </div>
</template>

<script>
import { Security } from './security.js'
import { store } from './store.js'
import notie from 'notie'

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      ready: false,
      store,
    }
  },
  beforeMount() {
    Security.requireToken()

    fetch(`${process.env.VUE_APP_API_URL}/admin/users/all`, Security.requestOptions(''))
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          notie.alert({ type: 'error', text: data.message, time: 3 })
        } else {
          this.users = data.data.users
          this.ready = true
        }
      })
      .catch(error => {
        notie.alert({ type: 'error', text: error.message, time: 3 })
      })
  },
  methods: {
    logUserOut(id) {
      if (id !== store.user.id) {
        notie.confirm({
          text: 'Are you sure you want to log this user out?',
          submitText: 'Lot out',
          submitCallback: () => {
            fetch(`${process.env.VUE_APP_API_URL}/admin/log-user-out/${id}`, Security.requestOptions(''))
              .then(response => response.json())
              .then(data => {
                if (data.error) {
                  this.$emit('error', data.message)
                } else {
                  this.$emit('success', data.message)
                  this.$emit('forceUpdate')
                }
              })
              .catch(error => {
                this.$emit('error', error.message)
              })
          }
        })
      } else {
        this.$emit('error', 'You cannot log yourself out')
      }
    }
  }
}
</script>

<style scoped>
.admin-users-title {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>