<template>
	<div class="sidebar">
		<div>Membres actifs</div>
		<div :key="sideindex" v-for="(sideuser,sideindex) in sideuser">
			<img class="sidebar-pic" :src="sideuser.photo" alt="utilisateurs" />
			<div>{{sideuser.nom}} {{sideuser.prenom}}</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			sideuser: null,
		};
	},
	mounted() {
		axios
			.get("feed/user_list")
			.then((response) => {
				this.sideuser = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>

<style scoped>
.sidebar {
	opacity: 0;
	transition: 0.1s;
	border-radius: 10px;
	overflow: hidden;
	width: 70px;
	height: 930px;
	position: fixed;
	bottom: 0;
	right: 1px;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
	background-color: #f2f2f2;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.sidebar-pic {
	width: 30px;
	height: 30px;
	border-radius: 20px;
}
.sidebar:hover {
	z-index: 51;
	width: 180px;
	opacity: 1;
}
/*MEDIA QUERIES*/
@media screen and (max-width: 500px) {
	.sidebar {
		display: none;
	}
}
</style>