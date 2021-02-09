import Vue from "vue";
import Vuex from "vuex";
import shop from "../api/shop";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
    avaliableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotalPrice(state, getters) {
      let total = 0;
      getters.cartProducts.forEach(product => {
        total = product.price * product.quantity;
      });
      return total;
    },
    checkoutStatus(state) {
      if (state.checkoutStatus) {
        return state.checkoutStatus;
      }
    },
    productISInStock() {
      // dynamic getter allow us to pass arguments to a getter
      return product => {
        return product.inventory > 0; // return true if product is still exist in stock
      };
    },
    cartIsEmpty(state) {
      return state.cart.length === 0;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    emptyCart(state) {
      state.cart = [];
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise(resolve => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    },
    addProductToCart({ state, commit, getters }, product) {
      // check if the product is still in stock
      if (getters.productISInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);
        //  check if the product is not exist in the cart
        if (!cartItem) {
          //  push product to cart
          commit("pushProductToCart", product.id);
        } else {
          //  increment the cart item quantity
          commit("incrementItemQuantity", cartItem);
        }
        // reduce the inventory of the product
        commit("decrementProductInventory", product);
      }
    },
    checkout({ commit, state }) {
      if (state.cart.length > 0) {
        shop.buyProducts(
          state.cart,
          () => {
            // callback on success
            commit("emptyCart");
            commit("setCheckoutStatus", "Success");
          },
          () => {
            // callback on fail
            commit("setCheckoutStatus", "Fail");
          }
        );
      }
    }
  }
});
