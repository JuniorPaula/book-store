<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand text-uppercase" to="/">Book store</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/books" class="nav-link active">Books</router-link>
          </li>

          <li v-if="store.token !== ''" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/admin/users" class="dropdown-item">Manager users</router-link>
              </li>
              <li>
                <router-link to="/admin/users/0" class="dropdown-item">Add users</router-link>
              </li>
              <li>
                <router-link to="/admin/books" class="dropdown-item">Manager books</router-link>
              </li>
              <li>
                <router-link :to="{name: 'BookEdit', params: {bookId: 0}}" class="dropdown-item">Add Book</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="navbar-nav d-flex">
            <span class="nav-link mr-5">{{ store.user.first_name ?? '' }}</span>

            <router-link v-if="store.token == ''" class="nav-link me-2" to="/login">Login</router-link>
            <a href="javascript:void(0);" v-else class="nav-link me-2" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Security } from './security.js'
import { store } from './store.js'
import router from '../router/index.js'

export default {
  name: 'Header',
  data() {
    return {
      store
    }
  },
  methods: {
    logout() {
      const payload = {
        token: store.token,
      }

      fetch(`${process.env.VUE_APP_API_URL}/users/logout`, Security.requestOptions(payload))
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log(data.message)
          } else {
            store.token = ''
            store.user = {}
            
            // destroy the cookie
            document.cookie = '_site_data=; path=/; '
            + 'SameSite=Strict; Secure; '
            + 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'

            router.push('/login')
          }
        })
    }
  }
}

</script>

<style>
.navbar {
  background-color: #33AFFF;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
}

.navbar-brand:hover {
  color: #fff;
  text-decoration: none;
}

.nav-link {
  color: #fff;
}

.nav-link:hover {
  color: #fff;
  text-decoration: none;
}

.nav-link.active {
  color: #fff;
  text-decoration: none;
}

</style>