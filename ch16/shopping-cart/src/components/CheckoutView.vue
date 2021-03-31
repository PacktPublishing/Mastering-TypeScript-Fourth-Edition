<template>
  <div class="hello">

    <table class="table table-sm">
        <thead class="thead-dark">
            <tr>
            <th scope="col">Item ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col" class="right-aligned-text">Amount</th>
            <th scope="col" class="right-aligned-text">Price</th>
            <th scope="col" class="right-aligned-text">Total</th>
            </tr>
        </thead>
        <tbody>
<tr v-for="item in basket.items" v-bind:key="item.id">
    <ItemTotalView :item="item"></ItemTotalView>
</tr>
            <tr>
                <th scope="col" colspan="5">Cart Total</th>
                <th scope="col" class="right-aligned-text">{{ itemTotal }}</th>
            </tr>
            <tr>
                <th scope="col" colspan="5">Tax</th>
                <th scope="col" class="right-aligned-text">{{ tax }}</th>
            </tr>
            <tr>
                <th scope="col" colspan="5">Shipping</th>
                <th scope="col" class="right-aligned-text">{{ shipping }}</th>
            </tr>
            <tr>
                <th scope="col" colspan="5">Invoice Total</th>
                <th scope="col" class="right-aligned-text">{{ total }}</th>
            </tr>

        </tbody>

    </table>

  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CartCollection } from "../CartItems";
import ItemTotalView from "./ItemTotalView.vue";

@Options({
    props: {
        basket: CartCollection,
    },
    components: {
        ItemTotalView
    },
    computed: {
        itemTotal() {
            return this.displayValue(this.totalValue());
        },
        tax() {
            return this.displayValue(this.taxValue());
        },
        shipping() {
            return this.displayValue(this.shippingValue());
        },
        total() {
            return this.displayValue(
                this.totalValue() + this.taxValue() + this.shippingValue()
            );
        },
    },
})
export default class CheckoutView extends Vue {
    basket!: CartCollection;
    data() {
        return {
            basket: this.basket,
        };
    }
totalValue() {
    let total = 0;
    for (let item of this.basket.items) {
        total += <number>item.amount * +item.specs.price;
    }
    return total * 100;
}
taxValue() {
    return Math.round(this.totalValue() * 0.1);
}
    shippingValue() {
        return 700;
    }
displayValue(amount: number): string {
    return (amount / 100).toFixed(2);
}
}
</script>