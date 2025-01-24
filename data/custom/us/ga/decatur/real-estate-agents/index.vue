<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper.no-scroll-content
        h1 Jenny Peterson - Helping you buy, sell, and find your dream home with ease.
        div.text-content.scroll-content.locni-text-light-color
          .locni-container
            .no-margin-padding
                h2 Your Trusted Advisor for Buying, Selling, and Investing in Real Estate
                p Welcome to Jenny Peterson's Real Estate Services – your trusted partner in finding the perfect home or investment. With a personalized approach and deep local expertise, I am committed to helping you buy, sell, or invest with confidence. Let’s turn your real estate dreams into reality!
            
            .summary-about.locni-section
              .locni-section-img
                img(src='https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/812c689e-a572-44a1-80dc-25d203330467/2022-10-17_CompassRealEstate_JenniferFerlandLifestyle+-124217C.jpg' alt="Jenny Peterson")
              .locni-section-content
                h2 Your Local Expert for Seamless Real Estate Transactions
                p Passionate about connecting people with their perfect homes, I specialize in buying, selling, and investing in real estate. With a personalized approach and local expertise, I guide my clients every step of the way to ensure seamless and successful property transactions.
                a.btn-primary.locni-section-btn(href="/us/ga/decatur/real-estate-agents/about") Learn More
            
            .summary-contact.locni-section
              .summary-contact-content.locni-section-content
                h2 What I Bring to Your Real Estate Journey
                p Working with me means partnering with someone who truly understands your goals. Whether you're buying your dream home, selling for top value, or investing in real estate, I provide personalized attention, expert guidance, and a commitment to making your experience smooth and stress-free. Let’s achieve your real estate dreams together!
                a.btn-primary.locni-section-btn(href="/us/ga/decatur/real-estate-agents/contact") Working With Me
              .summary-contact-img.locni-section-img
                img(src='https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/050f0445-bff6-4b05-b1d5-12e5c74920ee/2022-10-17_CompassRealEstate_JenniferFerlandLifestyle+-125825A.jpg' alt="Jenny Peterson")
            
            .bottom-line
            section.services-offers
              h2.section-title Services Offers
              .services-grid
                .service-card
                  img.service-image(src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnV5aW5nJTIwcmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D", alt="Buying")
                  h3.service-title Buying
                  p.service-description Find your ideal home with expert guidance and market insights.
                  a.btn-primary(href="/us/ga/decatur/real-estate-agents/buying") Learn More
                .service-card
                  img.service-image(src="https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHNlbGxpbmclMjByZWFsJTIwZXN0YXRlfGVufDB8fDB8fHww", alt="Selling")
                  h3.service-title Selling
                  p.service-description Get top value for your property with tailored strategies and expert marketing.
                  a.btn-primary(href="/us/ga/decatur/real-estate-agents/selling") Learn More
                .service-card
                  img.service-image(src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHNlbGxpbmclMjByZWFsJTIwZXN0YXRlfGVufDB8fDB8fHww", alt="Listings Property")
                  h3.service-title Listings Property
                  p.service-description Discover exclusive property listings that fit your needs and lifestyle.
                  a.btn-primary(href="/us/ga/decatur/real-estate-agents/listings") Learn More
                .service-card
                  img.service-image(src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNlbGxpbmclMjByZWFsJTIwZXN0YXRlfGVufDB8fDB8fHww", alt="Real Estate Consulting")
                  h3.service-title Real Estate Consulting
                  p.service-description Get expert advice and tailored strategies to navigate the real estate market with confidence.
                  a.btn-primary(href="/us/ga/decatur/real-estate-agents/services") Learn More
            
            .bottom-line
            section.property-listing
              .listing-grid(v-for="listing in listings.slice(0, 3)" :key="listing.id")
                a.property-card(:href="listing.link")
                  .for-sale-img-contanier
                    img(:src="listing.image")
                    .badge For Sale
                  .property-details
                    h2 {{ listing.price}}
                    p {{ listing.location }}
                    p {{ listing.subStats}}

                //- a.property-card(href="/us/ga/decatur/real-estate-agents/listings/4-bedroom-home")
                //-   .for-sale-img-contanier
                //-     img(src="https://mediaservice.themls.com/large/24-357985/24-357985_9fd8baaf-67ea-4ce7-87a0-820f498bb1b1.jpg", alt="Lot 2 W Pine St")
                //-     .badge For Sale
                //-   .property-details
                //-     h3.property-details-title 4-Bedroom Family Home
                //-     p.property-details-price $448,000
                //-     p.property-details-description A spacious family home located in the heart of Decatur, GA. Features include a modern kitchen, large backyard, and close proximity to schools.
                //- a.property-card(href="#")
                //-   .for-sale-img-contanier
                //-     img(src="https://images.unsplash.com/photo-1530734218972-25a9391ccd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QSUyMGNvenklMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D", alt="Lot 2 W Pine St")
                //-     .badge For Sale
                //-   .property-details
                //-     h3.property-details-title Charming Cottage
                //-     p.property-details-price $225,000
                //-     p.property-details-description A cozy 2-bedroom cottage with a rustic feel in Decatur, GA. Includes a fireplace, a beautiful garden, and is located in a quiet neighborhood.
                //- a.property-card(href="#")
                //-   .for-sale-img-contanier
                //-     img(src="https://images.unsplash.com/photo-1605352081508-2e09927ecfe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEx1eHVyeSUyMFdhdGVyZnJvbnQlMjBWaWxsYXxlbnwwfHwwfHx8MA%3D%3D", alt="B1, L3 Sasha Point")
                //-     .badge For Sale
                //-   .property-details
                //-     h3.property-details-title Luxury Waterfront Villa
                //-     p.property-details-price $1,200,000
                //-     p.property-details-description Experience luxury living with this 5-bedroom villa near Decatur, GA. Features a private pool, stunning ocean views, and modern amenities.
</template>
<script setup lang="ts">
import { ref } from 'vue';
import data from './data.json';

const listings = ref(data.listings)

</script>

<style scoped>
@media (min-width: 600px) {
  
  .service-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px; 
  }
  .listing-grid {
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    /* gap: 20px;  */
  }
  .property-listing {
    padding: 50px 20px;
    grid-template-columns: repeat(3, 1fr) !important;
  }
}




.locni-container {
  overflow-x: hidden;
}
.summary-contact {
  margin-top: 50px;
  display: flex;
}
.locni-section-btn {
  align-self: flex-start;
  margin-top: auto;
}
.section-title {
  font-size: 2rem;
  text-transform: uppercase;
}
.service-card {
  background-color: #fff;
  padding: 20px;
  text-align: center;
}
.service-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}
.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.property-card {
  background-color: #fff; 
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}
.property-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

.property-card:hover .for-sale-img-contanier img {
  transform: scale(1.1); 
}




.property-listing {
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: none;
    display: grid;
    gap: 10px;
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
  order: 1;
  padding-bottom: 10px;
}
</style>
