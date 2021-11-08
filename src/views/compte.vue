<template>
    <h1>Vos informations personelles</h1>
    <div class="actualite-contenair"><router-link class="actualite" to="/feed">Actualités</router-link></div>
    <div class="compte-contenair">
        <div class="compte-contains">
            <img class='compte-contenair-photo' src="@\assets\user-icon.png"/>
            <div class="compte-contenair-photo-label">
                <div class="infos">Nom :</div>
                <div class="infos">Prénom :</div>
                <div class="infos">Email :</div>
            </div>
        </div>
        <div class="compte-contains-infos">
            <form class="form-buttons">
                <input class="form-buttons-btns" type="submit" value="Modifier votre Nom">
                <input class="form-buttons-btns" type="submit" value="Modifier votre Prénom">
                <input class="form-buttons-btns" type="submit" value="Modifier votre Email">
                <label for="img">Modifier la photo</label>
                <input id="img" class="form-buttons-btns" type="file" accept="image/*">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang=scss >
.actualite-contenair{
    margin:auto;
    align-items: center;
    justify-content: center;
    width:150px;
    height:30px;
    border-radius: 30px;
    border:purple solid;
    display:flex;
    
}
.actualite {
    font-weight: bold;
    color: #15171a;
    text-decoration: none;
  }
.compte-contains{
    display: flex;
}
.compte-contenair{
    margin:auto;
    margin-top:20px;
    width: 850px;
    height:700px;
    border:springgreen solid;

}
.compte-contenair-photo{
    width:300px;
    height:300px;
    border: hotpink solid ;
    border-radius:50%;
    position: relative;
    left:50px;
     top:50px;
}
.compte-contenair-photo-label{
width:400px;
height: 300px;
border: blue solid;
position: relative;
left:110px;
top:50px;
}
.compte-contains-infos{
width:800px;
height:290px;
border:yellow solid;
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
    margin-top:70px;
    
}
.form-buttons{
    width:300px;
    height: 250px;
    border: red solid;
    display: flex;
    flex-direction: column;
}
.form-buttons-btns{
    margin:17px;
}


</style>