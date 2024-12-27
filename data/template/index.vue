<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                h1 title
                div.text-content
                    p Your content here
</template>

<script setup lang="ts">
import data from './data.json';
</script>