<template>
  <div class="author-page">
    <h1>Author List</h1>

    <!-- formu sadece benim görmem için -->
    <form v-if="isAdmin" @submit.prevent="editingAuthorID ? updateAuthor() : addAuthor()">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.biography" placeholder="Biography" />
      <input v-model="form.birthYear" placeholder="Birth Year" />
      <button type="submit">{{ editingAuthorID ? 'Update Author' : 'Add Author' }}</button>
      <button v-if="editingAuthorID" type="button" @click="cancelEdit">Cancel</button>
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
        <!-- for loop database den gelen arrayleri tabloya dönüştürdük -->
        <tr v-for="item in authors" :key="item.authorID">
          <td>{{ item.authorID }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.biography }}</td>
          <td>{{ item.birthYear }}</td>
          <td>

            <div v-if="isAdmin">
              <button @click="editAuthor(item)">Edit</button>
              <button @click="deleteAuthor(item.authorID)">Delete</button>
            </div>
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
      form: {
        name: '',
        biography: '',
        birthYear: ''
      },
      editingAuthorID: null,
      isAdmin: false
    };
  },
  methods: {
    fetchAuthors() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:5283/api/author', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => this.authors = res.data)
      .catch(err => console.error('Fetch Error:', err));
    },
    addAuthor() {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:5283/api/author', this.form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchAuthors();
        this.resetForm();
      })
      .catch(err => console.error('Add Error:', err));
    },
    editAuthor(author) {
      this.form = { ...author };  //sprea operatoru ile nesneyi this.forma aktarıyor
      this.editingAuthorID = author.authorID;   //güncelleme
    },
    updateAuthor() {
      const token = localStorage.getItem('token');
      axios.put(`http://localhost:5283/api/author/${this.editingAuthorID}`, this.form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchAuthors();
        this.resetForm();
      })
      .catch(err => console.error('Update Error:', err));
    },
    deleteAuthor(id) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5283/api/author/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.fetchAuthors())
      .catch(err => console.error('Delete Error:', err));
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        biography: '',
        birthYear: ''
      };
      this.editingAuthorID = null;
    },
    checkAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isAdmin = user && user.userID === 1;
    }
  },
  mounted() {
    this.checkAdmin();
    this.fetchAuthors();
  }
};
</script>

<style scoped>
.author-page {
  padding: 80px;
}
form input {
  margin: 10px;
  padding: 5px;
}
form button {
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

