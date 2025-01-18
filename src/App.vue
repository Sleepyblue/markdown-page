<template>
  <Header />
  <main>
    <Intro @scroll-past="handleScrollPast" />
    <button v-if="showScrollToTop" @click="scrollToTop" aria-label="Scroll to the top">Top</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header/Header.vue";
import Intro from "./components/Intro/Intro.vue"
import IntroMarkdown from "./docs/IntroMarkdown.md"

const showScrollToTop = ref(false);

const handleScrollPast = (show: boolean) => {
  showScrollToTop.value = show;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

</script>

<style>
main {
  display: flex;
  flex-direction: column;

  button {
    position: sticky;
    right: 0;
    bottom: 12px;
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--paper-text);
    cursor: pointer;
    padding: 0;
    align-self: flex-end;
  }

  button::before,
  button::after {
    position: absolute;
    font-size: 1.8rem;
    bottom: 0;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  }

  button::before {
    content: "[";
    left: 0;
  }

  button::after {
    content: "]";
    right: 0;
  }

  button:hover::before {
    left: -10px;
    opacity: 1;

    @media screen and (max-width: 1024px) {
      left: -8px;
    }
  }

  button:hover::after {
    right: -10px;
    opacity: 1;

    @media screen and (max-width: 1024px) {
      right: -8px;
    }
  }
}
</style>
