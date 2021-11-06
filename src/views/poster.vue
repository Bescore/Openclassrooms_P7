<template>
  <router-link class="compte" to="/compte"> Mon Compte |</router-link>
  <router-link class="compte" to="/"> Se deconnecter |</router-link>
  <div>
    <div class="actualite">Fil d'actualité aujourd'hui</div>
  </div>
  <div class="posts"  :key="index" v-for="(posters, index) in posters">
    <div>koukou</div>
  </div>
  <form>
      <label class="commentaire-label" for="comments">Ajouter un commentaire:</label>
    <div>
      <textarea
        class="commentaire"
        name="commentaires"
        id="comments"
      ></textarea>
    </div>
    <input @click='poster' type="submit" value="Commenter" />
  </form>
</template>

<script>
import axios from "axios";
import poster from "@/views/poster.vue";
export default {
  name: poster,
  data() {
    return {
      posters: null,
    };
  },
  mounted() {
    axios.get("https://localhost:3000/feed")
    .then((response) => {
      this.posters = response.data;
      console.log(this.posters);
    })
    .catch(error=>console.log(error));
    
  },
  methods:{
    async poster(){
      event.preventDefault()
      await axios.post("https://localhost:3000/comment",{
      commentaire: document.getElementById('comments').value,
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    }
  }
};
</script>


<style scoped>
.actualite {
  font-weight: bold;
  margin-top: 20px;
  padding: 20px;
  border: black solid 2px;
  background-color: rgb(233, 219, 219);
}
.compte {
  position: relative;
  left: 280px;
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.posts {
  width: 350px;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  border: orange solid 2px;
}
.commentaire {
  width: 450px;
  height: 150px;
  margin-bottom: 10px;
  resize: none;
}
.commentaire-label {
  width: 180px;
}
</style>