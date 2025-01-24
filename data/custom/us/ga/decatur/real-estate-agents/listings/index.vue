<template lang="pug">
Default(:data="data")
    template(#pageCustom)
        div.mainContent#main-wrapper.no-scroll-content
            h1 Listings Properties
            div.text-content.scroll-content
                .listing-container
                    .listings-grid
                        .listing-card(v-for="listing in listings" :key="listing.id")
                            .for-sale-img-contanier
                              img(:src="listing.image")
                              .badge For Sale
                            .card-content
                              .card-content-header
                                  h2.price-list-property {{ listing.price}}
                                  p.location {{ listing.location }}
                                  p.sub-stats {{ listing.subStats}}
                              //- p.card-description {{ listing.description}}
                              div.btn-outline.listings-btn-outline
                                a(:href="listing.link[index]") View Details
</template>

<script setup lang="ts">
import { ref } from 'vue';
import data from './data.json';

const listings = ref(data.listings)

</script>

<style scoped>
@media (min-width: 600px) {
  .card-content {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
}
.listing-container .btn-outline {
  justify-content: center;
}
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.listing-card {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.listing-card img {
  width: 100%;
  /* height: 200px; */
  object-fit: cover;
}

.card-content {
  padding: 10px;
  display: block;
}

.card-content .description {
    padding-top: 20px;
}
.card-content .price {
    margin: 0;
}
.card-content-header {
    display: flex;
    /* flex-direction: row; */
    flex-direction: column;
    justify-content: space-between;

    /* align-items: center; */
    align-items: baseline;
    line-height: 0.5;
}

.price-list-property  {
  /* order: 1; */
  padding-bottom: 10px;
}
.listings-btn-outline a {
  border-radius: 20px;
}
</style>