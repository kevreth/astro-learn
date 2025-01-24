<template lang="pug">
  Default(:data="data")
    template(#pageCustom)
      div.mainContent#main-wrapper
        div.text-content
          .property-detail-container
            //- mobile image
            PropertyDetailsImageSlider(:gallery="data.gallery")
  
            //- content
            .detail-container
              .left-column
                .content-header
                  h2 {{ data.price}}
                  p {{ data.subStats}}
                  p {{ data.location }}
                div.separator-dark
                .content-description
                  .content-left
                    ul.property-stats.no-padding
                  .content-right
                    .property-description
                      p(:class="{ expanded: isExpanded }")
                        | {{ isExpanded ? description : truncatedText }}
                      span.read-more(v-if="description.length > maxLength" @click="toggleReadMore")
                        | {{ isExpanded ? 'Read Less -' : 'Read More +' }}
                .map
                  h2 Map
                  iframe(
                    :src="data.map.iframe_src",
                    width="100%",
                    height="20%",
                    style="border: 0;",
                    allowfullscreen="",
                    loading="lazy",
                    referrerpolicy="no-referrer-when-downgrade"
                  )
                  p.map-address {{ data.location }}
                div.separator-dark
                .property-details
                  .feature-details
                    .feature-title
                      img(width="20" height="20" src="https://img.icons8.com/ios/50/sofa.png" alt="sofa")
                      h3 Interior Features
                    ul.feature-list(v-for="(feature, index) in data.interior_features" :key="index")
                      li.feature-label {{ feature.label }}
                      ul.feature-value
                        li(v-for="(row, rowIndex) in feature.value" :key="rowIndex") {{ row }}
                  .feature-details
                    .feature-title
                      img(width="20" height="20" src="https://img.icons8.com/ios/50/exterior.png" alt="exterior")
                      h3 Exterior/Building Features
                    ul.feature-list(v-for="(feature, index) in data.exterior_features" :key="index")
                      li.feature-label {{ feature.label }}
                      ul.feature-value
                        li(v-for="(row, rowIndex) in feature.value" :key="rowIndex") {{ row }}
                  .feature-details
                    .feature-title
                      img(width="20" height="20" src="https://img.icons8.com/ios/50/features-list.png" alt="features-list")
                      h3 Additional Information
                    ul.feature-list(v-for="(feature, index) in data.additional_info" :key="index")
                      li.feature-label {{ feature.label }}
                      ul.feature-value
                        li(v-for="(row, rowIndex) in feature.value" :key="rowIndex") {{ row }}
              .right-column
                div.agent-card
                  div.agent-details
                    h3.agent-name {{ data.agent.name }}
                    div.agent-info
                      .mobile-info.row-info
                        p.label Mobile number
                        p.value {{ data.agent.phone }}
                      hr
                      .email-info.row-info
                        p.label Email
                        p.value {{ data.agent.email }}
                  div.agent-contact
                    a(href="/us/ga/decatur/real-estate-agents/contact").btn-primary Contact agent
           
            //- RelatedListings(:listings="data.listings" :currentListingId="currentListingId" :count="3")
            .related-listings
              h2 Related Listings
              .related-listings-grid
                .related-listing-card(v-for="related in relatedListings" :key="related.id")
                  img(:src="related.image" :alt="related.title")
                  h4 {{ related.title}} - {{ related.price}}
                  a.view-details(:href="related.link") View Details
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import data from './data.json';
const description = ref(data.detail_description)
const maxLength = 250
const isExpanded = ref(false);
const truncatedText = computed(() => {
  return description.value.length > maxLength
    ? description.value.slice(0, maxLength) + '...'
    : description.value;
})
const listings = ref(data.listings)
const currentListingId = ref(1)
const relatedListings = computed(() => {
  return listings.value
    .filter((listing) => listing.id !== currentListingId.value)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
})
</script>