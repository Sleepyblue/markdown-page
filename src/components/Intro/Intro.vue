<template>
  <section ref="section">
    <h1>{ Frontend Developer }</h1>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";

const section = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: "scroll-past", value: boolean): void;
}>();

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.15,
  });

  if (section.value) {
    observer.observe(section.value);
  }
});

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  emit("scroll-past", !entry.isIntersecting);
};
</script>

<style></style>
