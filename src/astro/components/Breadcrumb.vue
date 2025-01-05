<template lang="pug">
nav.breadcrumbs#breadcrumb(aria-label="breadcrumb" v-html="breadcrumbs")
//- nav(v-html="breadcrumbs")
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { formatBreadcrumbs } from '@/utils/breadcrumbUtils';

// Define props to accept a single HTML string
const props = defineProps({
  breadcrumbs: String,
});

onMounted(() => {
  formatBreadcrumbs('#breadcrumb')
})
</script>
