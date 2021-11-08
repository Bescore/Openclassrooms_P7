<template>   
<form class="create-posts-contains">
    <div class="create-posts-contains-inputs">
    <textarea class="create-posts-contains-inputs-commentaires" placeholder= "réagissez ici!"></textarea>
    <label for="photo">Ajoutez une photo, un fichier .gif par exemple</label>
    <input id="photo" type="file" accept=".png,.jpeg,.jpg,.gif"/>
    <input type="submit" value="Créer Post !"/>
    </div>
</form>   
</template>

<script>
export default {
    name:'posting_box',
    
}
</script>

<style scoped>
.create-posts-contains{
    padding: 20px;
    width: 600px;
    height: 400px;
    border:red solid;
    border-radius:20px;
    margin:auto;
    
    
}
.create-posts-contains-inputs{
    height: 400px;
    border: indianred solid;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.create-posts-contains-inputs-commentaires{
height:200px;
resize: none;
}
</style>