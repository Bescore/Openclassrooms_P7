<template>
	<div>
		<h1>Vos informations personelles</h1>
		<div><router-link class="mur" to="/feed">Mur</router-link></div>
		<div class="compte-contenair">
			<div class="compte-contains">
				<img class="compte-contenair-photo" :src="User.photo" />
				<div class="compte-contenair-photo-label">
					<div class="infos">Nom : {{ User.nom }}</div>
					<div class="infos">Prénom : {{ User.prenom }}</div>
					<div class="infos">Email : {{ User.email }}</div>
				</div>
			</div>
			<div class="compte-contains-infos">
				<form class="form-buttons">
					<input
						@click="change_lastname()"
						class="form-buttons-btns"
						type="submit"
						value="Modifier mon Nom"
					/><br />
					<input
						@click="change_firstname()"
						class="form-buttons-btns"
						type="submit"
						value="Modifier mon Prénom"
					/><br />
					<input
						@click="change_email()"
						class="form-buttons-btns"
						type="submit"
						value="Modifier mon Email"
					/><br />
					<input
						@change="getInfos"
						id="img"
						class="form-buttons-btns"
						type="file"
						accept=".gif,.jpg,.jpeg,.png"
					/>
					<input
						@click="change_image()"
						class="form-buttons-btns"
						type="submit"
						value="Changer de photo"
					/>
				</form>
				<form class="form-inputs">
					<input
						id="Newname"
						class="form-buttons-inputs"
						type="textarea"
						placeholder="NOM"
						name="nom"
					/>
					<input
						id="Firstname"
						class="form-buttons-inputs"
						type="textarea"
						placeholder="PRÉNOM"
						name="prénom"
					/>
					<input
						id="email"
						class="form-buttons-inputs"
						type="textarea"
						placeholder="EMAIL"
						name="email"
					/>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import formData from "form-data";
import axios from "axios";
export default {
	data() {
		return {
			User: 1,
			Inf: null,
		};
	},
	mounted() {
		axios
			.post("user", {
				userid: localStorage.getItem("secret"),
			})
			.then((response) => {
				this.User = response.data[0];
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	methods: {
		getInfos(event) {
			this.Inf = event.target.files[0];
			console.log(this.Inf);
		},
		change_image() {
			console.log(this.Inf);
			const formdata = new formData();
			formdata.append("image", this.Inf, this.Inf.name);
			formdata.append("userid", localStorage.getItem("secret"));
			axios
				.put("compte", formdata, {
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
		},
		async change_email() {
			await axios
				.put("compte/changes", {
					email: document.getElementById("email").value,
					userid: localStorage.getItem("secret"),
				})
				.then((response) => {
					console.log(response);
				}),
				(error) => {
					console.log(error);
				};
		},
		async change_firstname() {
			await axios
				.put("compte/changes", {
					prenom: document.getElementById("Firstname").value,
					userid: localStorage.getItem("secret"),
				})
				.then((response) => {
					console.log(response);
				}),
				(error) => {
					console.log(error);
				};
		},
		async change_lastname() {
			await axios
				.put("compte/changes", {
					nom: document.getElementById("Newname").value,
					userid: localStorage.getItem("secret"),
				})
				.then((response) => {
					console.log(response);
				}),
				(error) => {
					console.log(error);
				};
		},
	},
};
</script>

<style lang="scss" scoped  >
.actualite-contenair {
	margin: auto;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 30px;
	border-radius: 30px;
	display: flex;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.mur {
	box-shadow: 3px 4px 0px 0px #1564ad;
	background: linear-gradient(to bottom, #79bbff 5%, #9ba9b8 100%);
	background-color: #79bbff;
	border-radius: 5px;
	border: 1px solid #337bc4;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: Arial;
	font-size: 17px;
	font-weight: bold;
	padding: 12px 44px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #528ecc;
}
.mur:hover {
	background: linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
	background-color: #378de5;
}
.mur:active {
	position: relative;
	top: 1px;
}
.compte-contains {
	display: flex;
}
.compte-contenair {
	margin: auto;
	margin-top: 20px;
	width: 850px;
	height: 730px;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	border-radius: 5px;
	background-color: #f2f2f2;
}
.compte-contenair-photo {
	width: 300px;
	height: 300px;
	border-radius: 50%;
	position: relative;
	left: 50px;
	top: 50px;
	object-fit: cover;
}
.compte-contenair-photo-label {
	width: 400px;
	height: 300px;
	position: relative;
	left: 110px;
	top: 50px;
}
.compte-contains-infos {
	width: 800px;
	height: 350px;
	position: relative;
	left: 20px;
	top: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.infos {
	text-align: left;
	margin: 60px;
	margin-top: 60px;
}
.form-buttons {
	width: 400px;
	height: 300px;
	display: flex;
	flex-direction: column;
}
.form-buttons-btns {
	margin: 5px;
	border-radius: 5px;
	height: 100px;
}
.form-inputs {
	margin: auto;
	margin-top: 15px;
	display: flex;
	flex-direction: column;
}
.form-buttons-inputs {
	width: 340px;
	margin: 15px;
	border-radius: 5px;
	height: 30px;
}
///MEDIA QUERIES///

@media screen and (max-width: 876px) {
	.compte-contenair {
		width: 95%;
		height: 1000px;
		display: flex;
	}
	.compte-contenair-photo-label {
		width: 350px;
		height: 400px;
		position: initial;
		left: 00px;
		top: 00px;
	}
	.compte-contains-infos {
		width: 800px;
		height: 350px;
		position: relative;
		left: -540px;
		top: 400px;
		display: initial;
	}
	@media screen and (max-width: 556px) {
		.compte-contenair {
			width: 95%;
			height: 1100px;
			display: flex;
		}
		.compte-contenair-photo-label {
			width: 350px;
			height: 400px;
			position: relative;
			left: -110px;
			top: 250px;
		}
		.compte-contains-infos {
			width: 800px;
			height: 350px;
			position: relative;
			left: -400px;
			top: 550px;
			display: initial;
		}
		.compte-contenair-photo {
			width: 200px;
			height: 200px;
			border-radius: 50%;
			position: relative;
			left: 150px;
			top: 50px;
			object-fit: cover;
		}
		.form-buttons {
			width: 200px;
			height: 300px;
			display: flex;
			flex-direction: column;
		}
		.form-buttons-btns {
			margin: 5px;
			border-radius: 5px;
			height: 100px;
		}
		.form-inputs {
			margin: auto;
			margin-top: 15px;
			display: flex;
			flex-direction: column;
		}
		.form-buttons-inputs {
			width: 200px;
			margin: 15px;
			border-radius: 5px;
			height: 30px;
		}
		.infos {
			width: 250px;
		}
	}
	@media screen and (max-width: 458px) {
		.compte-contenair-photo-label {
			width: 320px;
			height: 400px;
			position: relative;
			left: 00px;
			top: 230px;
			left: -200px;
		}
		.compte-contains-infos {
			width: 800px;
			height: 350px;
			position: relative;
			left: -260px;
			top: 600px;
			display: flex;
			flex-direction: column-reverse;
		}
		.infos {
			width: 250px;
		}
		.compte-contains {
			width: 300px;
		}
		.compte-contenair-photo-label {
			width: 350px;
			height: 400px;
			position: relative;
			left: -180px;
			top: 250px;
		}
		.compte-contenair-photo {
			width: 200px;
			height: 200px;
			border-radius: 50%;
			position: relative;
			left: 70px;
			top: 50px;
			object-fit: cover;
		}
		@media screen and (max-width: 320px) {
			.compte-contains-infos {
				left: -270px;
				top: 600px;
			}
			.compte-contenair-photo-label {
				width: 300px;
				height: 400px;
				position: relative;
				left: -210px;
				top: 250px;
			}
			.compte-contenair-photo {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				position: relative;
				left: 50px;
				top: 50px;
				object-fit: cover;
			}
		}
	}
}
</style>