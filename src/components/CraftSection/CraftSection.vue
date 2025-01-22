<template>
  <section ref="section" id="craft-section">
    <CraftMarkdown />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";
import CraftMarkdown from "../../docs/CraftMarkdown.md"

const section = ref(null);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });
</script>

<style>
#craft-section .markdown-body {
  counter-reset: item 0;


  details {
    counter-increment: item;
    border-top: 1px dashed var(--paper-text);
    padding: 2rem 0;

    &:last-child {
      border-bottom: 1px dashed var(--paper-text);
    }

    summary {
      display: grid;
      grid-template-columns: 0.3fr 0.7fr;
      align-items: end;
      column-gap: clamp(2rem, 5vw + 1rem, 6rem);
      cursor: pointer;
      font-size: var(--font-size-h2);
      font-weight: 200;

      @media(max-width: 1024px) {
        align-items: start;
      }

      @media(max-width: 600px) {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
    }

    /* Lacks some customization options */
    summary::marker {
      display: none;
    }

    summary::before {
      content: "\\0" counter(item);
      font-size: var(--font-size-before);
      line-height: 1;
      font-weight: 200;
      max-width: max-content;
    }

    summary span {
      position: relative;
      max-width: max-content;
      line-height: 1;
      font-weight: 200;

      &:hover,
      &:focus {
        color: var(--paper-highlighted-text);
      }

      &:before,
      &:after {
        content: "";
        position: absolute;
        z-index: -1;
        height: 100%;
        top: 0;
      }

      &:before {
        width: 3px;
        left: 0;
      }

      &:after {
        width: 3px;
        right: 0;
      }

      &:hover:before,
      &:focus:before {
        width: 50%;
        height: 100%;
        background-color: var(--paper-highlight);
        transition: all 1s cubic-bezier(0.22, 1, 0.36, 1) 0s;
      }

      &:hover:after,
      &:focus:after {
        width: 50%;
        height: 100%;
        background-color: var(--paper-highlight);
        transition: all 1s cubic-bezier(0.22, 1, 0.36, 1) 0s;
      }
    }

    div {
      display: grid;
      grid-template-columns: 0.3fr 0.7fr;
      align-items: start;
      padding: 0 2rem;
      column-gap: clamp(2rem, 5vw + 1rem, 6rem);
      /* border-top: 1px solid var(--paper-text); */

      @media(max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media(max-width: 600px) {
        padding: 0;
      }



      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        font-family: var(--font-type-body);
        grid-row: 1 / 3;


        li,
        a {
          font-weight: 700;
        }

        li:not(:last-child)::after {
          content: "\00a0\00a0";
        }
      }

      p {
        grid-column: 2 / 3;

        @media(max-width: 1024px) {
          grid-column: unset;
        }
      }
    }
  }

  details[open] summary {
    padding-bottom: 2rem;

    &::before,
    span {
      font-weight: 500;
    }
  }
}
</style>
