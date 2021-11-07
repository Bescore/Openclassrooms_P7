<template>
    <h1>Vos informations personelles</h1>
    <div class="actualite-contenair"><router-link class="actualite" to="/feed">Actualités</router-link></div>
    <div class="compte-contenair">
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
.compte-contenair{
    margin:auto;
    margin-top:20px;
    width: 650px;
    height:700px;
    border:springgreen solid;

}
</style>