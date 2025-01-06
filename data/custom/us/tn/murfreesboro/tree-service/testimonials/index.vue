<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                div.text-content
                    h2 Customer Testimonials
                    p “TreeMaster helped us remove a fallen tree after a storm. Quick and professional!” – Sarah P.
                    p “Our yard looks amazing after their trimming service. Highly recommend.” – Mike L.
        template(#footerCustom)
            footer &copy; 2023 TreeMaster Services
</template>

<script setup lang="ts">
import data from './data.json';
</script>