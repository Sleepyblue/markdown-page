<template>
  <PageHeader :current-section="currentSection" :show-scroll-to-top="showScrollToTop">
    <HeaderMarkdown />
  </PageHeader>
  <main>
    <SpotlightSection @scroll-past="handleScrollPast" @visible-section="updateVisibleSection" />
    <OutlineSection @visible-section="updateVisibleSection" />
    <CraftSection @visible-section="updateVisibleSection" />
    <OnDeskSection @visible-section="updateVisibleSection" />
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
</script>

<style>
/* Remove after filling each section appropriately h2, */
section:not(:first-child) {
  height: 100vh;
}

main {
  display: flex;
  flex-direction: column;
}
</style>
