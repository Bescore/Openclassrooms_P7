<template>
	<form class="supp">
		<label for="delete_input">
			Supprimer mon post ? quel est son titre ?
			<br />
		</label>
		<input  v-model="del_input_value" id="delete_input" name="delete_input" type="textarea" />
		<input @click="delPost()" class="del-btn" type="submit" value="Supprimer" />
	</form>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			del_input_value: "",
		};
	},
	methods: {
		delPost() {
			event.preventDefault();
			axios
				.delete("feed/delete", {
					data: {
						titre: this.del_input_value,
						userid: localStorage.getItem("secret"),
					},
				})
				.then((response) => {
					console.log(response.data);

					if (response.data == "nope") {
						alert(
							" vous ne pouvez pas supprimer un post que vous n'avez pas créé !"
						);
					}
				}),
				(error) => {
					console.log(error);
				};
			setTimeout(function () {
				location.reload();
			}, 20);
		},
	},
};
</script>
<style>
.del-btn {
	margin-left: 20px;
	margin-top: 20px;
	box-shadow: 0px 0px 0px 2px #9fb4f2;
	background: linear-gradient(to bottom, #ce2121 5%, #e2480b 100%);
	background-color: #da4012;
	border-radius: 10px;
	border: 1px solid #96594e;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: Arial;
	font-size: 19px;
	padding: 9px 37px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #283966;
}
.del-btn:hover {
	background: linear-gradient(to bottom, #eb380c 5%, #be350b 100%);
	background-color: #9e7847;
}
.del-btn:active {
	position: relative;
	top: 1px;
}
#delete_input {
	height: 28px;
	width: 150px;
	margin: 10px;
}
.supp {
	margin-top: 50px;
	z-index: 1;
	position: -webkit-sticky;
	position: sticky;
	bottom: 00px;
}
</style>