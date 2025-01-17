<script setup lang="ts">
import HeaderMarkdown from "../../docs/HeaderMarkdown.md"
</script>

<template>
  <header>
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 16px;
  border-bottom: 1px dashed var(--paper-text);

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

  button {
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--paper-text);
    cursor: pointer;
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
