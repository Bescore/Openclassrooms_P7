<template>
	<div class="home">
		<img
			tabindex="0"
			class="groupopict"
			src="@\assets\icon-above-font.png"
			alt="groupomania"
		/>
		<connecter msg="Connectez-vous !" />
	</div>
</template>

<script>
	// @ is an alias to /src
	import connecter from "@/components/connecter.vue";
	export default {
		name: "connection",
		components: {
			connecter,
		},
	};
</script>
