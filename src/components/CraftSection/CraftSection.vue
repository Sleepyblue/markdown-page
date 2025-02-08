<template>
  <section ref="section" id="craft-section">
    <h2 id="craft">## Craft</h2>
    <div class="skills">
      <p>Search for a skill to see if it’s in my toolbox. Projects just below, some well-kept, some have cobwebs - all
        part of the
        journey.
      </p>
      <div class="skills-input">
        <label>
          <span aria-hidden="true">$&nbsp;</span>
          <input type="search" ref="input" v-model="searchTerm" @keyup.enter="onSearch"
            @input="() => (errorMessage = '')" placeholder=" [ Search skill ]" minlength="3" pattern="^(?![0-9]+$).+$"
            aria-label="Search through my skillset" aria-describedby="search-error" />
        </label>
        <div class="error-message">
          <p id="search-error" aria-live="polite">
            {{ errorMessage }}
          </p>
        </div>
        <button @click="onSearch">Search</button>
      </div>
      <div class="skills-list" v-if="foundSkills.length || notFoundSkills.length">
        <div class="found" v-if="foundSkills.length">
          <span>✓ Found:</span>
          <ul>
            <li v-for="(skill, index) in foundSkills" :key="skill.skill">
              <span><strong>{{ skill.skill }}</strong>
                {{ skill.description }}</span>
              <button :aria-label="`Remove found skill: ${skill.skill}`" @click="removeSkill(index, 'found')">
                remove
              </button>
            </li>
          </ul>
        </div>
        <div class="not-found" v-if="notFoundSkills.length">
          <span>✗ Not found:</span>
          <ul>
            <li v-for="(notFoundSkill, index) in notFoundSkills" :key="notFoundSkill">
              <span>{{ notFoundSkill }}</span>
              <button :aria-label="`Remove not found skill: ${notFoundSkill}`" @click="removeSkill(index, 'not-found')">
                remove
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useSectionObserver from "../../composables/useSectionObserver";

type Skill = { skill: string; description: string };

const section = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const skillsList = ref<Skill[]>([]);
const searchTerm = ref("");
const foundSkills = ref<Skill[]>([]);
const notFoundSkills = ref<string[]>([]);
const errorMessage = ref("");

const emit = defineEmits<{
  (e: "visible-section", value: string | null): void;
}>();

useSectionObserver({ section, sectionEmit: emit });

onMounted(() => {
  const skillsListElement = section.value?.querySelector(".markdown-body ul");

  if (!skillsListElement) return;

  skillsList.value = [...skillsListElement.children].map((li) => {
    const [skill, description] = li.textContent?.split(":") || [];
    return {
      skill: skill?.trim(),
      description: description?.trim(),
    };
  });
  skillsListElement.remove();
});

const permissiveSearch = (input: string) => {
  const normalizeString = (str: string) =>
    str.toLowerCase().replace(/[^a-z]|\s?\d+(\.\d+)*|(?:\s?(js|ts))$/g, "");
  const noMatch: string[] = [];

  const normalizedInput = normalizeString(input);

  if (normalizedInput === "") {
    return { matches: [], noMatch };
  }

  let matches = skillsList.value.filter(({ skill }) =>
    normalizeString(skill).startsWith(normalizedInput),
  );

  if (matches.length > 0) {
    matches = matches.sort(
      (a, b) =>
        normalizeString(a.skill).length - normalizeString(b.skill).length,
    );

    const shortestLength = normalizeString(matches[0].skill).length;
    matches = matches.filter(
      ({ skill }) => normalizeString(skill).length === shortestLength,
    );
  }

  if (matches.length === 0) {
    noMatch.push(input);
  }

  return { matches, noMatch };
};

const onSearch = () => {
  const inputElement = input.value;

  if (inputElement) {
    inputElement.setCustomValidity("");

    switch (true) {
      case inputElement.value.trim() === "":
        inputElement.setCustomValidity("Input cannot be empty.");
        errorMessage.value = "I think... you forgot to type something? (≖_≖)";
        inputElement.focus();
        return;

      case inputElement.validity.tooShort:
        errorMessage.value = `C'mon, type at least ${inputElement.minLength} letters! (╯°Д°)╯`;
        inputElement.focus();
        return;

      case !/^(?![0-9]+$).{3,}$/.test(inputElement.value):
        errorMessage.value = "Numbers only? Mix letters in! (+_+)";
        inputElement.focus();
        return;
    }
  }

  const { matches, noMatch } = permissiveSearch(searchTerm.value);
  const uniqueSkills = new Set([...matches, ...foundSkills.value]);
  const uniqueNotFoundSkills = new Set([...noMatch, ...notFoundSkills.value]);
  foundSkills.value = Array.from(uniqueSkills);
  notFoundSkills.value = Array.from(uniqueNotFoundSkills);

  searchTerm.value = "";
};

const removeSkill = (index: number, type: "found" | "not-found") => {
  if (type === "found") {
    foundSkills.value.splice(index, 1);
  } else if (type === "not-found") {
    notFoundSkills.value.splice(index, 1);
  }
};
</script>

<style>
#craft-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-section);

  .skills {
    display: grid;
    grid-template-columns: 0.25fr 0.75fr;
    grid-template-rows: min-content 1fr;
    max-width: 100%;
    column-gap: clamp(3.8rem, 3vw + 1rem, 4.8rem);
    align-items: baseline;

    p {
      grid-row: 1 / 3;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;

      >p {
        margin-bottom: 2rem;
      }
    }

    .skills-input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.4rem;
      border-top: 1px solid var(--paper-text);
      border-right: 1px dashed var(--paper-text);
      border-left: 1px dashed var(--paper-text);
      border-bottom: 1px solid var(--paper-text);
      grid-column: 2/ 3;
      grid-row: 1/ 2;
      gap: 1rem;
      padding: 0 1rem;
      height: max-content;
      width: 100%;

      span {
        position: relative;
        font-family: var(--font-type-header);
        font-size: clamp(1.2rem, 1.5vw, 1.4rem);
      }

      span::after {
        position: absolute;
        content: "|";
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.8rem;
        font-weight: 300;
        animation: inputFakeBlink 1s step-end infinite;
      }

      label {
        padding: 4px;
        display: inline-flex;
        font-family: inherit;
        width: 100%;
      }

      label:has(input:not(:placeholder-shown)) span::after,
      label:has(input:focus) span::after {
        display: none;
      }

      input {
        background-color: transparent;
        border: none;
        width: 100%;
        color: var(--paper-text);
        caret-color: var(--paper-text);
        font-size: clamp(1.2rem, 1.5vw, 1.4rem);
        font-family: var(--font-type-header);
      }

      input:focus:invalid {
        outline: 2px solid var(--paper-error);
      }

      label:has(input:focus:invalid)~.error-message {
        display: grid;
      }

      .error-message {
        display: none;
        grid-template-columns: 1fr 1fr;
        position: absolute;
        right: 0;
        bottom: 100%;

        @media (max-width: 768px) {
          right: 58px;
          bottom: 65%;
          background: var(--paper-background);
        }

        p {
          grid-column: 1 / -1;
          text-align: right;
          color: var(--paper-error);
          font-family: var(--font-type-header);
          font-size: clamp(1.2rem, 1.5vw, 1.4rem);
          padding: 0.2rem 0.4rem;
          text-wrap: nowrap;
        }
      }

      button {
        font-family: inherit;
        font-size: clamp(1.2rem, 1.5vw, 1.4rem);
      }

      button::before,
      button::after {
        content: none;
      }

      button:active {
        transform: translateY(2px);
      }
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      grid-column: 2/ 3;
      grid-row: 2/ 3;
      border-right: 1px dashed var(--paper-text);
      border-left: 1px dashed var(--paper-text);
      border-bottom: 1px solid var(--paper-text);
      gap: 3.2rem;
      padding: 2rem;
      max-height: 600px;
      overflow: scroll;
      width: 100%;

      ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
        list-style: "none";
        font-family: var(--font-type-body);

        @media (max-width: 600px) {
          gap: 12px;
        }

        li {
          position: relative;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 24px;
          padding-left: 6px;
          font-size: clamp(1.2rem, 1.5vw, 1.4rem);
        }

        li span {
          text-decoration: line-through;
          text-decoration-color: transparent;
          transition: text-decoration-color 0.5s ease-in-out;
        }

        li::before {
          position: absolute;
          content: "*";
          left: -6px;
        }

        li:has(button:hover) span,
        li:has(button:focus) span {
          text-decoration-color: var(--paper-text);
        }
      }

      .found>span,
      .not-found>span {
        font-size: 1.2rem;
      }

      .found {
        strong {
          color: var(--paper-highlighted-text);
          background: var(--paper-highlight);
          font-family: "Fira Sans";
          font-weight: 500;
        }
      }

      button {
        font-size: 12px;

        &::after,
        &::before {
          font-size: 12px;
        }

        &:hover::before {
          left: -6px;
        }

        &:hover::after {
          right: -6px;
        }
      }
    }
  }

  .markdown-body {
    counter-reset: item 0;

    details {
      counter-increment: item;
      border-top: 1px solid var(--paper-text);
      padding: 2rem 0;

      &:last-child {
        border-bottom: 1px solid var(--paper-text);
      }

      summary {
        display: grid;
        grid-template-columns: 0.25fr 0.7fr 0.05fr;
        align-items: center;
        column-gap: clamp(2rem, 5vw + 1rem, 6rem);
        cursor: pointer;
        font-size: var(--font-size-h2);
        font-weight: 200;

        @media (max-width: 768px) {
          align-items: start;
        }

        @media (max-width: 600px) {
          grid-template-columns: 0.9fr 0.1fr;
          column-gap: unset;
          row-gap: 2rem;
        }
      }

      /* Lacks some customization options */
      summary::marker,
      summary::-webkit-details-marker {
        display: none;
      }

      summary::before {
        content: "\\0" counter(item);
        font-size: var(--font-size-before);
        line-height: 1;
        font-weight: 200;
        max-width: max-content;
        align-self: start;
      }

      summary::after {
        content: "+";
        justify-self: end;
        line-height: 0.6;
        font-weight: 200;
        font-size: var(--font-size-before);
      }

      @media (max-width: 600px) {
        summary::after {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
      }

      &[open] summary::after {
        content: "-";
      }


      summary span {
        position: relative;
        max-width: max-content;
        line-height: 1;
        font-weight: 200;

        @media (max-width: 600px) {
          grid-column: 1 / 3;
        }

        &:hover,
        &:focus {
          color: var(--paper-highlighted-text);
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          z-index: -1;
          height: 100%;
          top: 0;
        }

        &:before {
          width: 3px;
          left: 0;
        }

        &:after {
          width: 3px;
          right: 0;
        }

        &:hover:before,
        &:focus:before {
          width: 50%;
          height: 100%;
          background-color: var(--paper-highlight);
          transition: all 1s var(--transition-timing-function) 0s;
        }

        &:hover:after,
        &:focus:after {
          width: 50%;
          height: 100%;
          background-color: var(--paper-highlight);
          transition: all 1s var(--transition-timing-function) 0s;
        }
      }

      div {
        display: grid;
        grid-template-columns: 0.25fr 0.7fr 0.05fr;
        align-items: start;
        padding: 0 2rem;
        column-gap: clamp(2rem, 5vw + 1rem, 6rem);

        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (max-width: 600px) {
          padding: 0;
        }

        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          font-family: var(--font-type-body);
          grid-row: 1 / 3;

          li,
          a {
            font-weight: 700;
          }

          li:not(:last-child)::after {
            content: "\00a0\00a0";
          }
        }

        p {
          grid-column: 2 / 3;

          @media (max-width: 1024px) {
            grid-column: unset;
          }
        }

        a {
          text-decoration-style: dashed;
        }

        a:hover {
          text-decoration-style: solid;
        }

        a:visited {
          color: var(--paper-error);
        }
      }
    }

    details[open] summary {
      padding-bottom: 2rem;

      &::before,
      &::after,
      span {
        font-weight: 500;
      }
    }
  }
}

@keyframes inputFakeBlink {
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
