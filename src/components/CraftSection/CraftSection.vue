<template>
  <section ref="section" id="craft-section">
    <h2 id="craft">## Craft</h2>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";

const section = ref(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });
</script>

<style></style>
