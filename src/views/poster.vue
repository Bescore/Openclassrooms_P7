<template>
  <div class="compte-banner">
    <img class="compte-banner-round-pic" src="@/assets/user-icon.png"/>
  <router-link class="compte" to="/compte">Mon Compte</router-link>
  <router-link class="compte" to="/">Se déconnecter</router-link>
  </div>
  <div>
    <div class="actualite">Fil d'actualité aujourd'hui</div>
  </div>
  <div class="posts" :key="index" v-for="(posting, index) in posting">
    <div>Titre</div>
    <img src="@\assets\post.jpg" class="photo"/>
    <div class="posts-comments"><div class="posts-comments-child" :key="index" v-for="(posters, index) in posters">{{posters.name}}</div></div>
    <div class="posts-comments"><div class="posts-comments-child" :key="index" v-for="(posters, index) in posters">{{posters.name}}</div></div>
    <form class="form">
      <div class="like-contenair">
      <div  id="like" class="like-contenair-child"><font-awesome-icon icon="thumbs-up" size="lg" /></div>
      <div id="dislike" class="like-contenair-child"><font-awesome-icon icon="thumbs-down" size="lg" /></div>
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
  <posting_box></posting_box>
</template>

<script>
import axios from "axios";
import poster from "@/views/poster.vue";
import posting_box from '@/components/posting_box.vue'
export default {
  components:{
    posting_box
  },
  name: poster,
  data() {
    return {
      posters: null,
      posting:1,
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
  margin: auto;
  margin-top: 40px;
  padding: 20px;
  width:600px;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.compte {
  margin:10px;
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.compte-banner{
  margin: auto;
  padding:20px;
  width:600px;
  height:50px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius:5px;
  background-color: #f2f2f2;
}
.compte-banner-round-pic{
width: 50px;
height: 50px;
border-radius:50%;
overflow: hidden;
}
.posts {
  padding:20px;
  width: 600px;
  height: 700px;
  margin: auto;
  margin-top: 50px;
  margin-bottom:30px;
  border-radius:20px;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  
}
.photo{
  width:550px;
  height:220px;
  margin:auto;
  position: relative;
  top:20px;
  object-fit: contain;

  border-radius:20px;
  background-color: white;
}
.like-contenair{
  margin:auto;
  width: 350px;
  display: flex;
  justify-content: space-around;
  position: relative;
  bottom:20px;

}
.like-contenair-child{
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border:grey solid 1px;
  width:50px;
  height:50px;
  
}
#like:hover{
 box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; 
 background-color: rgb(191, 221, 178);
}
#dislike:hover{
 box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; 
 background-color:rgb(196, 143, 143) ;
}
.posts-comments{
  width:580px;
  height:100px;
  margin:10px;
  position: relative;
  top:30px;
  overflow:auto;
  background-color: white;
}
.posts-comments-child{
  margin:20px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
.commentaire {
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
  resize: none;
}
.form{
position:relative;
top:70px
}

</style>