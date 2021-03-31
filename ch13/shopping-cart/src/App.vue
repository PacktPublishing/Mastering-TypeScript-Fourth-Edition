<template>
  <ShoppingCart :collection="cartItems" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { CartCollection } from "./CartItems";
import ShoppingCart from "./components/ShoppingCart.vue";

const shoppingCartItems = new CartCollection();

@Options({
    components: {
        ShoppingCart,
    }
})
export default class App extends Vue {
    data() {
        return {
            cartItems: shoppingCartItems
        }
    }
    handleBroadcastEvent(event: string) {
        console.log(`VUE: App.handleBroadcastEvent : ${event}`);
    }
}
</script>

<style scoped>
</style>

