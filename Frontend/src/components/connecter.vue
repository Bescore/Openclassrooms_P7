<template>
<div>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <form @submit.prevent="submit">
    <label for="email_id">Email :</label>
    <br />
    <input class="email" type="email" id="email_id" name="email" />
    <br />
    <label for="password_id">Mot de passe :</label>
    <br />
    <input class="password" type="password" id="password_id" name="password" />
    <br />
    <br />
    <input
      class="validate"
      @click="connected()"
      type="submit"
      value="Connexion"
      id="sub"
      disabled="disabled"
    />
  </form>
  </div>
</template>

<script>
import "../views/axios";
import axios from "axios";
export default {
  name: "connecteur",
  props: {
    msg: String,
  },
  mounted() {
    this.hello();
  },

  methods: {
    hello() {
      document
        .getElementById("email_id")
        .addEventListener("input", function () {
          if (document.getElementById("email_id").value.length > 0) {
            document.getElementById("sub").disabled = false;
          } else {
            document.getElementById("sub").disabled = true;
          }
        }),
        document
          .getElementById("password_id")
          .addEventListener("input", function () {
            if (document.getElementById("password_id").value.length > 0) {
              document.getElementById("sub").disabled = false;
            } else {
              document.getElementById("sub").disabled = true;
            }
          });
    },

    async connected() {
      event.preventDefault();
      await axios
        .post("auth/login", {
          email: document.getElementById("email_id").value,
          password: document.getElementById("password_id").value,
        })
        .then((response) => {
          if (localStorage.getItem("secret")) {
            localStorage.removeItem("secret");
          }
          localStorage.setItem("secret", response.data.userId);
          localStorage.setItem("token", response.data.token);
          this.$router.push("/feed");
        })
        .catch((err) => {
          console.log(err + " " + "envoi du login n'a pas aboutie");
        });
        setTimeout(function () {
				location.reload();
			}, 100);
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
///MEDIA QUERIES///
@media screen and (max-width:626px){
.email{
  width: 200px;
}
.password{
  width: 200px;
}
.validate {
  width: 100px;
  
}
}
</style>
