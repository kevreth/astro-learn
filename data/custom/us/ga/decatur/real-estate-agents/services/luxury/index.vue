<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper.no-scroll-content
      h1 Explore Luxury Properties
      div.text-content.scroll-content
        .luxury-container
          p.locni-description 
            | Luxury homes are more than just properties—they are a lifestyle. Our exclusive luxury listings showcase the finest estates, featuring breathtaking designs, unmatched locations, and premium amenities. From elegant city penthouses to serene countryside retreats, we have the perfect home waiting for you.
          .luxury-features
            h3 What Sets Our Luxury Listings Apart?
            ul.padding-top
              li 
                strong Exclusive Access: 
                | Gain entry to some of the most sought-after luxury properties, many of which are not publicly listed.
              li 
                strong Tailored Search: 
                | Your preferences matter. We customize your property search to ensure every listing matches your vision and lifestyle.
              li 
                strong Premium Amenities: 
                | Explore homes with features such as:
                ul
                  li Private pools and spas
                  li Gourmet kitchens
                  li Expansive gardens and outdoor living spaces
                  li State-of-the-art home automation systems
                  li Proximity to world-class schools, golf courses, and entertainment hubs
            .bottom-line
            h3 Our Expertise in Luxury Real Estate
            p 
              | Our team specializes in understanding the nuances of the luxury market. We work closely with high-net-worth individuals to identify and secure properties that not only meet their needs but exceed their expectations.
            ul
              li 
                strong Confidentiality and Discretion: 
                | Your privacy is our priority.
              li 
                strong Global Network: 
                | Access to international luxury properties through our network of partners.
              li 
                strong Personalized Support: 
                | From property tours to negotiations, we ensure a seamless experience.
            .bottom-line
            h3 Your Dream Home Awaits
            p 
              | Start your journey toward finding a luxury property that truly reflects your lifestyle. Contact us today to explore exclusive properties and let us make your dream a reality.
          a.btn-primary(href="/us/ga/decatur/real-estate-agents/contact") Schedule a Consultation
</template>

<script setup lang="ts">
import data from './data.json';
</script>

<style scoped>
.luxury-container h3 {
  font-size: 1.5rem;
  color: #333;
  margin-top: 15px;
}
.luxury-container p {
  text-align: justify;
} 
.luxury-features ul {
  margin: unset;
  text-align: left;
}
.luxury-features ul li {
  margin-bottom: 10px;
}
</style>