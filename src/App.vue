<template>
  <div id="app">
    <product-list></product-list>
    <hr />
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart";

export default {
  name: "App",
  components: {
    ProductList,
    ShoppingCart
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
