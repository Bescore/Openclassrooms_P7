<template>
	<form class="create-posts-contains">
		<div class="create-posts-contains-inputs">
			<textarea
				v-model="titre"
				id="post_title"
				class="create-posts-contains-inputs-title"
				placeholder="Ajouter un titre à votre post"
			></textarea>
			<textarea
				v-model="post_body"
				id="post_body"
				class="create-posts-contains-inputs-commentaires"
				placeholder="Réagissez ici!"
			></textarea>
			<label for="image">Ajoutez une photo, une image</label>
			<input id="image" type="file" @change="sentImage" accept=".jpg, .jpeg, .png, .gif" />
			<input
				@click="addpost"
				class="create-posts-contains-inputs-btn"
				type="submit"
				value="Créer Post !"
				name="addpost"
			/>
		</div>
	</form>
</template>

<script>
import formData from "form-data";
import axios from "axios";
export default {
	name: "posting",
	data() {
		return {
			fileselect: null,
			titre: null,
			post_body: null,
		};
	},
	methods: {
		sentImage(event) {
			this.fileselect = event.target.files[0];
			console.log(this.fileselect);
		},
		path() {
			console.log(document.getElementById("image").value);
		},

		addpost() {
			event.preventDefault();
			const secret = localStorage.getItem("secret");
			if (document.getElementById("image").value !== "") {
				const formdata = new formData();
				formdata.append("image", this.fileselect, this.fileselect.name);
				formdata.append("titre", this.titre);
				formdata.append("post_body", this.post_body);
				formdata.append("userid", secret);
				console.log(formdata);
				axios
					.post("image", formdata, {
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
			} else {
				axios
					.post("image", {
						titre: this.titre,
						post_body: this.post_body,
						userid: secret,
					})
					.then((response) => {
						console.log(response);
					})
					.catch(function (error) {
						alert(error);
					});
			}
			setTimeout(function () {
				location.reload();
			}, 100);
		},
	},
};
</script>

<style scoped >
.create-posts-contains {
	padding: 20px;
	width: 600px;
	height: 300px;
	border-radius: 10px;
	margin: auto;
	margin-top: 40px;
	background-color: #f2f2f2;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.create-posts-contains-inputs {
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	background-color: #f2f2f2;
}
.create-posts-contains-inputs-title {
	resize: none;
	border: none;
}
.create-posts-contains-inputs-commentaires {
	height: 100px;
	resize: none;
	border: none;
}

.create-posts-contains-inputs-btn {
	box-shadow: 0px 0px 0px 2px #9fb4f2;
	background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
	background-color: #7892c2;
	border-radius: 10px;
	border: 1px solid #4e6096;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: Arial;
	font-size: 19px;
	padding: 12px 37px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #283966;
}
.create-posts-contains-inputs-btn:hover {
	background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
	background-color: #476e9e;
}
.create-posts-contains-inputs-btn:active {
	position: relative;
	top: 1px;
}
/*MEDIA QUERIES*/
@media screen and (max-width: 662px) {
	.create-posts-contains {
		padding: 20px;
		width: 300px;
		height: 300px;
		border-radius: 10px;
		margin: auto;
		margin-top: 40px;
		background-color: #f2f2f2;
		box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
			rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
			rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	}
}
@media screen and (max-width: 320px) {
	.create-posts-contains {
		width: 250px;
	}
}
</style>
