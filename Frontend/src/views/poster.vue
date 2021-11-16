<template >
  <div class="compte-banner">
    <img class="compte-banner-round-pic" :src="accountOwner.photo"/>
  <router-link class="compte" to="/compte">Mon Compte</router-link>
  <router-link @click="logOut" class="compte" to="/">Se déconnecter</router-link>
  </div>
  <div>
    <div class="actualite"> Bonjour {{accountOwner.prenom}}, votre mur d'actualité aujourd'hui ! </div>
    <font-awesome-icon  class=" swingimage" icon="bell" size="lg" />
  </div>
  <div>
  <div class="posts" :key="index" v-for="(posted, index) in posted">
    <div>{{posted.titre}}</div>
    <img :src="posted.post_img"  class="photo"/>
    <div  class="posts-comments"><div  class="posts-comments-child">{{posted.post_body}}</div></div>
    <div id="post-body" class="posts-comments-2"><div class="posts-comments-child-2" :key="index" v-for="(commentaires, index) in commentaires">{{commentaires.commentaires}}</div></div>
    <div class="like-count-box">
    <div>{{like.likes}}</div>
      <div>{{like.dislikes}}</div>
      </div>
    <form  class="form">
      <div class="like-contenair">
      <div  id="like" @click="like"  class="like-contenair-child"><font-awesome-icon icon="thumbs-up" size="3x" /></div>
      <div id="dislike" @click="dislike" class="like-contenair-child"><font-awesome-icon icon="thumbs-down" size="3x" /></div>
      </div>
      <label class="commentaire-label" for="comments">Ajouter un commentaire :</label>
    <div><br/>
      <textarea
      v-model="coms"
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
      idvalue:null,
      commentaires:null,
      posters: null,
      posted:null,
      user:null,
      like:null,
      accountOwner:null,
      coms:''
    };
  },
   created(){
    axios.post('user',{
      userid:localStorage.getItem('secret')
    })
    .then((response)=>{                          //photo du mur
      this.accountOwner=response.data[0];
      console.log(response.data[0]);
    }),(error)=>{
      console.log(error)
    }
    
  },

  async commentaires() {
    await axios.get("feed/commentaires")
    .then((response) => {
      this.commentaires = response.data;
      console.log(this.commentaires);
    })
    .catch(error=>console.log(error));
    
  },
  async beforeMount() {
    await axios.get("feed/post")
    .then((response) => {                       //LES POSTS
      this.posted = response.data;
      this.idvalue=this.posted.idposts
      console.log(this.posted);
    })
    .catch(error=>console.log(error,"problème fonction posting"));
  },
  async mounted() {
    await axios.get("feed/posters")
    .then((response) => {                         ///COMMENTAIRES DES POSTS
      this.commentaires = response.data;
    })
    .catch(error=>console.log(error)),
     this.likers()                                     //tableau like/dislike
  },

  methods:{
    logOut(){
      localStorage.removeItem('secret')
    },
     likers(){
      event.preventDefault()
       axios.get("feed/like")
    .then((response)=>{
      this.like=response.data[0],
      console.log(this.like)
    }),(error)=>{
      console.log(error)
    }
    },
    async dislike(){
      event.preventDefault()
      await axios.post("feed/dislike",{
     dislike:1
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
    async addcomment(){
      await axios.post("feed/comment",{
      commentaire: this.coms
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    }
  },
};
</script>


<style lang="scss" scoped>

*::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar-track {
  background: #e7e4e4;
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(94, 94, 119);
  border-radius: 20px;
}
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
  box-shadow: 3px 4px 0px 0px #899599;
	background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
	background-color:#ededed;
	border-radius:15px;
	border:1px solid #d6bcd6;
	display:inline-block;
	cursor:pointer;
	color:#3a8a9e;
	font-family:Arial;
	font-size:17px;
	padding:7px 25px;
	text-decoration:none;
	text-shadow:0px 1px 0px #e1e2ed;
  margin: 5px;
}
.compte:hover {
	background:linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
	background-color:#bab1ba;
}
.compte:active {
	position:relative;
	top:1px;
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
  justify-content: space-evenly;
  align-items: center;
  border-radius:5px;
  background-color: #f2f2f2;
}
.compte-banner-round-pic{
position: relative;
right:50px;
width: 50px;
height: 50px;
border-radius:50%;
overflow: hidden;
object-fit: cover;
}

.posts {
  padding:20px;
  width: 600px;
  height: 1000px;
  margin: auto;
  margin-top: 50px;
  margin-bottom:30px;
  border-radius:20px;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  
}
.photo{
  width:550px;
  height:420px;
  margin:auto;
  position: relative;
  top:20px;
  object-fit: cover;
  
  border-top-left-radius: 20px;
  border-top-right-radius:20px ;
  
}
.like-count-box{
display: flex;
justify-content: space-evenly;
align-items: center;
}
.like-contenair{
  margin:auto;
  width: 550px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
  font-size:20px;
  width:550px;
  height:150px;
  margin:auto;
  margin-top:10px;
  position: relative;
  top:30px;
  overflow:auto;
  border: 1px rgb(214, 209, 209) solid;
  border-radius:40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.posts-comments-2{
   width:550px;
  height:150px;
  margin:auto;
  margin-top:10px;
  position: relative;
  top:30px;
  overflow:auto;
  border-radius:5px;

}
#post-body{
  height:100px;
}
.posts-comments-child{
  margin:20px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  
}
.posts-comments-child-2{

height: 30px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  text-justify: center;
  
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