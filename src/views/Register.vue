<template>
  <div class="register">
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label for="name">Name</label>
        <input type="text" v-model="form.name" required />

        <label for="lastname">Lastname</label>
        <input type="text" v-model="form.lastname" required />

        <label for="email">Email</label>
        <input type="email" v-model="form.email" required />

        <label for="username">Username</label>
        <input type="text" v-model="form.userName" required />

        <label for="password">Password</label>
        <input type="password" v-model="form.password" required />

        <button type="submit">Register</button>
      </form>

      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        name: '',
        lastname: '',
        email: '',
        userName: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('/User', this.form)
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.'
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.register {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center; /* Yatayda tam ortala */
  align-items: center;     /* Dikeyde tam ortala */
  background-color: #8996a6;
  font-family: Arial, sans-serif;
}

.register-box {
  background-color: white;
  padding: 40px 50px;
  border-radius: 12px;
  width: 380px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  width: 100%;
  font-weight: bold;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>




