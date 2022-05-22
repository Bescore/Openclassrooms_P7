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
	import connecter from "@/components/MaConnecter.vue";
	export default {
		name: "MaConnection",
		components: {
			connecter,
		},
	};
</script>
