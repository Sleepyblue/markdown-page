<template>
  <section ref="section" class="spotlight">
    <SpotlightMarkdown />
      <p v-html="description" />
      <em :key="currentSentenceIndex" v-html="currentSentence" />
    </div>
  </section>
</template>

<script setup lang="ts">
import useSectionObserver from "../../composables/useSectionObserver";
import SpotlightMarkdown from "../../docs/SpotlightMarkdown.md"

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
    "--typing-steps",
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
    const listItems = section.value.querySelectorAll("li");
    const sentencesList = Array.from(listItems).map(
      (li) => li.innerHTML?.trim() || "",
    );
    const paragraph = section.value.querySelector("p");

    sentences.value = sentencesList;
    description.value = paragraph?.innerHTML || "";
  }

  if (sentences.value.length > 0) {
    currentSentence.value = sentences.value[currentSentenceIndex.value];
  }

  updateSentence();
  setInterval(updateSentence, 20000);
});

});
</script>

<style>
:root {
  --typing-steps: 40;
}


.spotlight .markdown-body ul,
.spotlight .markdown-body p {
  display: none;

}

.spotlight {
  overflow: hidden;
}

h1 {
  /* margin-top: 48px; */
  font-size: 12rem;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 9.6rem;
  }

  @media (max-width: 600px) {
    font-size: 4.8rem;
  }

}

strong {
  font-weight: 700;
}

section div {
  display: flex;
  width: max-content;
  white-space: nowrap;
  line-height: 1.2;

  @media (max-width: 1280px) {
    flex-direction: column;
    line-height: 1.6;
  }
}

p {
  font-size: 3.2rem;
  font-family: "Cormorand Garamond";

  &::after {
    content: "\00a0";
  }

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

}

em {
  font-family: "Cormorand Garamond";
  font-size: 3.2rem;
  position: relative;
  display: inline-block;
  overflow: hidden;
  animation: blink 1s infinite, typing 5s steps(var(--typing-steps)) infinite;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border-right: 10px solid transparent;
  }

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }
}

@keyframes blink {
  0% {
    border-right: 20px solid var(--paper-highlight);
  }

  50% {
    border-right: 20px solid transparent;
  }

  100% {
    border-right: 20px solid var(--paper-highlight);
  }
}

@keyframes typing {
  0% {
    width: 0;
  }

  60% {
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
