<template>
  <div >

  <div class="container-sm">
      <div class="row">
          <h4>Item #{{item.id}} - {{ item.name }} ( {{item.type}} )</h4>
      </div>
      <br/>
      <div class="row">
          <div class="col-sm-2">
            <img :src="imageSource" class="img-thumbnail image-small"/>
          </div>
          <div class="col-sm-10">
              <div class="row">
                  <div class="col-sm-5">
                    <div 
                        class="form-outline" 
                        ref="inputAmount"
                    >
                        <input 
                            type="number"  
                            class="form-control" 
                            v-model="item.amount" 
                        />
                        <label 
                            class="form-label" 
                        >No of switches</label>
                    </div>
                  </div>
              </div>
              <div class="row">&nbsp;
              </div>

              <div class="row">
                  <div class="col-sm-6">
                     <button  class="btn btn-primary" 
                        v-on:click="onItemRemove">
                        <i class="fas fa-times-circle" ></i>
                        &nbsp;Delete
                    </button>
                  </div>
              </div>

          </div>
          
      </div>

  </div>
  </div>
  <hr/>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IProduct } from "../CartItems";
import * as mdb from 'mdb-ui-kit/js/mdb.min.js';

@Options({
    props: {
        item: Object
    },

    emits: ["onRemove"],
    computed : { 
        imageSource() {
            return `${this.item.image}`;
      }
    },
    mounted() {
        let inputBts = this.$refs.inputAmount;
        new mdb.Input(inputBts).init();
    }
})
export default class ItemView extends Vue {
    item!: IProduct;
    data() {
        return {
            item: this.item,
        };
    }
    onItemRemove() {
        this.$emit("onRemove", this.item.id);
    }
}
</script>

<style>
.image-small {
    width: 130px;
}
</style>
