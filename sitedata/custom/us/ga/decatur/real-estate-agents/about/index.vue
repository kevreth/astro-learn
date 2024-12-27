<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                h1 About Jenny
                div.text-content
                    p Jenny started in real estate in 2014 after working in human resources for six years. In that time, Jenny has enabled hundreds of clients to realize their home selling or buying dreams.
        template(#footerCustom)
            footer &copy; 2024 Inquirita.com
</template>

<script setup lang="ts">
import data from './data.json';
</script>