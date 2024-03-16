<template>
  <Header />
  <div>
    <router-view :key="componentKey" @success="success" @error="error" @warning="warning" @forceUpdate="forceUpdate" />
  </div>
  <Footer />
</template>

<script>
import { store } from './components/store.js'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import notie from 'notie'

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      store,
      componentKey: 0,
    }
  },
  beforeMount() {
    // check for cookie
    let data = getCookie('_site_data')

    if (data !== "") {
      let cookieData = JSON.parse(data)

      // update the store
      store.token = cookieData.token.token
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },
  methods: {
    // notie alerts message events handler
    success(message) {
      notie.alert({
        type: 'success',
        text: message,
        time: 3
      })
    },
    error(message) {
      notie.alert({
        type: 'error',
        text: message,
        time: 3
      })
    },
    warning(message) {
      notie.alert({
        type: 'warning',
        text: message,
        time: 3
      })
    },
    forceUpdate() {
      this.componentKey += 1
    }
  }
}
</script>

<style>

</style>
