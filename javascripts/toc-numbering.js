// Mirrors the h2/h3/h4 numbering (see extra.css counters) into the
// "On this page" sidebar TOC, so sidebar entries match the body headings.
document$.subscribe(() => {
    const counters = [0, 0, 0]; // indices: h2, h3, h4
  
    document.querySelectorAll(".md-content h2, .md-content h3, .md-content h4").forEach((h) => {
      const level = parseInt(h.tagName[1], 10) - 2; // h2 -> 0, h3 -> 1, h4 -> 2
      counters[level]++;
      for (let i = level + 1; i < counters.length; i++) counters[i] = 0;
      const number = counters.slice(0, level + 1).join(".");
  
      const id = h.id;
      if (!id) return;
      const tocLink = document.querySelector(
        `.md-sidebar--secondary a.md-nav__link[href="#${CSS.escape(id)}"]`
      );
      if (tocLink) {
        tocLink.textContent = `${number}  ${tocLink.textContent}`;
      }
    });
  });