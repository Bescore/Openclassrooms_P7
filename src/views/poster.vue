<template>
  <router-link class="compte" to="/compte"> Mon Compte |</router-link>
  <router-link class="compte" to="/"> Se deconnecter |</router-link>
  <div>
    <div class="actualite">Fil d'actualité aujourd'hui</div>
  </div>
  <div class="posts" :key="index" v-for="(posting, index) in posting">
    <div>Titre</div>
    <div class="photo"></div>
    <div class="posts-comments"><div class="posts-comments-child" :key="index" v-for="(posters, index) in posters">{{posters.name}}</div></div>
    <form class="form">
      <div class="like-contenair">
      <div>J'aime</div>
      <div>Je n'aime pas</div>
      </div>
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
  </div>
  
</template>

<script>
import axios from "axios";
import poster from "@/views/poster.vue";
export default {
  name: poster,
  data() {
    return {
      posters: null,
      posting:2,
    };
  },
  async mounted() {
    await axios.get("https://digimon-api.vercel.app/api/digimon")
    .then((response) => {
      this.posters = response.data;
      console.log(this.posters);
    })
    .catch(error=>console.log(error));
    
  },
  methods:{
    async poster(){
      event.preventDefault()
      await axios.post("https://localhost:3000/feed/comment",{
      
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
  border: rgb(145, 96, 96) solid 2px;
  background-color: rgb(233, 219, 219);
}
.compte {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.posts {
  padding:20px;
  width: 600px;
  height: 650px;
  margin: auto;
  margin-top: 50px;
  border: orange solid 2px;
  margin-bottom:30px;
  border-radius:20px;
  
}
.photo{
  width:550px;
  height:200px;
  margin:auto;
  position: relative;
  top:20px;
  border: red solid;
  border-radius:20px;
}
.like-contenair{
  display: flex;
  justify-content: space-around;
  position: relative;
  bottom:20px;

}
.posts-comments{
  width:580px;
  height:200px;
  margin:auto;
  position: relative;
  top:30px;
  border:green solid;
  overflow:auto;
}
.posts-comments-child{
  margin:20px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
.commentaire {
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  resize: none;
}
.form{
position:relative;
top:70px
}

</style>