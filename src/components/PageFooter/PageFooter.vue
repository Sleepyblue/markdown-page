<template>
    <FooterMarkdown />
  </footer>
</template>

<script setup lang="ts">
import FooterMarkdown from "../../docs/FooterMarkdown.md"
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
