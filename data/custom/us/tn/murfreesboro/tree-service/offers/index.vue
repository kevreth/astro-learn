<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                div.text-content
                    h2 Special Offers
                    ul
                        li 10% off Tree Removal Services in March
                        li Free Tree Health Assessment with any trimming service in April
                        li Summer Special: 15% off Stump Grinding services in June
        template(#footerCustom)
            footer &copy; 2023 TreeMaster Services
</template>

<script setup lang="ts">
import data from './data.json';
</script>