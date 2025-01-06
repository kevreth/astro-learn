<template lang="pug">
    Default(:data="data")
        template(#pageCustom)
            div.mainContent#main-wrapper
                h1 Jenny Peterson - Your Hometown Real Estate Professional
                div.text-content
                    p Jenny Peterson is a seasoned real estate professional, assisting clients buy, sell, and invest in homes since 2014. She's got the credentials - Broker's license, ABR, GRI, PSA - and a knack for making the complex world of real estate feel like a breeze. Jenny's all about getting sellers top dollar fast and guiding buyers to their dream homes without the stress.
                    p Need a realtor who listens, communicates, and makes it all seem easy? Jenny's your agent. Give her a call, and let's get you moving!
</template>
<script setup lang="ts">
import { ref } from 'vue';
import data from './data.json';
</script>
