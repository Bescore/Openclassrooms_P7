<template>
  <div id="nav">
    <router-link to="/">Se connecter</router-link> |
    <router-link to="/inscrire">s'inscrire</router-link> |
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding:20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #db590d;
    }
    text-decoration: none;
  }
  
  text-align: right;
}
.groupopict{
  width:250px;
  height:250px;
}
.groupicon{
  width: 50px;
  height:50px;
}
</style>
