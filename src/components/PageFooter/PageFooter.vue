<template>
  <footer ref="footer">
    <FooterMarkdown />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FooterMarkdown from "../../docs/FooterMarkdown.md"
import useSectionObserver from "@/composables/useSectionObserver";

const footer = ref<HTMLElement | null>(null)
const emit = defineEmits<{
  (e: "footer-emit", value: number | null): void;
}>();

useSectionObserver({ section: footer, footerEmit: emit, threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] })
</script>

<style>
footer {
  position: relative;
  padding: 8px;
  margin-top: 48px;
  border-top: 1px dashed var(--paper-text);

  .markdown-body {
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }

    p {
      font-size: clamp(1.2rem, 1.5vw, 1.4rem)
    }

  }

  &::before,
  &::after {
    position: absolute;
    content: "+";
    transform: translateY(-50%);
    top: 0px;
  }

  &::before {
    left: -4px;
  }

  &::after {
    right: -4px;
  }
}
</style>
