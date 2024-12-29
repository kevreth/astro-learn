<template lang="pug">
//- div.mainContent#main-wrapper(v-html= "data") 
div
  slot(v-if='$slots.pageCustom')
  div.mainContent#main-wrapper(v-else v-html='data')
</template>

<script setup lang="ts">
const props = defineProps({
  data: String,
});
</script>