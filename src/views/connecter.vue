<template>
  <div class="home">
    <img class="groupopict" src="@\assets\icon-above-font.png">
    <connecter msg="Connectons-nous !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import connecter from '@/components/connecter.vue'

export default {
  name: 'connection',
  components: {
    connecter
  }
}
</script>
