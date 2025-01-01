<template lang="pug">
.page-container
  Header(:header="data.header" :style="{backgroundColor: data.colors.primaryColor}")
  main
      .logo-navbar-wrapper
          Logo(:logo="data.logo")
          NavBar(:nav1="data.nav1" :nav2="data.nav2")
      .main-container#main-container 
          div.breadcrumb-container
            Breadcrumb(:breadcrumbs="data.breadcrumb")
          slot(name="pageCustom", v-if="$slots.pageCustom")
          MainCompanyContent(v-else :data="data.content")
          BackgroundGrid(:backgroundImages="data.backgroundImages")
          Tabulator(:priority="data.priority")
      Aside(:aside="data.aside")
  slot(name="footerCustom", v-if="$slots.footerCustom")
  Footer(v-else :footer="data.footer" :style="{backgroundColor: data.colors.primaryColor}")
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePageSetup } from '../composables/usePageSetup';
import { initializeLayout } from "../src/scripts/layout.manager/layoutManager"
const props = defineProps({
  data: Object,
});
const { setupBlogContent } = usePageSetup(props.data);
onMounted(() => {
  setupBlogContent();
  initializeLayout(props.data);
});
</script>
<style scoped>
 @media (max-width: 600px) {
  .hidden {
    display: none;
  }

  .breadcrumb-below-nav {
    position: relative;
    margin-bottom: 5px;
  }
  .breadcrumb-left {
    margin-left: 0 !important;
    min-height: auto !important;
  }
}
</style>
