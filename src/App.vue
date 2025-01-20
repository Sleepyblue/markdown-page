<template>
  <PageHeader :current-section="currentSection">
    <HeaderMarkdown />
  </PageHeader>
  <main>
    <SpotlightSection @scroll-past="handleScrollPast" @visible-section="updateVisibleSection" />
    <OutlineSection @visible-section="updateVisibleSection" />
    <CraftSection @visible-section="updateVisibleSection" />
    <OnDeskSection @visible-section="updateVisibleSection" />
    <button v-if="showScrollToTop" @click="scrollToTop" aria-label="Scroll to the top">
      Top
    </button>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";
import SpotlightSection from "./components/SpotlightSection/SpotLightSection.vue";
import OutlineSection from "./components/OutlineSection/OutlineSection.vue";
import CraftSection from "./components/CraftSection/CraftSection.vue";
import OnDeskSection from "./components/OnDeskSection/OnDeskSection.vue";
import HeaderMarkdown from "./docs/HeaderMarkdown.md";

const showScrollToTop = ref(false);
const currentSection = ref<string | null>("");

const handleScrollPast = (show: boolean) => {
  showScrollToTop.value = show;
};

const updateVisibleSection = (sectionId: string | null) => {
  currentSection.value = sectionId;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style>
/* Remove after filling each section appropriately */
h2,
section {
  height: 100vh;
}

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
