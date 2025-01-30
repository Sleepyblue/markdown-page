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
  grid-template-columns: 0.2fr 0.8fr;

  h2 {
    grid-column: 1 / -1;
  }

  h3 {
    grid-column: 1 / 2;
  }

  p {
    grid-column: 2/3
  }

  a {
    text-decoration-style: dashed;
  }

  a:hover {
    text-decoration-style: solid;
  }

  a:visited {
    color: var(--paper-error)
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
