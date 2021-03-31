<template>
   <div v-if="loading" class="loading">
      Loading...
    </div>
     <div v-if="!loading" class="loading">
      <ShoppingCart 
        :collection="cartItems" 
        @on-update-cart="onUpdateCart" />
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { CartCollection, IProduct } from "./CartItems";
import ShoppingCart from "./components/ShoppingCart.vue";
import { ajax } from "rxjs/ajax";
import { MicroEventBus } from 'micro-event-bus';
export let microEventBus: MicroEventBus = (window as any).microEventBus;

// let shoppingCartItems = new CartCollection();


interface IItemData {
    username: string;
    productId: number;
    amount: string;
}

@Options({
    components: {
        ShoppingCart,
    },
    mounted() {
        console.log(`VUE: App:mounted()`);
        microEventBus.on('add-user-cart-item').subscribe(this.handleAddItemToCart);

        microEventBus.on('user-logged-in').subscribe(this.handleUserLoggedIn);

    }
})
export default class App extends Vue {
    cartItems!: CartCollection;
    username!: string;
    loading: boolean = false;
    data() {
        // return {
        //     cartItems: shoppingCartItems
        // }
        return {
            cartItems: [],
            username : null,
            loading: true
            
        }
    }
    handleUserLoggedIn(event: string) {
        console.log(`VUE: App.handleUserLoggedIn : ${event}`);
        this.username = event;
        this.loading = true;
        this.fetchData();
    }

    fetchData() {
        console.log(`calling ajax with ${this.username}`);
        ajax.getJSON(`http://127.0.0.1:3000/carts/${this.username}`).subscribe((data) => {
            console.log(`cart loaded from API`)
            let cartItems = new CartCollection();
            cartItems.items = <IProduct[]>data;
            this.cartItems = cartItems;
            this.loading = false;
        }, (error) => {
            console.log(`VUE: get /carts/(username) error : ${error}`);
            this.loading = false;
        }); 
    }

    handleAddItemToCart(data : IItemData) {
        console.log(`handleAddItemToCart : item : ${JSON.stringify(data)}`);
        console.log(`calling GET on /products/${data.productId}`);
        setTimeout(() => {
            this.loading = true;
            ajax.getJSON(`http://127.0.0.1:3000/products/${data.productId}`).subscribe((product) => {
                let productItem = <IProduct>product;
                productItem.amount = parseInt(data.amount);
                this.cartItems.items.push(productItem);
                this.loading = false;
            }, (error) => {
                console.log(`VUE: products/${data.productId} : error ${error}`);
            }); 

        }, 200)
    }
    

    onUpdateCart() {
        console.log(`App.onUpdateCart`);
        let postBody = this.cartItems.getCartItemsPostData();
        console.log(`postBody : ${JSON.stringify(postBody)}`);
        this.loading = true;
        ajax.post(`http://127.0.0.1:3000/carts/${this.username}`, JSON.stringify(postBody) ).subscribe( () => {
            console.log(`post succeeded`)
            this.loading = false;
        }, (error) => {
            console.log(`VUE: post to /cards/{username} failed : error : ${error}`);
            this.loading = false;
        })
    }



}
</script>

<style scoped>
</style>
