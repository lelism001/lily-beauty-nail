function toggleNavState(isOpen) {
  return !isOpen;
}

function nextIndex(current, length, direction) {
  return (current + direction + length) % length;
}

function getRevealSelectors() {
  return [
    ".page-banner .banner-title",
    ".page-banner .banner-sub",
    ".intro-block",
    ".preview-eyebrow",
    ".preview-sub",
    ".concept-block",
    ".value-item",
    ".gallery-item",
    ".carousel",
    ".staff-card",
    ".menu-category",
    ".faq-item",
    ".access-grid > *",
    ".privacy-item",
  ];
}

if (typeof document !== "undefined") {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    let isOpen = false;
    navToggle.addEventListener("click", () => {
      isOpen = toggleNavState(isOpen);
      siteNav.classList.toggle("is-open", isOpen);
      if (!isOpen) siteNav.classList.remove("showing-contact");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (link.classList.contains("contact-trigger") && window.innerWidth < 768) {
          // Handled separately: swaps the menu content instead of closing it.
          return;
        }
        isOpen = false;
        siteNav.classList.remove("is-open");
        siteNav.classList.remove("showing-contact");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    const mobileContactBack = siteNav.querySelector(".mobile-contact-back");
    if (mobileContactBack) {
      mobileContactBack.addEventListener("click", () => {
        siteNav.classList.remove("showing-contact");
      });
    }
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dots .dot"));
    const prevBtn = carousel.querySelector(".carousel-arrow.prev");
    const nextBtn = carousel.querySelector(".carousel-arrow.next");
    let index = 0;

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    prevBtn.addEventListener("click", () => {
      index = nextIndex(index, slides.length, -1);
      render();
    });

    nextBtn.addEventListener("click", () => {
      index = nextIndex(index, slides.length, 1);
      render();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        render();
      });
    });
  });

  const bottomBar = document.createElement("div");
  bottomBar.className = "bottom-bar";
  bottomBar.innerHTML = `
    <a href="tel:0362641913" class="bottom-bar-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
      <span class="bottom-bar-text">
        <span class="bottom-bar-label">電話</span>
        <span class="bottom-bar-value">03-6264-1913</span>
      </span>
    </a>
    <a href="https://lin.ee/Nxv7NEh" class="bottom-bar-item" target="_blank" rel="noopener noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5c0 4.7-4.5 8.5-10 8.5-.9 0-1.8-.1-2.6-.3L4 21l1-3.8C3.7 15.8 3 13.7 3 11.5 3 6.8 7.5 3 13 3s8 3.8 8 8.5z"/></svg>
      <span class="bottom-bar-text">
        <span class="bottom-bar-label">LINE</span>
        <span class="bottom-bar-value">今すぐ予約</span>
      </span>
    </a>
    <a href="https://www.instagram.com/lilybeautynail/" class="bottom-bar-item" target="_blank" rel="noopener noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>
      <span class="bottom-bar-text">
        <span class="bottom-bar-label">Instagram</span>
        <span class="bottom-bar-value">最新情報をcheck</span>
      </span>
    </a>
  `;
  document.body.appendChild(bottomBar);
  document.body.classList.add("has-bottom-bar");

  const hero = document.querySelector(".hero");
  if (hero && "IntersectionObserver" in window) {
    bottomBar.classList.add("bottom-bar-hidden");
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          bottomBar.classList.toggle("bottom-bar-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  }

  const contactTriggers = document.querySelectorAll(".contact-trigger");
  if (contactTriggers.length) {
    const contactPopover = document.createElement("div");
    contactPopover.className = "contact-popover";
    contactPopover.innerHTML = `
      <a href="tel:0362641913">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
        <span>電話で問い合わせる</span>
      </a>
      <a href="https://lin.ee/Nxv7NEh" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5c0 4.7-4.5 8.5-10 8.5-.9 0-1.8-.1-2.6-.3L4 21l1-3.8C3.7 15.8 3 13.7 3 11.5 3 6.8 7.5 3 13 3s8 3.8 8 8.5z"/></svg>
        <span>LINEで問い合わせる</span>
      </a>
      <a href="https://www.instagram.com/lilybeautynail/" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>
        <span>Instagramで問い合わせる</span>
      </a>
    `;
    document.body.appendChild(contactPopover);

    function closeContactPopover() {
      contactPopover.classList.remove("open");
    }

    function openContactPopover(trigger) {
      const rect = trigger.getBoundingClientRect();
      const estWidth = 230;
      const estHeight = 164;
      let top = rect.bottom + 8;
      if (top + estHeight > window.innerHeight) {
        top = rect.top - estHeight - 8;
      }
      let left = rect.right - estWidth;
      left = Math.max(8, Math.min(left, window.innerWidth - estWidth - 8));
      contactPopover.style.top = `${Math.max(8, top)}px`;
      contactPopover.style.left = `${left}px`;
      contactPopover.classList.add("open");
    }

    contactTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (window.innerWidth < 768) {
          const mobileNav = document.getElementById("site-nav");
          if (mobileNav && mobileNav.contains(trigger)) {
            // Inside the open hamburger menu: swap the link list for the
            // 3 contact options in place, instead of closing the menu and
            // popping open a separate (awkwardly positioned) popover.
            e.preventDefault();
            mobileNav.classList.add("showing-contact");
            return;
          }
          // Elsewhere on mobile (e.g. footer), the bottom bar already offers
          // 電話/LINE/Instagram at all times, so just fall back to the link.
          return;
        }
        e.preventDefault();
        const wasOpenForThisTrigger =
          contactPopover.classList.contains("open") &&
          contactPopover.dataset.trigger === trigger.dataset.triggerId;
        if (wasOpenForThisTrigger) {
          closeContactPopover();
          return;
        }
        contactPopover.dataset.trigger = trigger.dataset.triggerId;
        openContactPopover(trigger);
      });
    });

    contactTriggers.forEach((trigger, i) => {
      trigger.dataset.triggerId = String(i);
    });

    document.addEventListener("click", (e) => {
      if (
        !contactPopover.contains(e.target) &&
        !e.target.closest(".contact-trigger")
      ) {
        closeContactPopover();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeContactPopover();
    });

    window.addEventListener("scroll", closeContactPopover, { passive: true });
    window.addEventListener("resize", closeContactPopover);
  }

  const revealEls = Array.from(
    document.querySelectorAll(getRevealSelectors().join(","))
  );

  if (revealEls.length) {
    revealEls.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }
}

if (typeof module !== "undefined") {
  module.exports = { toggleNavState, nextIndex, getRevealSelectors };
}
