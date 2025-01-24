<template lang="pug">
  Default(:data="data")
    template(#pageCustom)
      div.mainContent#main-wrapper.no-scroll-content
        h1 Customer Testimonials
        div.text-content.scroll-content
          .testimonials-container
            h2 See why my clients love to work with me
            section.testimonials(v-if="testimonials && testimonials.length > 0")
              article.testimonial(v-for="(testimonial, index) in testimonials" :key="index")
                blockquote
                  svg.blockquote-svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40")
                    g
                      g
                        path(d="M13.934,24.89c7.932,0.121,8.71,8.353,8.71,8.353c0.278,6.224-4.863,10.789-10.637,10.789 C5.015,44.033,0,38.258,0,29.14v-0.608C0,17.894,4.99,7.953,21.016,0l2.873,4.897c0,0-14.934,5.706-15.986,19.992H13.934z")
                      g
                        path(d="M44.044,24.89c7.932,0.121,8.71,8.353,8.71,8.353c0.278,6.224-4.863,10.789-10.637,10.789 c-6.991,0-12.006-5.774-12.006-14.893v-0.608C30.11,17.894,35.1,7.953,51.127,0L54,4.897c0,0-14.934,5.706-15.986,19.992H44.044z")
                  p.quote(:class="{ expanded: isExpanded[index] }")
                    | {{ isExpanded[index] ? testimonial.quote : truncatedText[index] }}
                  span.read-more(v-if="testimonial.quote.length > maxLength" @click="toggleReadMore(index)")
                    | {{ isExpanded[index] ? 'Read Less -' : 'Read More +' }}
                  cite — {{ testimonial.author }}
            div(v-else)
              p No testimonials found.
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import data from './data.json';

interface Testimonial {
  quote: string;
  author: string;
}

const testimonials = ref<Testimonial[]>([
  {
    quote: "I cannot say enough good things about [Your Name] and their dedication to helping me find the perfect home. From the first meeting, they truly listened to my needs and preferences, offering expert advice without being pushy. They spent countless hours showing me homes, answering all of my questions, and even pointing out potential issues I wouldn’t have noticed. Their market knowledge and professionalism were unmatched. When we finally found the right home, they negotiated an amazing deal for me, saving me money and making the process as stress-free as possible. I wouldn’t hesitate to recommend Jenny to anyone looking to buy or sell their home!",
    author: "Sarah M."
  },
  {
    quote: "Selling my home was a daunting task, but Jenny made it effortless. They provided excellent advice, staged my home beautifully, and secured an offer above my asking price in just a week. I highly recommend their services!.",
    author: "John D."
  },
  {
    quote: "As a first-time homebuyer, I was nervous about the process, but Jenny guided me every step of the way. Their patience, knowledge, and genuine care made all the difference. Thank you for helping me find my dream home!",
    author: "Emily R."
  },
  {
    quote: "Working with Jenny was an amazing experience as a first time homebuyer. She's knowledgeable about all aspects of the home buying process and genuinely loves what she does. The level of service, patience, and kindness truly cannot be matched. I highly recommend Jenny and cannot wait to work with her in the future when I'm ready to sell or buy again!",
    author: "Roger K"
  },
  {
    quote: "I was looking for an investment property, and Jenny was instrumental in finding the perfect match. Their market insights and negotiation skills ensured I got a great deal. They are truly a professional I can trust!",
    author: "Michael"
  }
]);

const isExpanded = ref<boolean[]>(Array(testimonials.value.length).fill(false));
const maxLength = 250;
const truncatedText = computed(() => testimonials.value.map(testimonial => testimonial.quote.length > maxLength ? testimonial.quote.slice(0, maxLength) + '...' : testimonial.quote));
const toggleReadMore = (index: number) => {
  isExpanded.value[index] = !isExpanded.value[index];
};
</script>

<style scoped>
@media (min-width: 600px) {
  .testimonials {
    padding: 0 2rem 2rem !important;
  }
}

.quote {
  text-align: center;
  padding-top: 0;
}


.blockquote-svg {
  fill: #999;
}

.testimonials-container h2 {
  text-align: left;
  font-weight: 500;
}

.testimonials {
  display: flex;
  flex-direction: column;
}

.testimonial {
  padding: 20px 0;
}

.testimonial blockquote {
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
}

cite {
  font-size: 0.8rem;
  font-weight: bold;
  font-style: normal;
}


</style>
