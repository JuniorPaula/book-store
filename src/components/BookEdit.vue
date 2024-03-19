<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Add/Edit Book</h1>
        <hr>

        <FormTag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
          <div v-if="this.book.slug !==''" class="mb-3">
            <img v-bind:src="`${this.imgPath}/covers/${this.book.slug}.jpg`" class="img-fluid img-thrmbnail book-cover" alt="cover">
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label">Cover Image</label>
            <input v-if="this.book.id === 0" 
              ref="coverInput" 
              class="form-control" 
              type="file" 
              id="formFile"
              required a
              ccept="image/jpeg" 
              @change="loadCoverImage"
            >
            <input v-else 
              ref="coverInput" 
              class="form-control" 
              type="file" 
              id="formFile"
              required 
              accept="image/jpeg" 
              @change="loadCoverImage"
            >
          </div>

          <TextInput
            v-model="book.title"
            type="text"
            :required="true"
            label="Title"
            :value="book.title"
            name="title"
          />

          <SelectInput
            name="author_id"
            v-model="this.book.author_id"
            :items="this.authors"
            :required="true"
            label="Author"
          />

          <TextInput
            v-model="book.publication_year"
            type="text"
            :required="true"
            label="Publication Year"
            :value="book.publication_year"
            name="publication_year"
          />

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="book.description" class="form-control" id="description" rows="3"></textarea>
          </div>

        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import { Security } from './security.js'
import FormTag from './forms/FormTag.vue'
import TextInput from './forms/TextInput.vue'
import SelectInput from './forms/SelectInput.vue'

export default {
  name: 'BookEdit',
  beforeMount() {
    Security.requireToken()
  },
  components: {
    FormTag,
    TextInput,
    SelectInput,
  },
  data() {
    return {
      book: {
        id: 0,
        title: '',
        author_id: 0,
        publication_year: 0,
        description: '',
        cover: '',
        slug: '',
        genres: [],
        genres_ids: [],
      },
      authors: [],
      imgPath: process.env.VUE_APP_IMAGE_URL,
      genres: [
        {value: 1 , text: 'Science Fiction'},
        {value: 2 , text: 'Fantasy'},
        {value: 3 , text: 'Romance'},
        {value: 4 , text: 'Thriller'},
        {value: 5 , text: 'Mystery'},
        {value: 6 , text: 'Horror'},
        {value: 7 , text: 'Classic'},
      ],
    }
  },
  methods: {
    submitHandler() {},
    loadCoverImage() {}
  }
}
</script>