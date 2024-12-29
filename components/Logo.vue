<template lang="pug">
div.logo
  NuxtLink.logoImg(to="/")
      img(:src="logo.src", :alt="logo.alt")
//- p.logoSlogan {{logo.slogan}}
</template>

<script setup lang="ts">
const props = defineProps({
  logo: {
    type: Object,
    default: () => ({
      src: "",
      alt: "",
      slogan: "",
    }),
  },
});
</script>
