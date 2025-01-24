<template lang="pug">
Default(:data="data")
  template(#pageCustom)
    div.mainContent#main-wrapper
      div.text-content
        .contact-container.locni-section
          .contact-section.locni-section-img
            img.contact-image(src="https://images.squarespace-cdn.com/content/v1/64938f7bf470205219e0b9e4/812c689e-a572-44a1-80dc-25d203330467/2022-10-17_CompassRealEstate_JenniferFerlandLifestyle+-124217C.jpg", alt="Jenny Peterson")
            .contact-details
              h2 Jenny Peterson
              p
                i.fa.fa-phone-alt
                | {{ agent.phone }}
              p
                i.fa.fa-envelope
                a(:href="`mailto:${agent.email}`") {{ agent.email }}
              p DRE {{ agent.dre}}
              p {{ agent.address}}

          .form-section.locni-section-content
            h2 Contact Jen
            p Buying, selling, or just curious on how or when to get started? Use the form below to schedule a consultation or ask any questions about real estate. Whether you're ready to take the next step or simply need guidance, I’m happy to provide the support you need.

            form.contact-form(action="#" method="post")
              label(for="firstName") Name 
              .input-row
                input#firstName(type="text" placeholder="First Name*" required)
                input#lastName(type="text" placeholder="Last Name*" required)
              label(for="phone") Phone 
              input#phone(type="tel" placeholder="Phone*" required)
              label(for="email") Email 
              input#email(type="email" placeholder="Your Email*" required)
              label(for="message") Message 
              textarea#message(placeholder="Your Message Here*" required)
              button.btn-primary(type="submit") Send
</template>

<script setup lang="ts">
import { ref } from 'vue';
import data from './data.json';
const agent = ref(data.agent)
</script>

<style scoped>
@media (min-width: 600px) {
  .input-row {
    flex-direction: row !important;
  }
}

.contact-details {
  text-align: left;
}

.contact-details i {
  padding-right: 10px;
}

.form-section {
  flex: 2;
  text-align: left;
}

.form-section h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.form-section p {
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.6;
}

form label {
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
}

.input-row {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.input-row input, .contact-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.checkbox-group label {
  font-weight: normal;
}

input[type="checkbox"] {
  margin-right: 10px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
}
</style>
