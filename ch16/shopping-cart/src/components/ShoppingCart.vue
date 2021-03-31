<template>
    <div class="container">
        <div 
            v-if="!isCheckingOut"
        >
                &nbsp;
        <hr/>
        <div 
            v-bind:key="item.id" 
            v-for="item in collection.items"
        >
            <ItemView 
                :item="item" 
                @on-remove="onItemRemoved"
            ></ItemView>
        </div>
        <button 
            class="btn btn-secondary" 
            v-on:click="updateCart()"
        >Update Cart</button>&nbsp;
        <button 
            class="btn btn-primary" 
            v-on:click="checkout()"
        >Checkout</button>
        </div>
        <div v-if="isCheckingOut">
                &nbsp;
        <h2>Check Out</h2>
        <hr/>
        <CheckoutView 
            :basket="collection"
        ></CheckoutView>
                <button 
            class="btn btn-secondary" v-on:click="continueShopping()"
        >Continue Shopping</button>&nbsp;
        <button 
            class="btn btn-primary"
            v-on:click="placeOrder()"
        >Place Order</button>
        </div>
        <hr/>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CartCollection } from "../CartItems";
import ItemView from "./ItemView.vue";
import CheckoutView from "./CheckoutView.vue";
import { microEventBus } from "../App.vue";

@Options({
    props: {
        collection: CartCollection,
    },
    components: {
        ItemView,
        CheckoutView,
    }
})
export default class ShoppingCart extends Vue {
    collection!: CartCollection;
    isCheckingOut!: boolean;
    data() {
        return {
            collection: this.collection,
            isCheckingOut: false,
        };
    }

    onItemRemoved(id: number) {
        const index = 
            this.collection.items.findIndex(
                (item) => item.id === id
            );
        this.collection.items.splice(index, 1);
    }
    checkout() {
        this.isCheckingOut = true;
        microEventBus.broadcast('checking-out', null);
    }
    back() {
        this.isCheckingOut = false;
    }
        
    continueShopping() {
        this.isCheckingOut = false;
        console.log(`VUE : continueShopping()`);
        microEventBus.broadcast('continue-shopping', null);
    }

    placeOrder() {
        console.log(`VUE : placeOrder()`);
         microEventBus.broadcast('place-order', null);
    }

        updateCart() {
        console.log(`updating cart`);
        this.$emit("onUpdateCart");
    }
}
</script>