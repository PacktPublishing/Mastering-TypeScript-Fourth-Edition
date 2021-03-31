
<template>
    Hello Vue !
    <HelloWorld msg="test"></HelloWorld>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import HelloWorld from "./components/HelloWorld.vue";

@Options({
    components: {
        HelloWorld,
    },
})
export default class AppSample extends Vue {}
</script>

<style scoped>
</style>
