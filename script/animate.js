window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "lines, words, chars",
    tagName: "span",
  });

  document.querySelectorAll("[text-split] .line").forEach((line) => {
    line.classList.add("full-height-line");
  });

  // Updated function to accept different start positions
  function createScrollTrigger(triggerElement, timeline, startPosition) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
    });
    // Play tl when scrolled into view with a variable start position
    ScrollTrigger.create({
      trigger: triggerElement,
      start: `top ${startPosition}`,
      onEnter: () => timeline.play(),
    });
  }

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: { amount: 0.3 },
    });
    createScrollTrigger($(this), tl, "80%");
  });

  $("[letters-up-center]").each(function (index) {
    let tl = gsap.timeline({ paused: true });

    let lines = $(this).find(".line");

    lines.each(function () {
      let chars = $(this).find(".char");

      tl.fromTo(
        chars,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: { from: "center", amount: 0.2 },
          duration: 0.5,
        },
        "<0.2"
      );
    });

    createScrollTrigger($(this), tl, "80%");
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
