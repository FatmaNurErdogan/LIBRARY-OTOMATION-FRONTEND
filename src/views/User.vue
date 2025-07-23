<template>
  <div class="user">
    <h1>Library - User List</h1>

    <form v-if="isAdmin" @submit.prevent="editingUserID ? updateUser() : addUser()">
      <input v-model="form.userID" placeholder="User ID" required />
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.lastname" placeholder="Lastname" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.userName" placeholder="Username" />
      <input v-model="form.password" placeholder="Password" />
      <button type="submit">
        {{ editingUserID ? 'Update User' : 'Add User' }}
      </button>
      <button v-if="editingUserID" type="button" @click="cancelEdit">Cancel</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userID">
          <td>{{ user.userID }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.password }}</td>
          <td>
            <div v-if="isAdmin">
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.userID)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'UserPage',
  data() {
    return {
      users: [],
      form: {
        userID: '',
        name: '',
        lastname: '',
        email: '',
        userName: '',
        password: '',
      },
      editingUserID: null,
      isAdmin: false
    }
  },
  methods: {
    fetchUsers() {
      api.get('/user')
        .then(res => this.users = res.data)
        .catch(err => console.error('Error fetching users', err));
    },
    addUser() {
      api.post('/user', this.form)
        .then(() => {
          this.fetchUsers();
          this.resetForm();
        })
        .catch(err => console.error('Error adding user', err));
    },
    editUser(user) {
      this.form = { ...user };
      this.editingUserID = user.userID;
    },
    updateUser() {
      api.put(`/user/${this.editingUserID}`, this.form)
        .then(() => {
          this.fetchUsers();
          this.resetForm();
          this.editingUserID = null;
        })
        .catch(err => console.error('Error updating user', err));
    },
    deleteUser(userID) {
      api.delete(`/user/${userID}`)
        .then(() => this.fetchUsers())
        .catch(err => console.error('Error deleting user', err));
    },
    cancelEdit() {
      this.resetForm();
      this.editingUserID = null;
    },
    resetForm() {
      this.form = {
        userID: '',
        name: '',
        lastname: '',
        email: '',
        userName: '',
        password: '',
      };
    },
    checkAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isAdmin = user && user.userID === 1;
    }
  },
  mounted() {
    this.checkAdmin();
    this.fetchUsers();
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
form {
  margin-bottom: 20px;
}
</style>