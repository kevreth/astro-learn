<script setup lang="ts">
import { onMounted } from 'vue'
import 'tabulator-tables/dist/css/tabulator.min.css'
import {
  columns,
  mounted,
} from '../src/scripts/tabulator/tabulator'
const props = defineProps({ priority: String })
onMounted(() => {
  const priority = props.priority
  const doc = document
  mounted(doc, priority, columns)
});
</script>
<template>
  <div ref="table"></div>
</template>
