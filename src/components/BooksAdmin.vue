<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Manage Books</h1>
        <hr>

        <table v-if="this.ready" class="table table-striped table-compact">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>
                <router-link :to="{ name: 'BookEdit', params: { bookId: book.id } }">{{ book.title }}</router-link>
              </td>
              <td>{{ book.author.author_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Security } from './security.js'

export default {
  data() {
    return {
      books: {},
      ready: false,
    }
  },
  // Add the activated lifecycle hook, which will be called when the component is navigated to.
  // Inside the activated lifecycle hook, fetch the books from the API and set the books data property.
  activated() {
    Security.requireToken()

    fetch(`${process.env.VUE_APP_API_URL}/books`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.$emit('error', data.message)
        } else {
          this.books = data.data.books
          this.ready = true
        }
      })
  },
  // Add the deactivated lifecycle hook, which will be called when the component is navigated away from.
  // Inside the deactivated lifecycle hook, set the ready data property to false.
  deactivated() {
    this.ready = false
  }
}
</script>