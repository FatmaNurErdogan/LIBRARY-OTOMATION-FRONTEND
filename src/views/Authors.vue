<template>
  <div class="author-page">
    <h1>Author List</h1>

    <form @submit.prevent="addAuthor">
      <input v-model="author.name" placeholder="Name" required />
      <input v-model="author.biography" placeholder="Biography" />
      <input v-model="author.birthYear" placeholder="Birth Year" />
      <button type="submit">Add Author</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Biography</th>
          <th>Birth Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in authors" :key="item.authorID">
          <td>{{ item.authorID }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.biography }}</td>
          <td>{{ item.birthYear }}</td>
          <td>
            <button @click="deleteAuthor(item.authorID)">Delete</button>
          </td>
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
      author: {
        name: '',
        biography: '',
        birthYear: ''
      }
    };
  },
  methods: {
    fetchAuthors() {
      axios.get('http://localhost:5283/api/author')
        .then(res => {
          console.log('Veriler geldi:', res.data);
          this.authors = res.data;
        })
        .catch(err => console.error('Fetch Error:', err));
    },
    addAuthor() {
      axios.post('http://localhost:5283/api/author', this.author)
        .then(() => {
          this.fetchAuthors();
          this.author = { name: '', biography: '', birthYear: '' };
        })
        .catch(err => console.error('Add Error:', err));
    },
    deleteAuthor(id) {
      axios.delete(`http://localhost:5283/api/author/${id}`)
        .then(() => this.fetchAuthors())
        .catch(err => console.error('Delete Error:', err));
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
button {
  margin: 5px;
  padding: 5px 10px;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
