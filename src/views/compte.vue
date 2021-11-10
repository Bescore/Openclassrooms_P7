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
                <input class="form-buttons-btns" type="submit" value="Modifier mon Nom"><br/>
                <input class="form-buttons-btns" type="submit" value="Modifier mon Prénom"><br/>
                <input class="form-buttons-btns" type="submit" value="Modifier mon Email"><br/>
                <label for="img">Modifier la photo</label>
                <input id="img" class="form-buttons-btns" type="file" accept="image/*">
                <input class="form-buttons-btns" type="submit" value="Désactiver mon compte">
            </form>
            <form class="form-inputs">
                <input class="form-buttons-inputs" type="textarea" name="nom"/>
                <input class="form-buttons-inputs" type="textarea" name="prénom"/>
                <input class="form-buttons-inputs" type="textarea" name="email"/>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss"  >
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