"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function MotionShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>(".motion-reveal"));
    let observer: IntersectionObserver | undefined;

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    revealItems.forEach((item) => observer?.observe(item));

    const heroTitle = root.querySelector<HTMLElement>(".hero-title");
    const heroOrbit = root.querySelector<HTMLElement>(".hero-orbit");
    const interiorTitle = root.querySelector<HTMLElement>(".interior-title");
    const drifting = Array.from(root.querySelectorAll<HTMLElement>("[data-drift]"));
    const desktop = window.matchMedia("(min-width: 769px)").matches;
    let frame = 0;
    let visualScroll = window.scrollY;
    let resizeObserver: ResizeObserver | undefined;

    const syncHeight = () => {
      if (desktop) document.body.style.height = `${root.scrollHeight}px`;
    };

    const applyMotion = (scrollPosition: number) => {
      if (heroTitle && scrollPosition < window.innerHeight * 1.3) {
        heroTitle.style.transform = `translate3d(0, ${scrollPosition * 0.09}px, 0)`;
      }
      if (heroOrbit && scrollPosition < window.innerHeight * 1.3) {
        heroOrbit.style.transform = `translate3d(0, ${scrollPosition * 0.045}px, 0) rotate(${scrollPosition * 0.012}deg)`;
      }
      if (interiorTitle && scrollPosition < window.innerHeight * 1.15) {
        interiorTitle.style.transform = `translate3d(0, ${scrollPosition * 0.065}px, 0)`;
      }
      drifting.forEach((item) => {
        const center = item.getBoundingClientRect().top + item.offsetHeight / 2 - window.innerHeight / 2;
        const direction = Number(item.dataset.drift ?? 1);
        const distance = Math.max(-22, Math.min(22, center * -0.026 * direction));
        item.style.transform = `translate3d(${distance}px, 0, 0)`;
      });
    };

    const onHashClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const target = root.querySelector<HTMLElement>(link.getAttribute("href") ?? "");
      if (!target) return;
      event.preventDefault();
      const destination = target.getBoundingClientRect().top + visualScroll;
      window.scrollTo({ top: destination, behavior: "smooth" });
    };
    const hashLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    hashLinks.forEach((link) => link.addEventListener("click", onHashClick));

    if (desktop) {
      document.documentElement.classList.add("smooth-active");
      syncHeight();
      resizeObserver = new ResizeObserver(syncHeight);
      resizeObserver.observe(root);
      document.fonts?.ready.then(syncHeight);

      const animate = () => {
        const target = window.scrollY;
        visualScroll += (target - visualScroll) * 0.075;
        if (Math.abs(target - visualScroll) < 0.08) visualScroll = target;
        root.style.transform = `translate3d(0, ${-visualScroll}px, 0)`;
        applyMotion(visualScroll);
        frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    } else {
      const onScroll = () => applyMotion(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        observer?.disconnect();
        hashLinks.forEach((link) => link.removeEventListener("click", onHashClick));
        window.removeEventListener("scroll", onScroll);
        [heroTitle, heroOrbit, interiorTitle, ...drifting].forEach((item) => item?.style.removeProperty("transform"));
      };
    }

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      hashLinks.forEach((link) => link.removeEventListener("click", onHashClick));
      document.documentElement.classList.remove("smooth-active");
      document.body.style.removeProperty("height");
      root.style.removeProperty("transform");
      [heroTitle, heroOrbit, interiorTitle, ...drifting].forEach((item) => item?.style.removeProperty("transform"));
    };
  }, []);

  return <div id="smooth-root" ref={rootRef}>{children}</div>;
}
