<template>
  <div class="book">
    <h1>Library - Book List</h1>

    <form v-if="isAdmin" @submit.prevent="editingBookID ? updateBook() : addBook()">
      <input v-model="form.bookName" placeholder="Book Name" required />

      <select v-model="form.authorID" required>
        <option disabled value="">Select Author</option>
        <option
          v-for="author in authors"
          :key="author.authorID"
          :value="author.authorID">
          {{ author.name }}
        </option>
      </select>

      <input v-model="form.publisher" placeholder="Publisher" required />

      <select v-model="form.type" placeholder="Type" required>
        <option disabled value="">Select Type</option>
        <option value="Romance">Romance</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Biography">Biography</option>
        <option value="History">History</option>
        <option value="Distopia">Distopia</option>
        <option value="Drama">Drama</option>
        <option value="Psychological">Psychological</option>
      </select>

      <input v-model.number="form.stok" placeholder="Stock" required />
      <input v-model="form.coverUrl" placeholder="Cover Image File Name (e.g. crime.jpeg)" />

      <button type="submit">{{ editingBookID ? 'Update Book' : 'Add Book' }}</button>
      <button v-if="editingBookID" type="button" @click="cancelEdit">Cancel</button>
    </form>

    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Type</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.bookID">
          <td>
            <img
              :src="book.coverUrl"
              alt="Book Cover"
              class="cover"
              @error="e => e.target.src = 'https://via.placeholder.com/60x80?text=No+Image'" />
          </td>
          <td>{{ book.bookID }}</td>
          <td>{{ book.bookName }}</td>
          <td>{{ book.author?.name || 'Unknown' }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.type }}</td>
          <td>{{ book.stok }}</td>
          <td v-if="isAdmin">
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.bookID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api';
import axios from 'axios';

export default {
  name: 'BookPage',
  data() {
    return {
      books: [],
      authors: [],
      form: {
        bookName: '',
        authorID: '',
        publisher: '',
        type: '',
        stok: 0,
        coverUrl: ''
      },
      editingBookID: null,
      isAdmin: false
    };
  },
  methods: {
    fetchBooks() {
      api.get('/book')
        .then(res => {
          this.books = res.data;
        })
        .catch(err => console.error('Error fetching books', err));
    },
    fetchAuthors() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:5283/api/author', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => this.authors = res.data)
        .catch(err => console.error('Error fetching authors', err));
    },
    addBook() {
      api.post('/book', this.form)
        .then(() => {
          this.fetchBooks();
          this.resetForm();
        })
        .catch(err => console.error('Error adding book', err));
    },
    editBook(book) {
      this.form = {
        bookName: book.bookName,
        authorID: book.authorID,
        publisher: book.publisher,
        type: book.type,
        stok: book.stok,
        coverUrl: book.coverUrl || ''
      };
      this.editingBookID = book.bookID;
    },
    updateBook() {
      api.put(`/book/${this.editingBookID}`, this.form)
        .then(() => {
          this.fetchBooks();
          this.resetForm();
        })
        .catch(err => console.error('Error updating book', err));
    },
    deleteBook(id) {
      api.delete(`/book/${id}`)
        .then(() => {
          this.fetchBooks();
        })
        .catch(err => console.error('Error deleting book', err));
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        bookName: '',
        authorID: '',
        publisher: '',
        type: '',
        stok: 0,
        coverUrl: ''
      };
      this.editingBookID = null;
    },
    checkAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isAdmin = user && user.userID === 1;
    }
  },
  mounted() {
    this.checkAdmin();
    this.fetchBooks();
    this.fetchAuthors();
  }
};
</script>

<style scoped>
.book {
  padding: 20px;
}
form input, form select {
  margin: 5px;
  padding: 5px;
}
form button {
  margin: 5px;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.cover {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>









