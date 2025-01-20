import { onMounted, type Ref } from "vue";

interface SectionObserverType {
  section: Ref<HTMLElement | null>;
  sectionEmit: (event: "visible-section", value: string | null) => void;
  scrollTopEmit?: (event: "scroll-past", value: boolean) => void;
  threshold?: number;
}

export default function useSectionObserver({
  section,
  sectionEmit,
  scrollTopEmit,
  threshold = 0.8,
}: SectionObserverType) {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (entry.isIntersecting && sectionEmit) {
      sectionEmit("visible-section", entry.target.id);
    }

    if (scrollTopEmit) {
      scrollTopEmit("scroll-past", !entry.isIntersecting);
    }
  };

  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold,
    });

    if (section.value) observer.observe(section.value);
  });
}
