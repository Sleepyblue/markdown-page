import { onMounted, type Ref } from "vue";

interface SectionObserverType {
  section: Ref<HTMLElement | null>;
  sectionEmit?: (event: "visible-section", value: string | null) => void;
  scrollTopEmit?: (event: "scroll-past", value: boolean) => void;
  footerEmit?: (event: "footer-emit", value: number | null) => void;
  threshold?: number | number[];
}

export default function useSectionObserver({
  section,
  sectionEmit,
  scrollTopEmit,
  footerEmit,
  threshold = 0.8,
}: SectionObserverType) {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (footerEmit) {
      footerEmit("footer-emit", entry.intersectionRatio);
    }

    if (entry.isIntersecting && sectionEmit) {
      sectionEmit("visible-section", entry.target.id);
    }

    if (scrollTopEmit) {
      scrollTopEmit("scroll-past", !entry.isIntersecting);
    }
  };

  onMounted(() => {
    const thresholdValue = Array.isArray(threshold) ? threshold : [threshold];
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: thresholdValue,
    });

    if (section.value) observer.observe(section.value);
  });
}
