<template>
  <div class="add-smoothie container">
    <h3 class="center-align indigo-text">Add New Smoothie Recipe</h3>
    <form class="card" @submit.prevent="addSmoothie">
      <div class="card-content">
        <div class="input-field">
          <label for="title">Smoothie Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div class="input-field" v-for="(ing, index) in ingredients" :key="index">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          <label for="ingredient" class="active">Ingredient:</label>
          <input id="ingredient" type="text" v-model="ingredients[index]" @keydown.enter.prevent />
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
          <button class="btn pink waves-effect waves-light" type="submit">Add Smoothie</button>
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
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "you must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>

<style  lang="scss">
.add-smoothie h3 {
  margin-top: 30px;
}
.add-smoothie .card {
  max-width: 500px;
  margin: 30px auto 30px auto;
}
.add-smoothie .delete {
  position: absolute;
  bottom: 15px;
  right: 5px;
  cursor: pointer;
  color: #aaa;
  transition: all 0.5s linear 0s;
}
.add-smoothie .delete:hover {
  color: #000;
}
</style>