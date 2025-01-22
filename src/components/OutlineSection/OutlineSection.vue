<template>
  <section ref="section" id="outline-section">
    <OutlineMarkdown />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";
import OutlineMarkdown from "../../docs/OutlineMarkdown.md"

const section = ref(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });
</script>

<style>
#outline-section .markdown-body {
  display: grid;
  row-gap: 4rem;
  column-gap: 6rem;
  grid-template-columns: repeat(2, minmax(0.2fr, 0.8fr));

  h3 {
    grid-column: 1 / 2;
  }

  p {
    grid-column: 2/3
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
