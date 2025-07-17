<template>
  <div id="app">
    <header>
      <nav>
        <div class="left">
        <router-link to="/">
          Home Page
        </router-link>
        </div>
        <div class="right">
        <router-link to="/register">
          Register
        </router-link>
        <router-link to="/logIn">
          Log In
        </router-link>
        
        </div>
      </nav>
    </header>
     <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default{
  name:'App'
}
</script>
<style scoped>
  nav{
    margin: 20px;
  }
  nav a{
    margin: 0 10px;
    text-decoration: wavy;
    color:darkblue;
  }
</style>