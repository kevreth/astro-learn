<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                h1 Services
                div.text-content
                    ul
                        li
                            strong Residential - Buyer's Agent
                        li
                            strong Residential - Seller's Agent
                        li
                            strong Commercial
                        li
                            strong Rentals
        template(#footerCustom)
            footer &copy; 2024 Inquirita.com
</template>

<script setup lang="ts">
import data from './data.json';
</script>