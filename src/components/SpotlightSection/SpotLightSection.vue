<template>
  <section ref="section" class="spotlight">
    <div class="container">
      <slot />
      <div class="typewriter">
        <p v-html="description" />
        <em :key="currentSentenceIndex" v-html="currentSentence" />
      </div>
    </div>
    <div class="sprite">
      <pre>{{ currentSprite }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, onUnmounted, ref } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";
import { sprites } from "./sprite.ts";

const section = ref<HTMLElement | null>(null);
const sentences = ref<string[]>([]);
const description = ref("");
const currentSentence = ref<string | null>("");
const currentSentenceIndex = ref(0);
const isFirstRender = ref(true);

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
  (e: "scroll-past", value: boolean): void;
}>();

useSectionObserver({
  section,
  sectionEmit: emit,
  scrollTopEmit: emit,
  threshold: 0.15,
});

const updateSentence = () => {
  if (!sentences.value.length) return;

  const sentenceLength = currentSentence.value?.length || 0;
  document.documentElement.style.setProperty(
    "--initial-typing-steps",
    sentenceLength.toString(),
  );
  if (isFirstRender.value) {
    isFirstRender.value = false;
    return;
  }
  currentSentenceIndex.value =
    (currentSentenceIndex.value + 1) % sentences.value.length;
  currentSentence.value = sentences.value[currentSentenceIndex.value];
};

onMounted(() => {
  if (section.value) {
    const sentencesList = section.value.querySelector(".markdown-body ul");
    const paragraph = section.value.querySelector("p");

    if (!sentencesList) return;

    sentences.value = [...sentencesList.children].map(
      (li) => li.innerHTML?.trim() || "",
    );
    description.value = paragraph?.innerHTML || "";

    sentencesList.remove();
    paragraph?.remove();
  }

  if (sentences.value.length > 0) {
    currentSentence.value = sentences.value[currentSentenceIndex.value];
  }

  updateSentence();
  setInterval(updateSentence, 20000);
});

const currentSprite = ref(sprites[0]);
const index = ref(0);

const updateSprite = () => {
  index.value = (index.value + 1) % sprites.length;
  currentSprite.value = sprites[index.value];
};

const interval = ref(0);
onMounted(() => {
  interval.value = setInterval(updateSprite, 800);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<style>
.spotlight {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-section);

  .markdown-body {

    ul,
    p {
      display: none;
    }
  }

  h1 {
    line-height: 1.2;
  }

  .typewriter {
    display: flex;
    width: max-content;
    white-space: nowrap;
    line-height: 1.3;

    @media (max-width: 600px) {
      flex-direction: column;
      line-height: 1.2;
    }

    p {
      font-size: var(--font-size-description);

      &::after {
        content: "\00a0";
      }
    }

    strong {
      font-weight: 700;
    }

    em {
      font-size: var(--font-size-description);
      position: relative;
      overflow: hidden;
      animation:
        blink 1s infinite,
        typing 20s steps(var(--initial-typing-steps)) infinite;
      z-index: 1;

      &::after {
        content: "";
        width: 100%;
        height: 100%;
        border-right: 10px solid transparent;
      }
    }
  }

  .sprite {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    pre {
      line-height: 1.3;
    }
  }
}

@keyframes blink {
  0% {
    border-right: var(--border-width) solid var(--paper-highlight);
  }

  50% {
    border-right: var(--border-width) solid transparent;
  }

  100% {
    border-right: var(--border-width) solid var(--paper-highlight);
  }
}

@keyframes typing {
  0% {
    width: 0;
  }

  20% {
    width: 100%;
  }

  80% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}
</style>
