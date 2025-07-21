<template>
  <div :class="['sidebar', { closed: !isSidebarOpen }]">
    <button class="toggle" @click="toggleSidebar">☰</button>
    <div v-if="isSidebarOpen" class="links">
      <router-link to="/books">Books</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/authors">Authors</router-link>
      <router-link to="/borroweds">Borroweds</router-link>
      
    </div>
  </div>
</template>

<script>

export default {
  name: "AppSidebar",
  data() {
    return {
      isSidebarOpen: true
    };
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
  width: 200px;
  background-color: #1f2a40;
  color: white;
  padding: 20px;
  transition: all 0.3s ease;
}
.sidebar.closed {
  width: 60px;
  overflow: hidden;
}
.toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
}
.links a {
  display: block;
  color: white;
  text-decoration: none;
  margin: 10px 0;
}
</style>
