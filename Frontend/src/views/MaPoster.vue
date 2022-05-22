<template>
	<div>
		<div class="test"></div>
		<div class="compte-banner">
			<img
				id="roundpic"
				class="compte-banner-round-pic"
				:src="accountOwner.photo"
				alt="utilisateur"
			/>
			<router-link class="compte" to="/compte">Mon Compte</router-link>
			<router-link @click="logOut" class="compte" to="/"
				>Se déconnecter</router-link
			>
			<div v-if="this.accountOwner.isAdmin == 1" id="mod" class="moderate">
				M
			</div>
		</div>
		<div>
			<div tabindex="0" class="actualite">
				Bonjour {{ accountOwner.prenom }} , votre mur d'actualité aujourd'hui !
			</div>
		</div>
		<div>
			<div class="posts" :key="index" v-for="(posted, index) in posted">
				<div tabindex="0" class="title-font">{{ posted.titre }}</div>
				<div>
					<img
						tabindex="0"
						:src="posted.post_img"
						id="posted_img"
						class="photo"
						alt="image posté"
					/>
				</div>
				<div class="posts-comments">
					<div tabindex="0" class="posts-comments-child">
						{{ posted.post_body }}
					</div>
				</div>
				<div tabindex="0" id="post-body" class="posts-comments-2">
					<div
						class="posts-comments-child-2"
						:key="comindex"
						v-for="(commentaires, comindex) in commentaires"
					>
						<div class="round-name">
							<input
								v-if="this.accountOwner.isAdmin == 1"
								@click="delComment(commentaires.idcomments)"
								value="x"
								type="button"
							/>
							<img
								class="photo-comments"
								:src="commentaires.photo"
								alt="utilisateur en chat"
							/>
							{{ commentaires.prenom }}
							à
							<div class="date-time">{{ commentaires.dates.slice(0, 19).replace('T', ' / ')}} :</div>
						</div>
						{{ commentaires.commentaires }}
					</div>
				</div>

				<form class="form">
					<label tabindex="0" class="commentaire-label" for="comms"
						>Discutez entre collègues :</label
					>
					<div>
						<br />
						<textarea v-model="coms" class="commentaire" id="comms"></textarea>
					</div>
					<input
						class="add-comments-btn"
						@click="addcomment(posted.idposts)"
						type="submit"
						value="Dire"
					/>
					<input
						v-if="
							this.accountOwner.isAdmin == 0 ||
							this.accountOwner.isAdmin == null
						"
						id="user-del"
						class="del-btn"
						type="submit"
						value="Supprimer post"
						@click="delPost(posted.idposts)"
					/>
					<input
						v-if="this.accountOwner.isAdmin == 1"
						id="admin_del"
						@click="AdmindelPost(posted.idposts)"
						class="del-btn"
						type="submit"
						value="Suppression modérateur"
					/>
					<div tabindex="0" class="created-by">
						post créé par: {{ posted.prenom }}
						<img
							class="post-roundpic"
							:src="posted.photo"
							alt="créateur du post"
						/>
					</div>
				</form>
			</div>
		</div>
		<posting_box></posting_box>
		<sidebar v-if="this.accountOwner.isAdmin == 1"></sidebar>
		<sidebar_left v-if="this.accountOwner.isAdmin == 1"></sidebar_left>
		<sidebar_noneadmin
			v-if="this.accountOwner.isAdmin == 0 || this.accountOwner.isAdmin == null"
		></sidebar_noneadmin>
	</div>
</template>

<script>
	import router from "@/router/index.js";
	import axios from "axios";
	import poster from "@/views/MaPoster.vue";
	import posting_box from "@/components/MaPosting_box.vue";
	import sidebar from "@/components/MaSidebar.vue";
	import sidebar_left from "@/components/MaSidebar_left.vue";
	import sidebar_noneadmin from "@/components/MaSidebar_noneadmin.vue";
	export default {
		components: {
			posting_box,
			sidebar,
			sidebar_left,
			sidebar_noneadmin,
		},
		name: poster,
		data() {
			return {
				idvalue: null,
				commentaires: null,
				posters: null,
				posted: null,
				user: null,
				like: null,
				accountOwner: null,
				coms: "",
			};
		},
		created() {
			axios
				.post("user", {
					userid: localStorage.getItem("secret"),
				})
				.then((response) => {
					//photo du mur//infos users
					this.accountOwner = response.data[0];
					if (this.accountOwner.photo == "") {
						document.getElementById("roundpic").style.display = "none";
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},

	

		mounted() {
			axios
				.get("feed/posters")
				.then((response) => {
					///COMMENTAIRES DES POSTS
					this.commentaires = response.data;
					console.log(response.data)
				})
				.catch((error) => {
					console.log(error);
				}),
				axios
					.get("feed/post")
					.then((response) => {
						//LES POSTS
						this.posted = response.data;
					})
					.catch((error) => {
						console.log(error, "problème fonction posting");
					});
			setInterval(function () {
				axios
					.post("feed/connect_verify", {
						token: localStorage.getItem("token"),
					})
					.then((response) => {
						console.log(response.data);
						if (response.data == 0) {
							router.push("/");
						}
					})
					.catch(function (error) {
						alert(error);
					});
			}, 600000);
		},

		methods: {
			logOut() {
				localStorage.removeItem("secret");
			},
			addcomment(idpost) {
				event.preventDefault();
				axios
					.post("feed/comment", {
						commentaire: this.coms,
						userid: parseInt(localStorage.getItem("secret")),
						idpost: idpost,
					})
					.then((response) => {
						console.log(response);
					})
					.catch(function (error) {
						alert(error);
					});
				setTimeout(function () {
					location.reload();
				}, 20);
			},
			delPost(postid) {
				event.preventDefault();
				axios
					.delete("feed/delete", {
						data: {
							postid: postid,
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
			AdmindelPost(postid) {
				event.preventDefault();
				axios
					.delete("feed/admin/delete", { data: { postid: postid } })
					.then((response) => {
						console.log(response);
					})
					.catch(function (error) {
						alert(error);
					});
				setTimeout(function () {
					location.reload();
				}, 20);
			},
			delComment(idcomments) {
				event.preventDefault();
				axios
					.delete("feed/admin/del_comment", {
						data: { idcomments: idcomments },
					})
					.then((response) => {
						console.log(response);
					})
					.catch(function (error) {
						alert(error);
					});
				setTimeout(function () {
					location.reload();
				}, 20);
			},
		},
	};
</script>

<style lang="scss" scoped>
	*::-webkit-scrollbar {
		width: 7px;
	}

	*::-webkit-scrollbar-track {
		background: #e7e4e4;
	}

	*::-webkit-scrollbar-thumb {
		background-color: rgb(94, 94, 119);
		border-radius: 20px;
	}

	.actualite {
		border-radius: 5px;
		font-weight: bold;
		margin: auto;
		margin-top: 40px;
		padding: 20px;
		width: 600px;
		background-color: #f2f2f2;
		box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
			rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
			rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	}
	.compte {
		box-shadow: 3px 4px 0px 0px #899599;
		background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
		background-color: #ededed;
		border-radius: 15px;
		border: 1px solid #d6bcd6;
		display: inline-block;
		cursor: pointer;
		color: #03151a;
		font-family: Arial;
		font-size: 17px;
		padding: 7px 25px;
		text-decoration: none;
		text-shadow: 0px 1px 0px #e1e2ed;
		margin: 5px;
	}
	.compte:hover {
		background: linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
		background-color: #bab1ba;
	}
	.compte:active {
		position: relative;
		top: 1px;
	}
	.moderate {
		border: solid 2px;
		border-image: linear-gradient(to right, darkblue, darkorchid) 1;
		width: 20px;
		height: 20px;
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.compte-banner {
		z-index: 50;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		margin: auto;
		padding: 20px;
		width: 600px;
		height: 50px;
		box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
			rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
			rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		border-radius: 5px;
		background-color: #f2f2f2;
	}
	.compte-banner-round-pic {
		position: relative;
		right: 50px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		object-fit: cover;
		animation: bounce 0.7s ease infinite;
	}

	.posts {
		padding: 20px;
		border-radius: 20px;
		width: 600px;
		height: 920px;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 30px;
		background-color: #f2f2f2;
		box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
			rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
			rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	}
	.post-roundpic {
		width: 30px;
		height: 30px;
		object-fit: cover;
		border-radius: 50%;
		position: relative;
		left: 10px;
	}
	.title-font {
		font-size: 23px;
		overflow: auto;
	}

	.photo {
		width: 100%;
		height: 320px;
		margin: auto;
		position: relative;
		top: 20px;
		object-fit: contain;
	}

	.add-comments-btn {
		margin: auto;
		margin-right: 10px;
		margin-left: 10px;
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
	.created-by {
		font-size: 15px;
		margin: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.add-comments-btn:hover {
		background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
		background-color: #476e9e;
	}
	.add-comments-btn:active {
		position: relative;
		top: 1px;
	}
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
		background: linear-gradient(to bottom, #eb2a2a 5%, #e04822 100%);
		background-color: #9e5447;
	}
	.del-btn:active {
		position: relative;
		top: 1px;
	}
	.posts-comments {
		font-size: 17px;
		width: 550px;
		height: 90px;
		margin: auto;
		margin-top: 10px;
		position: relative;
		top: 30px;
		overflow: auto;
		border-top: rgb(214, 206, 206) ridge 2px;
		border-bottom: rgb(214, 206, 206) ridge 2px;
	}
	.posts-comments-2 {
		font-size: 13px;
		width: 550px;
		margin: auto;
		margin-top: 30px;
		position: relative;
		top: 30px;
		overflow: auto;
		border-radius: 5px;
	}
	#post-body {
		height: 130px;
	}
	.posts-comments-child {
		margin: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.round-name {
		display: flex;
		align-items: center;
		position: relative;
		right: 10px;
	}
	.photo-comments {
		margin: 10px;
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}
	.posts-comments-child-2 {
		margin-left: 10px;
		height: 40px;
		display: flex;
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.commentaire {
		width: 400px;
		height: 50px;
		margin-bottom: 10px;
		resize: none;
		border: none;
	}
	.form {
		position: relative;
		top: 70px;
	}

	@keyframes bounce {
		from {
			top: 0px;
		}
		60% {
			top: 5px;
		}
		to {
			top: 0px;
		}
	}

	.test {
		background-color: rgb(38, 38, 233);
		opacity: 0.3;
		margin: auto;
		border-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: fixed;

		z-index: -2;
		animation: myAnim 3s ease 0s infinite alternate backwards;
	}
	@keyframes myAnim {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 0.4;
		}
	}
	.date-time {
		margin-left: 3px;
	}

	/*MEDIA QUERIES*/
	@media screen and(max-width:662px) {
		.posts {
			padding: 20px;
			width: 290px;
			height: 860px;
			margin: auto;
			margin-top: 50px;
			margin-bottom: 30px;
			border-radius: 105x;
			background-color: #f2f2f2;
		}
		.photo {
			width: 200px;
			height: 200px;
		}
		.posts-comments {
			width: 280px;
		}
		.commentaire {
			width: 280px;
		}
		.actualite {
			border-radius: 5px;
			font-weight: bold;
			margin: auto;
			margin-top: 40px;
			padding: 20px;
			width: 300px;
		}
		.compte-banner {
			width: 310px;
		}
		.compte-banner-round-pic {
			position: relative;
			right: 10px;
			width: 50px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			object-fit: cover;
			animation: bounce 0.7s ease infinite;
			display: none;
		}
		#delete {
			margin-top: 20px;
			background-color: green;
			background: linear-gradient(to bottom, #c03a18 5%, #c71212 100%);
			border: rgb(114, 114, 119);
		}
		.add-comments-btn {
			margin: 20px;
			width: 150px;
		}
		#post-body {
			width: 300px;
			flex: wrap;
		}
		#admin_del {
			margin-left: 0px;
		}
		.moderate {
		border: solid 2px;
		border-image: linear-gradient(to right, darkblue, darkorchid) 1;
		width: 20px;
		height: 20px;
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		margin-left:10px;
	}
	}
	@media screen and (max-width: 350px) {
		.posts {
			width: 250px;
			height: 890px;
		}
		.compte-banner-round-pic {
			display: none;
		}
		.compte-banner {
			width: 254px;
		}
		.actualite {
			width: 250px;
		}
		.posts-comments {
			width: 260px;
		}
		.commentaire {
			width: 230px;
		}

		#post-body {
			width: 245px;
			flex: wrap;
		}
		#admin_del {
			margin-left: -17px;
		}
		.moderate {
	display: none;
	}
	}
</style>
