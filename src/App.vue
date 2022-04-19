<template>
  <!-- <div id="nav"> -->
  <!--   <router&#45;link to="/">Home</router&#45;link> | -->
  <!--   <router&#45;link to="/about">About</router&#45;link> -->
  <!-- </div> -->
  <router-view/>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);
export default {  
  name: 'app',
}
</script>

<!-- <style lang="scss"> -->
<style>
@import "./assets/css/uikit.min.css";
@import url("https://fonts.googleapis.com/css2?family=Material+Icons");

html {
  background-color: #f2f2f2;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #f9f9f9; */
  /* background-color: #f2f2f2; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
