<template>
  <PageHeader :current-section="currentSection" :show-scroll-to-top="showScrollToTop"
    :intersection-ratio="intersectionRatio">
    <HeaderMarkdown />
  </PageHeader>
  <main>
    <SpotlightSection @scroll-past="handleScrollPast" @visible-section="updateVisibleSection" />
    <OutlineSection @visible-section="updateVisibleSection" />
    <CraftSection @visible-section="updateVisibleSection" />
    <OnDeskSection @visible-section="updateVisibleSection" />
  </main>
  <PageFooter @footer-emit="updateHeaderButtonsPosition" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";
import SpotlightSection from "./components/SpotlightSection/SpotLightSection.vue";
import OutlineSection from "./components/OutlineSection/OutlineSection.vue";
import CraftSection from "./components/CraftSection/CraftSection.vue";
import OnDeskSection from "./components/OnDeskSection/OnDeskSection.vue";
import PageFooter from "./components/PageFooter/PageFooter.vue";
import HeaderMarkdown from "./docs/HeaderMarkdown.md";

const showScrollToTop = ref(false);
const currentSection = ref<string | null>("");
const intersectionRatio = ref<number | null>(0)

const handleScrollPast = (show: boolean) => {
  showScrollToTop.value = show;
};

const updateVisibleSection = (sectionId: string | null) => {
  currentSection.value = sectionId;
};

const updateHeaderButtonsPosition = (ratio: number | null) => {
  intersectionRatio.value = ratio;
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-body);
  padding: var(--padding-main);
}
</style>
