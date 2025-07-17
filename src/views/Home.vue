<template>
    <div class="home">
    <h1>
        Hello, welcome to your personal library system.
    </h1>
    <p>
        Explore our book collection.
    </p>
    <div class="buttons">
        <router-link to="/books"><button>View Books</button></router-link>
        <router-link to="/authors"><button>View Authors</button></router-link>
    </div>
    </div>
</template>
<script>
export default {
  name: 'HomePage'
}
</script>
<styele scoped>
    .home {
  text-align: center;
  margin-top: 40px;
}
.buttons button {
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid #444;
  background: white;
  cursor: pointer;
  border-radius: 5px;
}
</styele>