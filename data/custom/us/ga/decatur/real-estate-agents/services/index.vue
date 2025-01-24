<template lang="pug">
Default(:data="data")
    template(#pageCustom)
        div.mainContent#main-wrapper.no-scroll-content
            h1 Our Real Estate Services
            div.text-content.scroll-content
                .service-container.locni-container
                    .bottom-line
                        h2.locni-title Residential Real Estate
                        p.locni-description Looking for your dream home? Our expertise in residential real estate ensures that you find the perfect home that fits your lifestyle and budget.
                        .locni-features
                            ul
                                li Assistance with buying, selling, or renting residential properties.
                                li Comprehensive market analysis to find the best value for your investment.
                                li A personalized approach to meet your unique needs.
                        a.btn-primary(href="/us/ga/decatur/real-estate-agents/services/residental") Learn More

                    .bottom-line
                        h2.locni-title Luxury Properties
                        p.locni-description Discover some of the most exclusive luxury homes and estates in the market. Our team specializes in high-end properties and offers a tailored service to help you find a property that matches your vision.
                        .locni-features
                            ul
                                li Access to exclusive luxury property listings.
                                li Customized strategies for luxury property marketing.
                                li Professional staging and high-quality photography to highlight your property.
                        a.btn-primary(href="/us/ga/decatur/real-estate-agents/services/luxury") Learn More

                    .bottom-line
                        h2.locni-title Commercial Real Estate
                        p.locni-description Investing in commercial real estate can be a game-changer for your business. Let us connect you with the right opportunities.
                        .locni-features
                            ul
                                li Lease negotiation and tenant representation.
                                li Guidance on zoning and compliance regulations.
                                li Market analysis for strategic investments.
                        a.btn-primary(href="/us/ga/decatur/real-estate-agents/services/commercial") Learn More
</template>

<script setup lang="ts">
import data from './data.json';
</script>
