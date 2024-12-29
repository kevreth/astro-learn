<template lang="pug">
header {{header}}
</template>

<script setup lang="ts">
const props = defineProps({
  header: String,
});
</script>
