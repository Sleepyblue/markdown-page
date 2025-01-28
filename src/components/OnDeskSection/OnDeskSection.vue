<template>
  <section ref="section" id="on-desk-section">
    <OnDeskMarkdown />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OnDeskMarkdown from "../../docs/OnDeskMarkdown.md"
import useSectionObserver from "../../composables/useSectionObserver";

const section = ref(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });
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
    row-gap: clamp(2rem, 1vw + 1rem, 6rem);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: clamp(2rem, 1vw + 1rem, 6rem);
    padding-top: 32px;

    .task-list-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 320px;

      &:has(progress) p {
        display: flex;
        align-items: baseline;
        gap: 8px;
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
      cursor: pointer;
    }
  }

  progress {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 24px;
    background:
      radial-gradient(circle, transparent 20%, var(--paper-background) 20%, var(--paper-background) 80%, transparent 80%, transparent),
      radial-gradient(circle, transparent 20%, var(--paper-background) 20%, var(--paper-background) 80%, transparent 80%, transparent) 10px 10px,
      linear-gradient(var(--paper-text) 4px, transparent 4px) 0 -2px,
      linear-gradient(90deg, var(--paper-text) 4px, transparent 4px) -2px 0;
    background-size: 6px 6px, 6px 6px, 3px 3px, 3px 3px;
    border: none;

    @media (max-width: 768px) {
      height: 16px;
    }
  }

  progress::-webkit-progress-bar,
  progress::-webkit-progress-value,
  progress::-moz-progress-bar {
    background-color: var(--paper-text);
  }
}
</style>
