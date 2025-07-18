<template>
  <div class="book">
    <h1>Library - Book List</h1>

    <form @submit.prevent="addBook">
      <input v-model="newBook.bookName" placeholder="Book Name" required />
      <input v-model.number="newBook.authorID" placeholder="Author ID" required />
      <input v-model="newBook.publisher" placeholder="Publisher" required />
      <input v-model="newBook.type" placeholder="Type" required />
      <input v-model.number="newBook.stok" placeholder="Stock" required />
      <button type="submit">Add Book</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Type</th>
          <th>Stock</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.bookID">
          <td>{{ book.bookID }}</td>
          <td>{{ book.bookName }}</td>
          <td>{{ book.author?.name || 'Unknown' }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.type }}</td>
          <td>{{ book.stok }}</td>
          <td><button @click="deleteBook(book.bookID)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api'; 

export default {
  name: 'BookPage',
  data() {
    return {
      books: [],
      newBook: {
        bookName: '',
        authorID: null,
        publisher: '',
        type: '',
        stok: 0
      }
    };
  },
  methods: {
    fetchBooks() {
      api.get('/book')
        .then(res => this.books = res.data)
        .catch(err => console.error('Error fetching the books', err));
    },
    addBook() {
      api.post('/book', this.newBook)
        .then(() => {
          this.fetchBooks();
          this.newBook = {
            bookName: '',
            authorID: null,
            publisher: '',
            type: '',
            stok: 0
          };
        })
        .catch(err => console.error('Error adding the books', err));
    },
    deleteBook(id) {
      api.delete(`/book/${id}`)
        .then(() => this.fetchBooks())
        .catch(err => console.error('Error deleting the books', err));
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
.book {
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
