<template lang="pug">
Default(:data="data")
    template(#pageCustom)
        div.mainContent#main-wrapper.no-scroll-content
            h1 Find Your Dream Buyer Today
            div.text-content.scroll-content
                .selling-container.locni-section
                    div.locni-text-bigger-font.locni-section-content
                        p Effortlessly sell your home with expert guidance. From strategic pricing to targeted marketing, I ensure your property stands out, attracting the best offers quickly and stress-free.
                        p Selling your home is a significant decision, and I am here to make the process as seamless and rewarding as possible. With a tailored approach to each property, I ensure your home is presented in the best light to attract serious buyers. From staging and professional photography to strategic pricing and marketing, every detail is meticulously planned to maximize your property's value. My deep understanding of the market, combined with strong negotiation skills, ensures you get the best offer in the shortest time. Whether you're upsizing, downsizing, or relocating, I'll guide you through every step with expertise and care.
                        div.btn-outline
                            a(href='/us/ga/decatur/real-estate-agents/about') LEARN MORE
                            a(href='/us/ga/decatur/real-estate-agents/contact') BOOK A CONSULTATION
                    div.locni-section-img
                        img(src='https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/812c689e-a572-44a1-80dc-25d203330467/2022-10-17_CompassRealEstate_JenniferFerlandLifestyle+-124217C.jpg')
</template>

<script setup lang="ts">
import data from './data.json';
</script>
