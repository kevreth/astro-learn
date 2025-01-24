<template lang="pug">
Default(:data="data")
    template(#pageCustom)
        div.mainContent#main-wrapper.no-scroll-content
            h1 Buying Your Dream Home
            div.text-content.scroll-content
                .buying-container.locni-section
                    div.locni-text-bigger-font.locni-section-content
                        p.no-padding Find your perfect home with our expert guidance.
                        p With years of experience and a deep understanding of the competitive real estate landscape, I use proven methods to help buyers stand out. I focus on securing homes that align perfectly with your goals and lifestyle—never rushing or pushing decisions that don’t feel right. My extensive network in the real estate community allows me access to both public and private listings, giving you an unparalleled advantage. Whether you’re ready to explore homes now or just starting the journey, I’m committed to guiding you every step of the way. Let’s find the home you’ve been dreaming of, on your timeline and at your pace.
                        div.btn-outline.bottom-btn-outline
                            a(href='/us/ga/decatur/real-estate-agents/about') LEARN MORE
                            a(href='/us/ga/decatur/real-estate-agents/contact') BOOK A CONSULTATION
                    div.locni-section-img
                        img(src='https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/07c1c87c-5d4e-41a5-985c-0f8a3b226014/SFrealtorbrandphotoshoot-7.jpg')
</template>

<script setup lang="ts">
import data from './data.json';
</script>
