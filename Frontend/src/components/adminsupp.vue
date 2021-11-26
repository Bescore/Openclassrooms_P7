<template>
	<div>
		<form id="admin-deletepost">
			<label id="supp" for="delete_supp">
				Le titre du post à supprimer ?
				<br />
			</label>
			<input class="delete" v-model="delPostadmin" id="delete_supp" type="textarea" />
			<input @click="AdmindelPost()" class="del-btn" type="submit" value="Supprimer" />
		</form>
		<form id="admin-deletecomments">
			<label id="supp" for="delete_com">
				Supprimer un commentaire ? (copier/coller)
				<br />
			</label>
			<input class="delete" v-model="delCommentaire" id="delete_com" name="del_com" type="textarea" />
			<input @click="delComment()" class="del-btn" type="submit" value="Supprimer" />
		</form>
		<form id="admin-accoutnactivate">
			<label id="supp" for="delete_prenom">
				Désactiver ou activer le compte de (prénom) ?
				<br />
			</label>
			<input class="delete" v-model="activateAccount" id="delete_prenom" name="delete_prenom" type="textarea" />
			<input @click="activeAcc()" class="del-btn" type="submit" value="Activer/Désactiver" />
		</form>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			delPostadmin: "",
			delCommentaire: "",
			activateAccount: "",
		};
	},
	methods: {
		AdmindelPost() {
			event.preventDefault();
			axios
				.delete("feed/admin/delete", { data: { titre: this.delPostadmin } })
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
		delComment() {
			event.preventDefault();
			axios
				.delete("feed/admin/del_comment", {
					data: { commentaires: this.delCommentaire },
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
		activeAcc() {
			event.preventDefault();
			axios
				.put("feed/admin/mod", { prenom: this.activateAccount })
				.then((response) => {
					console.log(response.data.active);
					if (response.data.active == 1) {
						alert(`Vous avez activé le compte de ${this.activateAccount} !`);
					} else if (response.data.active == 0) {
						alert(`Vous avez desactivé le compte de ${this.activateAccount} !`);
					} else {
						alert("Entrée non valide !");
					}
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

<style scoped>
#admin-deletepost {
	margin-top: 30px;
}
#admin-deletecomments {
	margin-top: 30px;
}
#admin-accoutnactivate {
	margin-top: 30px;
}
.delete {
	height: 28px;
	width: 150px;
	margin: 10px;
}
</style>