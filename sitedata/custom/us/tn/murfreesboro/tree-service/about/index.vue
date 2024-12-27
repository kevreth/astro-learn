<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                div.text-content
                    h2 About Us
                    section
                        h3 Our Story
                        p Founded in 2003, TreeMaster Services began as a small family-owned business dedicated to preserving local trees...
                    section
                        h3 Meet the Team
                        p Our team of certified arborists and tree specialists is passionate about sustainable tree care...
                    section
                        h3 Our Commitment
                        p TreeMaster is committed to sustainability. We follow eco-friendly practices to ensure minimal environmental impact...
        template(#footerCustom)
            footer &copy; 2023 TreeMaster Services
</template>

<script setup lang="ts">
import data from './data.json';
</script>