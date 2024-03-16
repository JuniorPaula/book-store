<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
      </div>
      <hr>

      <table v-if="this.ready" class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in this.users" v-bind:key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">{{ u.first_name }} {{ u.last_name }}</router-link>
            </td>
            <td>{{ u.email }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center">Loading...</p>
    </div>
  </div>
</template>

<script>
import { Security } from './security.js'
import notie from 'notie'

export default {
  data() {
    return {
      users: [],
      ready: false,
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
  }
}
</script>