<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Login</h2>
      <label for="username">Username</label>
      <input type="text" v-model="username" />

      <label for="password">Password</label>
      <input type="password" v-model="password" />

      <button @click="handleLogin">Sign In</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

export default {
  name: 'LoginPage',
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = async () => {
      try {
        const response = await api.post('/UserLogin/Login', {
          userName: username.value,
          password: password.value
        })

        const token = response.data.token || response.data.Token
        const user = response.data.user || {
          userName: username.value
        }

      
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

    
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        router.push('/')
      } catch (error) {
        alert('Login failed. Please check your credentials.')
        console.error(error)
      }
    }

    return { username, password, handleLogin }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #98a3ac;
}

.login-box {
  background-color: white;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-box label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

.login-box input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-box button {
  width: 100%;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>






