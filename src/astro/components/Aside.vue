<template lang="pug">
aside#aside {{aside}}
</template>

<script setup lang="ts">
const props = defineProps({
  aside: String,
});
</script>
