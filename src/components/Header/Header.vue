<script setup lang="ts">
import { defineProps } from 'vue';
import HeaderMarkdown from "../../docs/HeaderMarkdown.md"

defineProps({
  showScrollToTop: Boolean,
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


</script>

<template>
  <header ref="header">
    <button v-if="showScrollToTop" @click="scrollToTop">Scroll to the top</button>
    <div class="theme-buttons">
      <ul>
        <li>
          <button>Paper Light</button>
        </li>
        <li>
          <button>Ink Dark</button>
        </li>
      </ul>
    </div>
    <nav>
      <HeaderMarkdown />
    </nav>
  </header>
</template>

<style>
header {
  position: sticky;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 16px;
  border-bottom: 1px dashed var(--paper-text);
  background: var(--paper-background);
  background-image: linear-gradient(45deg,
      rgba(0, 0, 0, 0.04) 25%,
      transparent 25%),
    linear-gradient(-45deg, rgba(0, 0, 0, 0.04) 25%, transparent 25%);
  background-size: 4px 4px;
  background-position:
    0 0,
    2px 2px;


  &::before,
  &::after {
    position: absolute;
    content: "+";
    transform: translateY(50%);
    bottom: 0px;
  }

  &::before {
    left: -10px;
  }

  &::after {
    right: -10px;
  }

  ul {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  >button {
    grid-column: 1 / 2;
    justify-self: start;
  }

  button {
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--paper-text);
    cursor: pointer;
    padding: 0;
  }

  .theme-buttons {
    grid-column: 2 / 3;
    justify-self: center;
  }

  nav {
    grid-column: 3 / 4;
    justify-self: end;
  }

  li {
    position: relative;
  }

  li::before,
  li::after {
    position: absolute;
    font-size: 1.8rem;
    bottom: -2px;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  }

  li::before {
    content: "[";
    left: 0;
  }

  li::after {
    content: "]";
    right: 0;
  }

  li:hover::before {
    left: -10px;
    opacity: 1;
  }

  li:hover::after {
    right: -10px;
    opacity: 1;
  }
}
</style>
