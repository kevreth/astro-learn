<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper.no-scroll-content
      h1 Commercial Real Estate
      div.text-content.scroll-content
        .commercial-container.locni-container
          p.locni-description Investing in commercial real estate can provide your business with the foundation it needs to grow and thrive. Whether you're looking for office space, retail locations, or industrial properties, we specialize in connecting you with the right opportunities to meet your goals.
          .locni-features
            h3 Our Services in Commercial Real Estate
            ul.padding-top
              li 
                strong Lease Negotiation and Tenant Representation: 
                | Secure favorable lease terms tailored to your business needs. Benefit from expert representation during negotiations.
              li 
                strong Zoning and Compliance Guidance: 
                | Navigate complex zoning laws and regulations with ease. Ensure your property meets all necessary legal and operational requirements.
              li 
                strong Strategic Market Analysis: 
                | Receive insights into market trends and prime locations. Identify properties with high growth potential for your business.
            .bottom-line
            h3 Why Invest in Commercial Real Estate?
            ul.padding-top
              li 
                strong Long-Term Stability: 
                | Commercial properties often provide consistent rental income and equity growth over time.
              li 
                strong Business Expansion: 
                | The right location can significantly boost your business visibility and profitability.
              li 
                strong Portfolio Diversification: 
                | Diversify your investment portfolio with high-value commercial assets.
            .bottom-line
            h3 Tailored Solutions for Your Business
            p 
              | We understand that every business has unique requirements. That’s why our team works closely with you to identify the right commercial properties, ensuring they align with your operational needs and financial goals.
            .bottom-line
            h3 Get Started Today
            p 
              | Whether you're a first-time investor or an experienced entrepreneur, our expertise in commercial real estate will guide you every step of the way. Contact us to learn more about the opportunities waiting for you!
          a.btn-primary(href="#") Schedule a Consultation
</template>

<script setup lang="ts">
import data from './data.json';
</script>
