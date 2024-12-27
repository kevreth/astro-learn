<template lang="pug">
Default(:data="data")
    template(#pageCustom)
        div.mainContent#main-wrapper
            div.text-content
                h2 This spot is available for lease! Changing something ......
                p If you're a Tree Service doing business in Murfreesboro, Tennessee and seek more leads then Inquirita is here to help!
                p Inquirita provides complete digital marketing services, including
                ul
                    li ranking in Google search results
                    li social media marketing
                    li advertising (at additional cost)
                    li Google Business Profile management
                p When leasing this spot
                ul
                    li The Inquirita logo will be replaced with your logo
                    li Your firm's full contact information will be prominently displayed, along with a Google Map location display
                    li Pictures and biographies of your key people will be displayed
                    li A blog will be created that you can manage
                    li The services you provide will be listed
                    li Custom copy for your spot will be written
                    li Social media accounts will be created that we manage for you
                    li We will create a Google Business Profile for you and manage it
</template>

<script setup lang="ts">
import data from './data.json';
</script>