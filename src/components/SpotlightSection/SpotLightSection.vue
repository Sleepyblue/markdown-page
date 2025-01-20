<template>
  <section ref="section">
    <h1>{ Frontend Developer }</h1>
  </section>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";

const section = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
  (e: "scroll-past", value: boolean): void;
}>();

useSectionObserver({ section, sectionEmit: emit, scrollTopEmit: emit, threshold: 0.15 });
</script>

<style></style>
