<template>
  <div class="borrowed-books">
    <h2>Borrowed Books</h2>

    <form @submit.prevent="addBorrowed">
      <input v-model="newBorrowed.userId" type="number" placeholder="User ID" required />
      <input v-model="newBorrowed.bookId" type="number" placeholder="Book ID" required />
      <input v-model="newBorrowed.borrowDate" type="date" required />
      <input v-model="newBorrowed.returnDate" type="date" required />
      <button type="submit">Add Borrowed</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Book ID</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in borrowedList" :key="item.borrowedID">
          <td>{{ item.borrowedID }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.bookId }}</td>
          <td>{{ item.borrowDate }}</td>
          <td>{{ item.returnDate }}</td>
          <td>
            <button @click="deleteBorrowed(item.borrowedID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BorrowedBooks',
  data() {
    return {
      borrowedList: [],
      newBorrowed: {
        userId: '',
        bookId: '',
        borrowDate: '',
        returnDate: ''
      }
    }
  },
  methods: {
    fetchBorrowed() {
      axios.get('http://localhost:5283/api/borrowed')
        .then(res => {
          this.borrowedList = res.data;
        })
        .catch(err => console.error('Fetch error:', err));
    },
    addBorrowed() {
      axios.post('http://localhost:5283/api/borrowed', this.newBorrowed)
        .then(() => {
          this.fetchBorrowed();
          this.newBorrowed = { userId: '', bookId: '', borrowDate: '', returnDate: '' };
        })
        .catch(err => console.error('Add error:', err));
    },
    deleteBorrowed(id) {
      axios.delete(`http://localhost:5283/api/borrowed/${id}`)
        .then(() => {
          this.fetchBorrowed();
        })
        .catch(err => console.error('Delete error:', err));
    }
  },
  mounted() {
    this.fetchBorrowed();
  }
}
</script>

<style scoped>
.borrowed-books {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
form {
  margin-bottom: 20px;
}
input {
  margin-right: 10px;
  padding: 5px;
}
</style>
