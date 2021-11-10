<template>
  <div class="compte-banner">
    <img class="compte-banner-round-pic" src="@/assets/user-icon.png"/>
  <router-link class="compte" to="/compte">Mon Compte</router-link>
  <router-link class="compte" to="/">Se déconnecter</router-link>
  </div>
  <div>
    <div class="actualite">Fil d'actualité aujourd'hui</div>
    <font-awesome-icon  class=" swingimage" icon="bell" size="2x" />
  </div>
  <div>
  <div class="posts" :key="index" v-for="(posting, index) in posting">
    <div>Titre</div>
    <img src="@\assets\post.jpg" class="photo"/>
    <div class="posts-comments"><div class="posts-comments-child" :key="index" v-for="(posters, index) in posters">{{posters.name}}</div></div>
    <div class="posts-comments"><div class="posts-comments-child" :key="index" v-for="(commentaires, index) in commentaires">{{commentaires.commentaires}}</div></div>
    <form class="form">
      <div class="like-contenair">
      <div  id="like" @click="like" class="like-contenair-child"><font-awesome-icon icon="thumbs-up" size="lg" /></div>
      <div id="dislike" @click="dislike" class="like-contenair-child"><font-awesome-icon icon="thumbs-down" size="lg" /></div>
      </div>
      <label class="commentaire-label" for="comments">Ajouter un commentaire :</label>
    <div><br/>
      <textarea
        class="commentaire"
        name="commentaires"
        id="comments"
      ></textarea>
    </div>
    <input class="add-comments-btn" @click='addcomment' type="submit" value="Commenter" />
  </form>
  </div>
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
      commentaires:null,
      posters: null,
      posting:1,
    };
  },
  async posting() {
    await axios.get("https://localhost:3000/feed/posts")
    .then((response) => {
      this.posting = response.data;
      console.log(this.posting);
    })
    .catch(error=>console.log(error));
    
  },
  async commentaires() {
    await axios.get("https://localhost:3000/feed/commentaires")
    .then((response) => {
      this.commentaires = response.data;
      console.log(this.commentaires);
    })
    .catch(error=>console.log(error));
    
  },
  async mounted() {
    await axios.get("https://localhost:3000/feed/posters")
    .then((response) => {
      this.commentaires = response.data;
      console.log(this.commentaires);
    })
    .catch(error=>console.log(error));
    
  },
  methods:{
    async dislike(){
      event.preventDefault()
      await axios.post("https://localhost:3000/feed/dislike",{
     dislike:1
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
    async like(){
      event.preventDefault()
      await axios.post("https://localhost:3000/feed/like",{
     like:1
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
    async addcomment(){
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


<style lang="scss" scoped>
@mixin bounce{
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-transform-origin: center bottom;
  -ms-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  }
  40%, 43% {
  -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  -webkit-transform: translate3d(0, -30px, 0);
  transform: translate3d(0, -30px, 0);
  }
  70% {
  -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  -webkit-transform: translate3d(0, -15px, 0);
  transform: translate3d(0, -15px, 0);
  }
  90% {
  -webkit-transform: translate3d(0,-4px,0);
  transform: translate3d(0,-4px,0);
  }
  }
  
  @keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  }
  40%, 43% {
  -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  -webkit-transform: translate3d(0, -30px, 0);
  transform: translate3d(0, -30px, 0);
  }
  70% {
  -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  -webkit-transform: translate3d(0, -15px, 0);
  transform: translate3d(0, -15px, 0);
  }
  90% { -webkit-transform: translate3d(0,-4px,0); transform: translate3d(0,-4px,0);
  }
}

.actualite {
  border-radius:5px;
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
  z-index:1;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
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
  height: 720px;
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
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius:20px ;
  
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
  width:50px;
  height:50px;
  
}
#like:hover{
color:rgb(118, 199, 83) ;
@include bounce;

}
#dislike:hover{
color: rgb(173, 74, 74);
@include bounce;
}
.add-comments-btn{
border-radius: 5px ;
height:40px;
width:200px;
background-color: rgb(213, 223, 233);

}
.posts-comments{
  width:550px;
  height:100px;
  margin:auto;
  margin-top:10px;
  position: relative;
  top:30px;
  overflow:auto;
  background-color: #dbbebe;
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
  border:none;
}
.form{
position:relative;
top:70px
}

@-webkit-keyframes swinging{
    0%{-webkit-transform: rotate(20deg);}
    50%{-webkit-transform: rotate(-15deg)}
    100%{-webkit-transform: rotate(20deg);}
}
 
@keyframes swinging{
    0%{transform: rotate(20deg);}
    50%{transform: rotate(-15deg)}
    100%{transform: rotate(20deg);}
}
 
.swingimage{
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-animation: swinging 1.5s ease-in-out forwards infinite;
    animation: swinging 1.5s ease-in-out forwards infinite;
    
}

</style>