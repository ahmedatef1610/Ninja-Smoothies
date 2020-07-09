<template>
  <div class="index container">
    <div class="row">
      <div class="col s12 m6 l4" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card">
          <router-link
            tag="a"
            :to="{name:'EditSmoothie',params:{smoothie_slug:smoothie.slug}}"
            class="btn-floating halfway-fab waves-effect waves-light ponk"
          >
            <i class="material-icons">edit</i>
          </router-link>

          <div class="card-content">
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
            <span class="card-title center-align indigo-text">{{smoothie.title}}</span>
            <ul class="ingredients">
              <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ing}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
export default {
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id;
          });
        });
    }
  },
  created() {
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);

          localStorage.setItem(doc.id, JSON.stringify(doc.data()));
        });
      });
  }
};
</script>

<style  lang="scss">
.index .card {
  margin: 40px 0 0 0;
}
.index .ingredients {
  margin: 30px auto 0;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #aaa;
  transition: all 0.5s linear 0s;
}
.index .delete:hover {
  color: #000;
}
</style>