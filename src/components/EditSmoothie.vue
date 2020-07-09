<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h3 class="center-align indigo-text">Edit Smoothie Recipe</h3>
    <form class="card" @submit.prevent="editSmoothie">
      <div class="card-content">
        <div class="input-field">
          <label for="title" class="active">Smoothie Title:</label>
          <input id="title" type="text" v-model="smoothie.title" />
        </div>

        <div class="input-field" v-for="(ing, index) in smoothie.ingredients" :key="index">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          <label for="ingredient" class="active">Ingredient:</label>
          <input
            id="ingredient"
            type="text"
            v-model="smoothie.ingredients[index]"
            @keydown.enter.prevent
          />
        </div>

        <div class="input-field">
          <label for="add-ingredient">Add an ingredient:</label>
          <input
            id="add-ingredient"
            type="text"
            @keydown.enter.tab.prevent="addIng"
            v-model="another"
          />
        </div>

        <div class="input-field center-align">
          <p v-if="feedback" class="red-text" style="margin-bottom: 20px">{{feedback}}</p>
          <button class="btn pink waves-effect waves-light" type="submit">Update Smoothie</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import slugify from "slugify";
export default {
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "you must enter a smoothie title";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "you must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    }
  },
  created() {
    db.collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      });
  }
};
</script>

<style lang="scss">
.edit-smoothie h3 {
  margin-top: 30px;
}
.edit-smoothie .card {
  max-width: 500px;
  margin: 30px auto 30px auto;
}
.edit-smoothie .delete {
  position: absolute;
  bottom: 15px;
  right: 5px;
  cursor: pointer;
  color: #aaa;
  transition: all 0.5s linear 0s;
}
.edit-smoothie .delete:hover {
  color: #000;
}
</style>