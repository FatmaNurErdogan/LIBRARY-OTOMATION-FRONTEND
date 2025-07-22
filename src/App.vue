<template>
  <div id="app">
    <Header :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <div class="content-wrapper">
      <Sidebar v-if="isLoggedIn" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    handleLogout() {
      localStorage.removeItem('token');
      this.checkLoginStatus();
      this.$router.push('/login');
    }
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    }
  }
};
</script>

<style>
.content-wrapper {
  display: flex;
  min-height: 100vh;
}
</style>



