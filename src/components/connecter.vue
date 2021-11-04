<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

   <form >
  <label  for="email">Email:</label><br>
  <input class="email" type="email" id="email" name="email"><br>
  <label for="password">Mot de passe:</label><br>
  <input class="password" type="password" id="password" name="password"><br><br>
  <input class="validate" type="submit" value="Valider">
</form> 
</template>

<script>
export default {
  name: 'connecteur',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@mixin input-size{
  margin: 10px;
  height: 30px;
  width:30%;
}
.email{
 @include input-size
}
.password{
   @include input-size
}
.validate{
  width:20%;
  height:30px;
}
</style>
