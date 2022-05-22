<template>
	<div>
		<img
			tabindex="0"
			class="groupopict"
			src="@\assets\icon-left-font-monochrome-black.png"
			alt="groupomania"
		/>
		<h1>{{ inscrireinput }}</h1>
		<form @submit.stop.prevent="submit">
			<label for="email">Email :</label>
			<br />
			<input
				class="email"
				v-model="email"
				type="email"
				id="email"
				name="email"
				required
			/>
			<br />
			<label for="password">Mot de passe :</label>
			<br />
			<input
				v-model="password"
				class="password"
				type="password"
				id="password"
				name="password-name"
				required
			/>
			<br />
			<label for="nom">Nom :</label>
			<br />
			<input
				class="password"
				v-model="nom"
				type="text"
				id="nom"
				name="nom-name"
				required
			/>
			<br />
			<label for="Prenom">Prénom :</label>
			<br />
			<input
				v-model="prenom"
				class="password"
				type="text"
				id="Prenom"
				name="Prenom-name"
				required
			/>
			<br />
			<br />
			<input
				class="validate"
				@click="handleSubmit()"
				type="submit"
				value="Connexion"
				name="disable-Btn"
				disabled="disabled"
				id="sub"
			/>
		</form>
	</div>
</template>

<script>
	import "../views/axios";
	import axios from "axios";
	export default {
		name: "MaInscrire",
		data() {
			return {
				email: "",
				password: "",
				nom: "",
				prenom: "",
			};
		},
		props: {
			inscrireinput: String,
		},
		mounted() {
			this.hello();
		},
		methods: {
			hello() {
				document.getElementById("email").addEventListener("input", function () {
					if (document.getElementById("email").value.length > 0) {
						document.getElementById("sub").disabled = false;
					} else {
						document.getElementById("sub").disabled = true;
					}
				}),
					document
						.getElementById("password")
						.addEventListener("input", function () {
							if (document.getElementById("password").value.length > 0) {
								document.getElementById("sub").disabled = false;
							} else {
								document.getElementById("sub").disabled = true;
							}
						});
				document.getElementById("nom").addEventListener("input", function () {
					if (document.getElementById("nom").value.length > 0) {
						document.getElementById("sub").disabled = false;
					} else {
						document.getElementById("sub").disabled = true;
					}
				});
				document
					.getElementById("Prenom")
					.addEventListener("input", function () {
						if (document.getElementById("Prenom").value.length > 0) {
							document.getElementById("sub").disabled = false;
						} else {
							document.getElementById("sub").disabled = true;
						}
					});
			},
			handleSubmit() {
				event.preventDefault();
				const data = {
					email: this.email,
					password: this.password,
					nom: this.nom,
					prenom: this.prenom,
				};
				const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				const regex = reg.test(this.email);
				if (
					data.email === "" ||
					data.password === "" ||
					data.nom === "" ||
					data.prenom === "" ||
					regex == false
				) {
					alert("données incorrectes");
				} else {
					setTimeout(function () {
						location.reload();
					}, 100);
					axios
						.post("auth/signup", data)
						.then((response) => {
							if (response.data=="email présent dans la base") {
								alert("cet email est déjà utilisé")
							}else{
							localStorage.setItem(
								"secret",
								response.data.userId[0].idutilisateurs
							),
								localStorage.setItem("token", response.data.token);
							this.$router.push("/");
							alert("l'inscription s'est bien passé, connectez vous !")
						}})
						.catch((err) => {
							console.log(err + " " + "envoi du login n'a pas aboutie");
						});
				
				}
			},
		},
	};
</script>
<style scoped></style>
