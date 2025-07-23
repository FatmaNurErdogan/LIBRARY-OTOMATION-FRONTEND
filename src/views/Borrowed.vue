<template>
  <div class="borrowed-books">
    <h2>Borrowed Books</h2>

    <form v-if="isAdmin" @submit.prevent="editingID ? updateBorrowed() : addBorrowed()">
      <input v-model="form.userId" type="number" placeholder="User ID" required />
      <input v-model="form.bookId" type="number" placeholder="Book ID" required />
      <input v-model="form.borrowDate" type="date" required />
      <input v-model="form.returnDate" type="date" required />
      <button type="submit">{{ editingID ? 'Update Borrowed' : 'Add Borrowed' }}</button>
      <button v-if="editingID" type="button" @click="cancelEdit">Cancel</button>
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
            <div v-if="isAdmin">
              <button @click="editBorrowed(item)">Edit</button>
              <button @click="deleteBorrowed(item.borrowedID)">Delete</button>
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
  name: 'BorrowedBooks',
  data() {
    return {
      borrowedList: [],
      form: {
        userId: '',
        bookId: '',
        borrowDate: '',
        returnDate: ''
      },
      editingID: null,
      isAdmin: false
    };
  },
  methods: {
    fetchBorrowed() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:5283/api/borrowed', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => this.borrowedList = res.data)
      .catch(err => console.error('Fetch error:', err));
    },
    addBorrowed() {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:5283/api/borrowed', this.form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchBorrowed();
        this.resetForm();
      })
      .catch(err => console.error('Add error:', err));
    },
    editBorrowed(borrowed) {
      this.form = { ...borrowed };
      this.editingID = borrowed.borrowedID;
    },
    updateBorrowed() {
      const token = localStorage.getItem('token');
      axios.put(`http://localhost:5283/api/borrowed/${this.editingID}`, this.form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchBorrowed();
        this.resetForm();
      })
      .catch(err => console.error('Update error:', err));
    },
    deleteBorrowed(id) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5283/api/borrowed/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.fetchBorrowed())
      .catch(err => console.error('Delete error:', err));
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        userId: '',
        bookId: '',
        borrowDate: '',
        returnDate: ''
      };
      this.editingID = null;
    },
    checkAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isAdmin = user && user.userID === 1;
    }
  },
  mounted() {
    this.checkAdmin();
    this.fetchBorrowed();
  }
};
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
button {
  margin: 5px 5px 0 0;
  padding: 5px 10px;
}
</style>

