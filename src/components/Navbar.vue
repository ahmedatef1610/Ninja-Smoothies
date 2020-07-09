<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-wrapper container">
        <router-link :to="{name:'Index'}" tag="a">
          <span class="brand-logo">Ninja Smoothies</span>
        </router-link>

        <router-link
          :to="{name:'AddSmoothie'}"
          tag="a"
          class="btn-floating btn-large halfway-fab pink waves-effect waves-light"
        >
          <i class="material-icons">add</i>
        </router-link>
        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>