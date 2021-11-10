<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <form @submit.stop.prevent="submit">
    <label for="email">Email :</label><br />
    <input class="email" type="email" id="email" name="email" /><br />
    <label for="password">Mot de passe :</label><br />
    <input
      class="password"
      type="password"
      id="password"
      name="password"
    /><br /><br />
    <input
      class="validate"
      @click="connected(), redirect()"
      type="submit"
      value="Connexion"
    />
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "connecteur",
  props: {
    msg: String,
  },
  methods: {
    redirect() {
      this.$router.push("/feed");
    },
    async connected() {
      event.preventDefault();
      await axios
        .post("https://localhost:3000/login", {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        })
        .then((response) => {
          console.log(response);
        }),
        (error) => {
          console.log(error);
        };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
a {
  color: #42b983;
}
@mixin input-size {
  margin: 10px;
  margin-bottom: 5px;
  height: 30px;
  width: 30%;
}
.email {
  @include input-size;
}
.password {
  @include input-size;
}
.validate {
  width: 20%;
  height: 50px;
  border-radius: 20px;
}
</style>
