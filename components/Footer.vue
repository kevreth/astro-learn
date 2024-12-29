<template lang="pug">
footer {{footer}}
</template>

<script setup lang="ts">
const props = defineProps({
  footer: String,
});
</script>
