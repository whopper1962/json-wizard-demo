<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: 120%;
  /* background-color: #2c3e50; */
}
body {
  padding: 0;
  margin: 0;
}

nav {
  padding: 30px;
}

nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

.line-height-none {
  line-height: 0px;
}
p {
  line-height: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  cursor: pointer;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-weight: bold; */
}

pre {
  font-family: 'Menlo', sans-serif;
  font-size: 13px;
  line-height: 160%;
}
</style>
