<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Manage Books</h1>
        <hr>

        <table v-if="this.ready" class="table table-striped table-compact table-hover">
          <thead style="background-color: #33AFFF; color: #fff;">
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
  name: 'BooksAdmin',
  data() {
    return {
      books: {},
      ready: false,
    }
  },
  mounted() {
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
}
</script>