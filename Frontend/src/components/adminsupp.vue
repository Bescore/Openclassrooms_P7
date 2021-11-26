<template>
	<div>
		<form id="admin-deletepost">
		</form>
		<form id="admin-deletecomments">
			<label id="supp" for="delete_com">
				Supprimer un commentaire ? (copier/coller)
				<br />
			</label>
			<input class="delete" v-model="delCommentaire" id="delete_com" name="del_com" type="textarea" />
			<input @click="delComment()" class="del-btn" type="submit" value="Supprimer" />
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