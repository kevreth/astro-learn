<template lang="pug">
div.background-image#background-image(:class="{ 'grid': gridImages.length > 1 }")
    div.single-cell(v-if="gridImages.length === 1" :style="{ backgroundImage: `url(${gridImages[0]})` }")
    div.background-grid(v-else v-for="(image, index) in gridImages" :key="index" :style="{ backgroundImage: `url(${image})` }")
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    const props = defineProps<{
        backgroundImages: string[]
    }>()
    const selectedImages = ref<string[]>([]);
    function getRandomImages(imageList: string[], count: number): string[] {
        const availableImages = [...imageList];
        const selected: string[] = [];
        while (selected.length < count && availableImages.length) {
            const index = Math.floor(Math.random() * availableImages.length);
            selected.push(availableImages.splice(index, 1)[0]);
        }
        return selected;
    }
    const gridImages = computed(() => selectedImages.value)
    onMounted(() => {
        selectedImages.value = getRandomImages(props.backgroundImages, 6);
    });
</script>
