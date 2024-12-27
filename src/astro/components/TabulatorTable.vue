<template>
  <div ref="table"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

export default {
  mounted() {
    new Tabulator(this.$refs.table, {
      data: [
        { id: 1, name: 'John', age: 28 },
        { id: 2, name: 'Jane', age: 32 },
      ],
      columns: [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Age', field: 'age' },
      ],
    });
  },
};
</script>
