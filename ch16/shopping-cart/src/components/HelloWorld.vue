<template>
    <p>Hello World</p>
    <p>msg prop = {{ msg }}</p>
    <input type="text" v-model="myText"/>
    <button v-on:click="clicked()" >Submit</button>
    <div v-if="stringLength > 0">
        <p>text length is : {{ stringLength }}</p>
        <ul>words are : 
            <li v-for="word in words">{{word}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        msg: String
    },
    computed: {
        stringLength() {
            return this.myText.length;
        },
        words() {
            return this.myText.split(' ')
        }
    },
    emits: ["onSubmitClicked"]
})
export default class HelloWorld extends Vue {
    msg!: string;
    myText!:string;
    data() {
        return {
            myText: this.msg 
        }
    }
    clicked() {
        console.log(`this.myText = ${this.myText}`);
        this.$emit("onSubmitClicked", this.myText);
    }

}
</script>

<style scoped>
</style>
