<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper.no-scroll-content
      h1 About Jenny
      div.text-content.scroll-content
        .about-container.locni-container
          .about-header.locni-section.locni-text-light-color
            .locni-section-img
              img.profile-image(src="https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/302cba51-05cf-48f5-9a36-301c4903f1d9/SFrealtorbrandphotoshoot-24.jpg", alt="Jenny Peterson")
              P.call-now CALL NOW: 530.990.5366
            .about-bio.locni-section-content
              h2 GET TO KNOW ME
              .bottom-line-no-padding
              p Jenny started in real estate in 2014 after working in human resources for six years. In that time, Jenny has enabled hundreds of clients to realize their home selling or buying dreams.
              p Jenny's approach is simple: personalized service, honest advice, and a commitment to delivering exceptional results. She prides herself on building lasting relationships with her clients, guiding them every step of the way, and making the complex world of real estate easy to navigate.
              p Let’s work together to turn your real estate goals into reality!
</template>

<script setup lang="ts">
import data from './data.json';
</script>

<style scoped>
@media (min-width: 600px) {
  .about-header img {
    max-height: none !important;
  }
  .call-now {
  text-align: left !important;
}
}
.about-header img {
  max-height: 300px;
}
.about-bio {
  text-align: left;
  margin: 0px 10px;
}
.about-bio h2 {
  padding: 0;
}
.call-now {
  text-align: center;
}
</style>
