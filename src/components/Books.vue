<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Books</h1>

        <hr />
        <div class="filters text-center">
          <span class="filter me-1" v-bind:class="{ active: currentFilter === 0 }" v-on:click="setFilter(0)">ALL</span>
          <span class="filter me-1" :class="{ active: currentFilter === 7 }" @click="setFilter(7)">CLASSIC</span>
          <span class="filter me-1" :class="{ active: currentFilter === 2 }" @click="setFilter(2)">FANTASY</span>
          <span class="filter me-1" :class="{ active: currentFilter === 6 }" @click="setFilter(6)">HORROR</span>
          <span class="filter me-1" :class="{ active: currentFilter === 4 }" @click="setFilter(4)">THRILLER</span>
          <span class="filter me-1" :class="{ active: currentFilter === 1 }" @click="setFilter(1)">SCIENCE FICTION</span>
        </div>
        <hr />

        <div>
          <div class="card-group">
            <TransitionGroup class="p-3 d-flex flex-wrap" tag="div" appear name="books">
              <div v-for="b in this.books" :key="b.id">
                <div class="card me-2 ms-1 mb-3" style="width: 10rem;"
                  v-if="b.genre_ids.includes(currentFilter) || currentFilter === 0">
                  <RouterLink :to="`/books/${b.slug}`">
                    <img :src="`${this.imgPath}/covers/${b.slug}.jpg`" class="card-img-top" :alt="`cover for ${b.title}`">
                  </RouterLink>
                  <div class="card-body text-center">
                    <h6 class="card-title">{{ b.title }}</h6>
                      <span class="book-author">{{ b.author.author_name }}</span><br>
                      <small class="text-muted book-genre" v-for="(g, index) in b.genres" v-bind:key="g.id">
                        <em class="me-1">
                          {{ g.genre_name }}<template v-if="index !== (b.genres.length -1)">,</template>
                        </em>
                      </small>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/components/store'

export default {
  name: 'Books',
  data() {
    return {
      store,
      ready: false,
      imgPath: process.env.VUE_APP_IMAGE_URL,
      books: {},
      currentFilter: 0,
    }
  },
  emits: ['error'],
  beforeMount() {
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
      .catch(error => {
        this.$emit('error', error.message)
      })
  },
  methods: {
    setFilter: function(filter) {
      this.currentFilter = filter
    }
  }
}
</script>

<style scoped>
.book-author, book.genre {
  font-size: 0.8em;
}
.filters {
  height: 2.5em;
}
.filter {
  padding: 6px 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  border: 1px solid #ccc;
}
.filter.active {
  background-color: #007bff;
  color: #fff;
}
.filter:hover {
  background-color: #4a9bec;
  color: #fff;
}
/** transictions styles */
.books-move {
  transition: all 500ms ease-in-out 50ms;
}
.books-enter-active {
  transition: all 500ms ease-in-out;
}
.books-leave-active {
  transition: all 500ms ease-in;
}
.books-enter, .books-leave-to {
  opacity: 0;
}
</style>