<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                div.text-content
                    h2 Special Offers
                    ul
                        li
                            strong Tree Removal:
                            | Safe, professional tree removal for any size.
                        li
                            strong Pruning and Trimming:
                            | Maintain health and aesthetics.
                        li
                            strong Stump Grinding:
                            | Clear unsightly stumps from your yard.
                        li
                            strong Emergency Tree Services:
                            | Available 24/7 for urgent needs.
                        li
                            strong Tree Health Assessment:
                            | Evaluate and ensure tree health.
        template(#footerCustom)
            footer &copy; 2023 TreeMaster Services
</template>

<script setup lang="ts">
import data from './data.json';
</script>