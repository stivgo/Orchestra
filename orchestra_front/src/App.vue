<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --first-color: #3cc9e8;
  --second-color: white;
  --third-color: #f3f3f3;
  --first-color-editor: #41434c;
  --second-color-editor: #545763;
  --third-color-editor: #3c3e48;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  text-decoration: none;
  text-align: left;
}
button {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.vis-time-axis .vis-text {
  color: white !important;
}

.vis-custom-time {
  background-color: transparent !important;
}

.slide-container {
  width: 100%;
  align-items: center;
  overflow: hidden;
}

.image-slider {
  width: 100%;
  position: relative;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.7s;
}

.slides-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 30px;
}
.imagenes {
  position: relative;
  width: 150px;
  height: 200px;
  transition: 0.5s;
}
.button {
  width: 150px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
</style>
