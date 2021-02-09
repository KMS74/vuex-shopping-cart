<template>
  <div>
    <h1>Products List</h1>
    <img
      v-if="loading"
      src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"
    />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.inventory }}
        <button
          :disabled="!productISInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ProductList",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions({
      addProductToCart: "addProductToCart",
      fetchProducts: "fetchProducts"
    })
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    ...mapGetters({
      productISInStock: "productISInStock"
    })
  },
  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  }
};
</script>
