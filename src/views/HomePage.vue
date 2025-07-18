<template>
  <div class="home">
    <section class="resim" :style="backgroundStyle">
      <div class="yazilar">
        <h1 class="yazi1">Welcome to your personal library system</h1>
        <p class="yazi2">Explore our book collection</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: "url('/photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}

.resim {
  width: 100%;
  height: 600px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.yazilar {
  text-align: center;
}

.yazi1 {
  color: white;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}

.yazi2 {
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}
</style>















