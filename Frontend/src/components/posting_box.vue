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
      <label for="image">Ajoutez une photo, un fichier .gif par exemple</label>
      <input
        id="image"
        type="file"
        @change="sentImage"
        accept="image/jpg,image/jpeg,image/png,gif"
      />
      <input
        @click="addcomment"
        class="create-posts-contains-inputs-btn"
        type="submit"
        value="Créer Post !"
      />
    </div>
  </form>
</template>

<script>
import formData from "form-data";
import axios from "axios";
export default {
  name: "posting_box",
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

    async addcomment() {
      event.preventDefault();
      const formdata = new formData();
      formdata.append("image", this.fileselect, this.fileselect.name);
      formdata.append("titre",this.titre)
      formdata.append("post_body",this.post_body)
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
    },
  },
};
</script>

<style scoped>
.create-posts-contains {
  padding: 20px;
  width: 600px;
  height: 400px;
  border-radius: 10px;
  margin: auto;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.create-posts-contains-inputs {
  height: 400px;
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
  height: 200px;
  resize: none;
  border: none;
}
.create-posts-contains-inputs-btn {
  border-radius: 5px;
  height: 40px;
  width: 200px;
  background-color: rgb(213, 223, 233);
  margin-left: auto;
  margin-right: auto;
}
</style>