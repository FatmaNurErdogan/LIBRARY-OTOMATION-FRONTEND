<template>
  <div class="author-page">
    <h1>Author List</h1>

    <form @submit.prevent="addAuthor">
      <input v-model="newAuthor.name" placeholder="Author Name" required />
      <button type="submit">Add Author</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author.authorID">
          <td>{{ author.authorID }}</td>
          <td>{{ author.name }}</td>
          <td><button @click="deleteAuthor(author.authorID)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthorPage',
  data() {
    return {
      authors: [],
      newAuthor: {
        name: ''
      }
    };
  },
  methods: {
    fetchAuthors() {
      axios.get('http://localhost:7151/api/author')
        .then(res => this.authors = res.data)
        .catch(err => console.error(err));
    },
    addAuthor() {
      axios.post('http://localhost:7151/api/author', this.newAuthor)
        .then(() => {
          this.fetchAuthors();
          this.newAuthor.name = '';
        })
        .catch(err => console.error(err));
    },
    deleteAuthor(id) {
      axios.delete(`http://localhost:7151/api/author/${id}`)
        .then(() => this.fetchAuthors())
        .catch(err => console.error(err));
    }
  },
  mounted() {
    this.fetchAuthors();
  }
};
</script>

<style scoped>
.author-page {
  padding: 20px;
}
form input {
  margin: 5px;
  padding: 5px;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>