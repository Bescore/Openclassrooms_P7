<template>
    <h1>Vos informations personelles</h1>
    <div><router-link class="mur" to="/feed">Mur</router-link></div>
    <div class="compte-contenair">
        <div class="compte-contains">
            <img class='compte-contenair-photo' :src="User.photo"/>
            <div class="compte-contenair-photo-label">
                <div class="infos">Nom : {{User.nom}}</div>
                <div class="infos">Prénom : {{User.prenom}}</div>
                <div class="infos">Email : {{User.email}}</div>
            </div>
        </div>
        <div class="compte-contains-infos">
            <form class="form-buttons">
                <input @click="change_lastname()" class="form-buttons-btns" type="submit" value="Modifier mon Nom"><br/>
                <input @click="change_firstname()" class="form-buttons-btns" type="submit" value="Modifier mon Prénom"><br/>
                <input @click="change_email()" class="form-buttons-btns" type="submit" value="Modifier mon Email"><br/>
                <label for="img">Modifier la photo</label>
                <input @change='getInfos' id="img" class="form-buttons-btns" type="file" accept=".gif,.jpg,.jpeg,.png">
                <input  @click="change_image()" class="form-buttons-btns" type="submit" value="Changer de photo">
            </form>
            <form class="form-inputs">
                <input  id="Newname" class="form-buttons-inputs" type="textarea" placeholder="Saisir les nouvelles informations ici" name="nom"/>
                <input  id="Firstname" class="form-buttons-inputs" type="textarea" placeholder="Saisir les nouvelles informations ici" name="prénom"/>
                <input id="email" class="form-buttons-inputs" type="textarea" placeholder="Saisir les nouvelles informations ici" name="email"/>
            </form>
        </div>
    </div>
</template>

<script>
import formData from "form-data";
import axios from "axios";
export default {
  data(){
    return{
      User:1,
      Inf:null,
    }
  },
  mounted(){
axios.post("user",{
  userid:localStorage.getItem('secret')
})
.then((response)=>{
this.User=response.data[0];
console.log(response)
})
.catch(err=>{console.log(err)})


  },
methods:{
  getInfos(event) {
      this.Inf = event.target.files[0];
      console.log(this.Inf)
    },
    async change_image(){
      console.log(this.Inf)
     const formdata = new formData();
      formdata.append("image", this.Inf, this.Inf.name);
      formdata.append("userid",localStorage.getItem('secret'))
      axios
        .put("compte", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          alert(error);
        });
    },
    async change_email(){
      event.preventDefault()
      await axios.put("user",{
     email:document.getElementById('email').value
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
    async change_firstname(){
      event.preventDefault()
      await axios.put("user",{
     prenom:document.getElementById('Firstname').value
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
    async change_lastname(){
      event.preventDefault()
      await axios.put("user",{
     nom:document.getElementById('Newname').value
    })
    .then((response)=>{
      console.log(response);
    }),(error)=>{
      console.log(error)
    }
    },
}
}
</script>

<style lang="scss" scoped  >
.actualite-contenair{
    margin:auto;
    align-items: center;
    justify-content: center;
    width:150px;
    height:30px;
    border-radius: 30px;
    display:flex;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    
}
.mur {
    box-shadow: 3px 4px 0px 0px #1564ad;
	background:linear-gradient(to bottom, #79bbff 5%, #9ba9b8 100%);
	background-color:#79bbff;
	border-radius:5px;
	border:1px solid #337bc4;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	font-weight:bold;
	padding:12px 44px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528ecc;
  }
  .mur:hover {
	background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
	background-color:#378de5;
}
.mur:active {
	position:relative;
	top:1px;
}
.compte-contains{
    display: flex;
}
.compte-contenair{
    margin:auto;
    margin-top:20px;
    width: 850px;
    height:730px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    border-radius:5px;
    background-color: #f2f2f2;
}
.compte-contenair-photo{
    width:300px;
    height:300px;
    border-radius:50%;
    position: relative;
    left:50px;
    top:50px;
    object-fit: cover;
}
.compte-contenair-photo-label{
width:400px;
height: 300px;
position: relative;
left:110px;
top:50px;

}
.compte-contains-infos{
width:800px;
height:350px;
position: relative;
left:20px;
top:90px;
display: flex;
justify-content: center;
align-items: center;
}
.infos{
    text-align: left;
    margin: 60px;
    margin-top:60px;
    
}
.form-buttons{
    
    width:400px;
    height: 300px;
    display: flex;
    flex-direction: column;
}
.form-buttons-btns{
    margin:5px;
    border-radius:5px;
    height:100px;
}
.form-inputs{
    margin:auto;
    margin-top:15px;
    display: flex;
    flex-direction: column;
}
.form-buttons-inputs{
    width: 340px;
     margin:15px;
    border-radius:5px;
    height:30px;
}

</style>