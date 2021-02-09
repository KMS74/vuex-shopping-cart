<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ totalPrice | currency }}</p>
    <button :disabled="cartIsEmpty" @click="checkout">checkout</button>
    <p>{{ checkoutStatus }}</p>
    <p></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters({
      products: "cartProducts",
      totalPrice: "cartTotalPrice",
      checkoutStatus: "checkoutStatus",
      cartIsEmpty: "cartIsEmpty"
    })
  },
  methods: {
    ...mapActions({
      checkout: "checkout"
    })
  }
};
</script>
