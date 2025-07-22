<template>
  <div :class="['sidebar', { closed: !isSidebarOpen }]">
    <button class="toggle" @click="toggleSidebar">☰</button>

    <!-- Giriş yapan kullanıcı adı (isim) -->
    <div v-if="isSidebarOpen && fullName" class="welcome-message">
      <i class="fas fa-user-circle"></i>
      <span>Hello {{ fullName }}</span>
    </div>

    <div class="links">
      <router-link to="/books">
        <i class="fas fa-book"></i>
        <span v-if="isSidebarOpen">Books</span>
      </router-link>
      <router-link to="/users">
        <i class="fas fa-user"></i>
        <span v-if="isSidebarOpen">Users</span>
      </router-link>
      <router-link to="/authors">
        <i class="fas fa-pen-nib"></i>
        <span v-if="isSidebarOpen">Authors</span>
      </router-link>
      <router-link to="/borroweds">
        <i class="fas fa-book-reader"></i>
        <span v-if="isSidebarOpen">Borroweds</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      isSidebarOpen: true,
      fullName: ''
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // İsim + soyisim varsa birleştirerek göster, yoksa sadece name göster
      this.fullName = user.name
        ? user.lastname
          ? `${user.name} ${user.lastname}`
          : user.name
        : '';
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #1f2a40;
  color: white;
  padding: 20px 10px;
  transition: width 0.3s ease;
  min-height: 100vh;
}
.sidebar.closed {
  width: 60px;
}
.toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
}
.welcome-message {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 10px;
}
.welcome-message i {
  font-size: 22px;
  color: white;
}
.links {
  display: flex;
  flex-direction: column;
}
.links a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  text-decoration: none;
  transition: 0.2s;
}
.links a:hover {
  background-color: white;
  color: #1f2a40;
}
.links a:hover i {
  color: #1f2a40;
}
.links i {
  width: 20px;
  text-align: center;
  color: white;
  font-size: 18px;
}
</style>


