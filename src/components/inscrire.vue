<template>
  <img
    class="groupopict"
    src="@\assets\icon-left-font-monochrome-black.png"
    alt="groupomania"
  />
  <h1>{{ inscrireinput }}</h1>
  <form @submit.prevent="submit">
    <label for="email">Email :</label><br />
    <input class="email" type="email" id="email" name="email" /><br />
    <label for="password">Mot de passe :</label><br />
    <input
      class="password"
      type="password"
      id="password"
      name="password"
    /><br /><br />
    <input class="validate" @click="redirect()" type="submit" value="Connexion" />
  </form>
</template>




<script>
export default {
  name: "inscrire",
  props: {
    inscrireinput: String,
  },
  methods:{
    redirect(){
      this.$router.push('/feed')
    }
  }
};
</script>
