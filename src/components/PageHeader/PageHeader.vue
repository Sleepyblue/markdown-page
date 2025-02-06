<template>
  <header ref="header">
    <div class="action-buttons">
      <button @click.stop="handleClick">
        {{ drawerOpen ? "Close" : "Menu" }}
      </button>
      <button v-if="showScrollToTop" @click.stop="scrollToTop" aria-label="Scroll to the top">
        Top
      </button>
    </div>
    <nav :class="activeSection">
      <slot />
    </nav>
    <div class="theme-buttons">
      <ul>
        <li>
          <button :class="{ selected: selectedTheme === 'light' }" @click="handlePageTheme('light')">
            Paper Light
          </button>
        </li>
        <li>
          <button :class="{ selected: selectedTheme === 'dark' }" @click="handlePageTheme('dark')">
            Ink Dark
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const drawerOpen = ref(false);
const header = ref<HTMLElement | null>(null)
const selectedTheme = ref("");

const props = defineProps<{
  currentSection: string | null;
  showScrollToTop: boolean;
  intersectionRatio: number | null;
}>();

const activeSection = computed(() =>
  props.currentSection?.replace("-section", ""),
);

const headerStyle = computed(() => {
  return drawerOpen.value ? "translateY(0)" : "translateY(102%)";
});

onMounted(() => {
  const prefersLightTheme = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  selectedTheme.value = prefersLightTheme ? "light" : "dark";

  document.addEventListener('touchstart', handleTouchOutside);
});

onUnmounted(() => {
  document.removeEventListener('touchstart', handleTouchOutside);
});

const handlePageTheme = (theme: "light" | "dark") => {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-theme");

  if (currentTheme !== theme) {
    htmlElement.setAttribute("data-theme", theme);
    selectedTheme.value = theme;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (window.location.hash) {
    window.history.replaceState(null, document.title, window.location.pathname);
  }
};

const handleClick = () => {
  drawerOpen.value = !drawerOpen.value;
};

const handleTouchOutside = (event: TouchEvent) => {
  if (!event.changedTouches.length) return;

  const touch = event.touches[0];

  const headerContainer = header.value?.getBoundingClientRect();

  if (!headerContainer) return;

  const isInHeader =
    touch.clientX >= headerContainer.left &&
    touch.clientX <= headerContainer.right &&
    touch.clientY >= headerContainer.top &&
    touch.clientY <= headerContainer.bottom;

  if (!isInHeader) {
    drawerOpen.value = false;
  }
}

const translatePercentage = computed(() => {
  if (!props.intersectionRatio) return "0%";

  const translate = drawerOpen.value
    ? "0%"
    : `-${Math.round(props.intersectionRatio * 100) * 1.3}%`;
  return translate;
});
</script>

<style>
header {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  z-index: 99;
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
  transition: all 0.5s ease;

  @media (max-width: 600px) {
    border-bottom: unset;
    top: unset;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 96%;
    border-top: 1px dashed var(--paper-text);
    border-left: 1px solid var(--paper-text);
    border-right: 1px solid var(--paper-text);
    margin: 0 auto;
    align-items: flex-end;
    transform: v-bind(headerStyle);
    box-shadow: 0 2px 8px rgba(var(--paper-shadow), 0.4);

    .menu-action {
      display: block;
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: "+";
    transform: translateY(50%);
    bottom: 0px;
  }

  @media (max-width: 600px) {

    &::before,
    &::after {
      bottom: unset;
      top: 0;
      transform: translateY(-50%);
    }
  }

  &::before {
    left: -4px;
  }

  &::after {
    right: -4px;
  }

  .action-buttons {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 8px 16px;

    @media (max-width: 600px) {
      top: unset;
      bottom: 100%;
      justify-content: space-between;
      padding: 12px 20px;
      transform: translateY(v-bind(translatePercentage));
      transition: transform 0.1s linear;
    }

    >button {
      color: var(--paper-highlighted-text);
      background-color: var(--paper-highlight);
      padding: 2px 4px;

      &::before,
      &::after {
        top: 0;
        bottom: 0;
        color: var(--paper-highlighted-text);
        background-color: var(--paper-highlight);
      }

      &:hover::before {
        left: -6px;
      }

      &:hover::after {
        right: -6px;
      }
    }

    >button:first-child {
      display: none;

      @media (max-width: 600px) {
        display: block;
      }
    }
  }

  ul {
    display: flex;
    gap: 32px;
    padding: 0;
    list-style: none;

    @media screen and (max-width: 1024px) {
      gap: 24px;
    }

    @media (max-width: 600px) {
      gap: 16px;
      flex-direction: column;
    }
  }

  .theme-buttons ul {
    align-items: flex-end;
  }

  button,
  a {
    white-space: nowrap;
  }

  a {
    position: relative;
    text-decoration: none;
    text-underline-offset: 3px;
  }

  .outline a[href="#outline"],
  .craft a[href="#craft"],
  .on-desk a[href="#on-desk"] {
    text-decoration: underline;
    text-decoration-thickness: 2px;
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
    transition: all 1s var(--transition-timing-function);
  }

  nav:not(.outline) a[href="#outline"]:hover::after,
  nav:not(.craft) a[href="#craft"]:hover::after,
  nav:not(.on-des) a[href="#on-desk"]:hover::after {
    transition: all 1s var(--transition-timing-function);
    width: 100%;
    left: 0;
  }

  .theme-buttons {
    .selected::before {
      left: -10px;
      opacity: 1;
    }

    .selected::after {
      right: -10px;
      opacity: 1;
    }
  }
}
</style>
