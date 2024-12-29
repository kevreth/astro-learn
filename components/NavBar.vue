<template lang="pug">
nav.navbar#navbar
    //- Logo(:logo="logo")
    div.navlink#navlink
        ul.nav-item
            li(v-for="item in nav1", :key="item")
                NuxtLink(:to="item.path") {{ item.label }}
        ul.nav-item
            li(v-for="item in nav2", :key="item")
                NuxtLink(:to="item.path") {{ item.label }}
</template>

<script setup lang="ts">
const props = defineProps({
  nav1: Array,
  nav2: Array,
//   logo: Object,
});
</script>
