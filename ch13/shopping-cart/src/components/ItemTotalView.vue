<template>
    <td scope="col">{{ item.id }}</td>
    <td scope="col">{{ item.name }}</td>
    <td scope="col">{{ item.type }}</td>
    <td scope="col" 
        class="right-aligned-text">
        {{ item.amount }}
    </td>
    <td scope="col" 
        class="right-aligned-text">
        {{ itemValueFormatted }}
    </td>
    <td scope="col" 
        class="right-aligned-text">
        {{ itemTotalValue }}
    </td>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IProduct } from "../CartItems";

@Options({
    props: {
        item: Object,
    },
    computed: {
        itemTotalValue() {
        return (this.item.amount * this.item.specs.price).toFixed(2);
        },
        itemValueFormatted() {
            return (this.item.specs.price * 1).toFixed(2);
        }
    },
})
export default class ItemTotalView extends Vue {
    item!: IProduct;
    data() {
        return {
        item: this.item,
        };
    }
}
</script>

<style>
.right-aligned-text {
   text-align: right;
}
</style>