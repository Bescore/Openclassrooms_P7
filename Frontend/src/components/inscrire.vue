<template>
  <img
    class="groupopict"
    src="@\assets\icon-left-font-monochrome-black.png"
    alt="groupomania"
  />
  <h1>{{ inscrireinput }}</h1>
  <form @submit.stop.prevent="submit" >
    <label for="email">Email :</label><br />
    <input class="email" v-model="email" type="email" id="email" name="email" required="required" /><br />
    <label for="password">Mot de passe :</label><br />
    <input
      v-model="password"
      class="password"
      type="password"
      id="password"
      name="password-name"
      required="required"
    /><br />
    <label for="nom" >Nom :</label><br />
    <input class="password" v-model="nom" type="text" id="nom" name="nom-name" required="required" /><br />
    <label for="Prenom">Prénom :</label><br />
    <input  v-model="prenom" class="password" type="text" id="Prenom" name="Prenom-name" required="required" /><br /><br />
    <input
      class="validate"
      @click="handleSubmit()"
      type="submit"
      value="Connexion"
      name="disable-Btn"
      disabled="disabled"
      id="sub"
    />
  </form>
</template>




<script>
import '../views/axios'
import axios from "axios";
export default {
  name: "inscrire",
  data(){
    return{
    email:"",
    password:"",
    nom:"",
    prenom:"",
  }
  },
  props: {
    inscrireinput: String,
  },
  mounted(){
this.hello()
  },
  methods: {
hello(){
 document.getElementById('email').addEventListener('input',function(){
   if(document.getElementById('email').value.length>0 ){
     document.getElementById("sub").disabled = false
   }else{
     document.getElementById("sub").disabled = true
   }

 }),
 document.getElementById('password').addEventListener('input',function(){
   if(document.getElementById('password').value.length>0 ){
     document.getElementById("sub").disabled = false
   }else{
     document.getElementById("sub").disabled = true
   }

 })
 document.getElementById('nom').addEventListener('input',function(){
   if(document.getElementById('nom').value.length>0 ){
     document.getElementById("sub").disabled = false
   }else{
     document.getElementById("sub").disabled = true
   }

 })
 document.getElementById('Prenom').addEventListener('input',function(){
   if(document.getElementById('Prenom').value.length>0 ){
     document.getElementById("sub").disabled = false
   }else{
     document.getElementById("sub").disabled = true
   }

 })
        
},
    handleSubmit(){
     const data=
     { email:this.email,
      password:this.password,
      nom:this.nom,
      prenom:this.prenom,
     };
     if(data.email===''||data.password==='',data.nom==='',data.prenom===''){
       alert('données incorrectes')
     }else{
      axios.post("auth/signup", 
          data,
          console.log(data)
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/feed");
    })
   .catch((err) => {
          console.log(err + " "+ "envoi du login n'a pas aboutie");
        })
  }
  },
}
}
</script>
<style scoped>
</style>