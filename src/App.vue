<template>
  <div id="app">
    <Header />
    <div class="content-wrapper">
      <Sidebar />
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
  }
};
</script>

<style>
.content-wrapper {
  display: flex;
  min-height: 100vh;
}
</style>

