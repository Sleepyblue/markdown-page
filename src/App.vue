<template>
  <Header :showScrollToTop="showScrollToTop" />
  <main>
    <Intro @scroll-past="handleScrollPast" />
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
</script>

<style></style>
