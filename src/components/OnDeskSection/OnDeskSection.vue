<template>
  <section ref="section" id="on-desk-section">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";

const section = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });

onMounted(() => {
  const progressBars = section.value?.querySelectorAll("progress");

  if (!progressBars) return;

  Array.from(progressBars).map((progressBar) => {
    const listParent = progressBar.closest("li");

    if (!listParent) return;

    const max = progressBar.max;
    const current = progressBar.value;
    const progressPercentage = Math.floor((current * 100) / max);

    listParent.setAttribute("data-progress", `${progressPercentage}`);
  });
});
</script>

<style>
#on-desk-section .markdown-body {
  h2 {
    grid-column: 1 / -1;
  }

  p {
    grid-column: 1 / -1;
  }

  h3 {
    grid-column: 1 / 2;
    padding-top: 32px;
  }

  ul {
    list-style: none;
  }

  .checkbox-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: clamp(2rem, 1vw + 1rem, 6rem);
    row-gap: clamp(2rem, 1vw + 1rem, 6rem);
    padding-top: 32px;

    @media (max-width: 600px) {
      justify-items: center;
    }

    .task-list-item {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-width: 320px;
      transition: all 3s ease;

      li {
        position: relative;
      }

      li:has(progress)[data-progress]::after {
        content: attr(data-progress) "%";
        position: absolute;
        right: 6px;
        bottom: 0;
        font-weight: 500;
        font-size: 1.4rem;
        z-index: 2;
      }

      & p:first-of-type {
        display: flex;
        align-items: baseline;
        gap: 12px;
      }

      & p:last-of-type {
        display: none;
        text-align: right;
        color: var(--paper-error);
        font-size: clamp(1.2rem, 1.5vw, 1.4rem);
      }

      &:has(.task-list-item-checkbox:checked) p:last-of-type {
        display: block;
      }

      &:has(progress) p {
        order: 2;
      }

      &:has(progress) ul {
        align-self: start;
        width: 100%;
        order: 1;
      }
    }

    .task-list-item-checkbox {
      flex-shrink: 0;
      appearance: none;
      width: var(--font-size-body);
      height: var(--font-size-body);
      cursor: pointer;
      border: 1px solid var(--paper-text);
      box-shadow: 0 0 0 0.3rem inset var(--paper-background);
      transition: border 0.2s var(--transition-timing-function);
      transform: translateY(3px);

      &:not(:checked):hover {
        border: 2px solid var(--paper-text);
      }
    }

    .task-list-item-checkbox:checked {
      background-color: var(--paper-text);
    }

    .task-list-item-label {
      position: relative;
      cursor: pointer;
    }
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 24px;
    background: transparent;
    border: none;
    border-top: 1px solid var(--paper-text);
    border-right: 1px solid var(--paper-text);
    border-left: 1px solid var(--paper-text);

    @media (max-width: 768px) {
      height: 16px;
    }

    &::-moz-progress-bar {
      background: var(--paper-background);
      background-image: radial-gradient(var(--paper-text) 0.5px,
          var(--paper-background) 0.5px);
      background-size: 4px 4px;
      box-shadow: 0 0 0 0.3rem inset var(--paper-background);
    }

    &::-webkit-progress-bar {
      background: var(--paper-background);
    }

    &::-webkit-progress-value {
      background-image: radial-gradient(var(--paper-text) 0.5px,
          var(--paper-background) 0.5px);
      background-size: 4px 4px;
      box-shadow: 0 0 0 0.3rem inset var(--paper-background);
    }
  }
}
</style>
