<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                h1 Customer Testimonials
                div.text-content
                    p Working with Jenny was an amazing experience as a first time homebuyer. She's knowledgeable about all aspects of the home buying process and genuinely loves what she does. The level of service, patience, and kindness truly cannot be matched. I highly recommend Jenny and cannot wait to work with her in the future when I'm ready to sell or buy again! - Roger K.
        template(#footerCustom)
            footer &copy; 2024 Inquirita.com
</template>

<script setup lang="ts">
import data from './data.json';
</script>