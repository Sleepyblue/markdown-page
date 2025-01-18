<script setup lang="ts">
import HeaderMarkdown from "../../docs/HeaderMarkdown.md"

</script>

<template>
  <header ref="header">
    <nav>
      <HeaderMarkdown />
    </nav>
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
  </header>
</template>

<style>
header {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  @media screen and (max-width: 1024px) {
    grid-template-columns: minmax(max-content, 100px) repeat(2, 1fr);
  }

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
    padding: 0;
    list-style: none;

    @media screen and (max-width: 1024px) {
      gap: 16px;
    }
  }

  button,
  a {
    white-space: nowrap;
  }

  a {
    position: relative;
    text-decoration: none;
  }

  a::after {
    position: absolute;
    content: "";
    background-color: var(--paper-text);
    height: 1px;
    width: 0;
    left: inherit;
    right: 0;
    bottom: 0;
    transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
  }


  a:hover::after {
    transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
    width: 100%;
    left: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--paper-text);
    cursor: pointer;
    padding: 0;
    position: relative;
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
