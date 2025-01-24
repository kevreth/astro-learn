<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper.no-scroll-content
      h1 Residential Real Estate
      div.text-content.scroll-content 
        .residental-container.locni-container.locni-text-light-color
          h2 What Is Residential Real Estate?
          p Residential real estate refers to properties designed for people to live in, such as single-family homes, townhouses, condos, and apartments. These properties are often a major investment, and choosing the right one is crucial for both comfort and financial security.
          
          .bottom-line
          h2 Our Residential Real Estate Services
          .locni-features.residental-services
            h3 Buying a Home
            ul
              li Tailored property searches based on your preferences.
              li Expert advice on neighborhoods, schools, amenities, and commute options.
              li Support during the negotiation process to secure the best deal.
            h3 Selling Your Home
            ul
              li Accurate property valuation using market trends and data analysis.
              li Professional marketing, including high-quality photography and virtual tours.
              li Guidance on preparing and staging your home to attract the best offers.
            h3 Renting and Leasing
            ul
              li Assistance in finding the perfect rental property.
              li Helping landlords connect with reliable tenants.
              li Negotiation of fair and transparent lease terms.
            .bottom-line
            h2 Why Choose Us?
            ul
              li Market Knowledge: We stay up-to-date with the latest trends, ensuring you make informed decisions.
              li Personalized Approach: Your needs and goals are our top priority, and we tailor our services to suit you.
              li Stress-Free Experience: From paperwork to negotiations, we handle the complexities so you can focus on what matters most.
            .bottom-line
            h2 Tips for Homebuyers
            ul
              li Set a Budget: Understand your financial limits and get pre-approved for a mortgage.
              li Do Your Research: Explore neighborhoods and think about your long-term needs.
              li Think Beyond the Purchase Price: Consider additional costs like taxes, maintenance, and insurance.
            
          .bottom-line
          h2 FAQs
          h4 Q: How do I know if I’m ready to buy a home?
          p Start by assessing your finances and lifestyle needs. Our team can guide you through every step.
          h4 Q: Can you help with financing options?
          p Yes! We can connect you with trusted mortgage advisors to explore financing solutions.
          h4 Q: What should I look for during a property viewing?
          p Pay attention to structural integrity, layout, lighting, and any necessary repairs.
          .bottom-line
          h2 Contact Us
          p Are you ready to take the next step toward finding your dream home? Reach out to our team today, and let’s make it happen!
          a.btn-primary(href="/us/ga/decatur/real-estate-agents/contact") Schedule a Consultation
</template>

<script setup lang="ts">
import data from './data.json';
</script>

<style scoped>
.residental-services h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #555;
  text-align: left;
}
</style>