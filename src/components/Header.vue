<template>
  <header class="üsttekiler">
    <div class="sol">
      <router-link to="/" class="homePage">Home Page</router-link>
    </div>
    <div class="sağ">
      <button @click="goToRegister">Register</button>
      <button @click="goToLogIn">LogIn</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    goToLogIn() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.üsttekiler {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}
.homePage {
  color: white;
  margin-right: 10px;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 14px;
  background-color: #2a4c7e;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.sağ button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #2a4c7e;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
