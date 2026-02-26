// gsap.js
// Remember to include GSAP before this file:
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
// or latest: https://cdn.jsdelivr.net/npm/gsap@latest/dist/gsap.min.js

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.warn("GSAP not loaded – button animations skipped.");
    return;
  }

  // ─── Shared elements ───
  const form       = document.querySelector('form');
  const submitBtn  = document.querySelector('button[type="submit"]');
  const card       = document.querySelector('.form-card');
  const alert      = document.querySelector('.alert');

  if (!submitBtn || !form) return;

  // ─── Button states ───
  let isSubmitting = false;

  // Press / click feedback
  function playButtonPress() {
    gsap.to(submitBtn, {
      scale: 0.94,
      duration: 0.18,
      ease: "power2.out"
    });
  }

  function playButtonReleaseSuccess() {
    gsap.to(submitBtn, {
      scale: 1,
      duration: 0.32,
      ease: "back.out(1.6)"
    });
  }

  function playButtonReleaseNormal() {
    gsap.to(submitBtn, {
      scale: 1,
      duration: 0.28,
      ease: "power2.out"
    });
  }

  // ─── Loading / processing animation ───
  function startLoadingAnimation() {
    isSubmitting = true;
    submitBtn.disabled = true;

    gsap.to(submitBtn, {
      scale: 0.96,
      background: "linear-gradient(90deg, #667eea, #5a67d8, #667eea)",
      backgroundSize: "200% 100%",
      duration: 1.4,
      ease: "none",
      repeat: -1
    });

    // Optional: pulse text or show spinner (you can add HTML spinner later)
    gsap.to(submitBtn, {
      "--pulse": 1.04,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  function stopLoadingAnimation(success = false) {
    isSubmitting = false;
    submitBtn.disabled = false;

    gsap.killTweensOf(submitBtn); // stop gradient & pulse

    gsap.to(submitBtn, {
      scale: success ? 1.06 : 1,
      background: success ? "#38a169" : "#667eea",
      backgroundSize: "100% 100%",
      duration: 0.5,
      ease: success ? "back.out(1.8)" : "power2.out"
    });

    if (success) {
      // Victory bounce
      gsap.to(submitBtn, {
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        delay: 0.15
      });
    }
  }

  // ─── Mouse / touch events for press feel ───
  submitBtn.addEventListener('mousedown', playButtonPress);
  submitBtn.addEventListener('touchstart', playButtonPress, { passive: true });

  submitBtn.addEventListener('mouseup', playButtonReleaseNormal);
  submitBtn.addEventListener('touchend', playButtonReleaseNormal);

  submitBtn.addEventListener('mouseleave', playButtonReleaseNormal);

  // ─── Form submit interception for animation control ───
  form.addEventListener('submit', (e) => {
    // Only animate if client-side validation passed
    if (!form.checkValidity()) {
      // Optional: shake card or button on invalid submit
      gsap.to(card, {
        x: -8,
        duration: 0.07,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut"
      });
      return;
    }

    // Start loading look
    startLoadingAnimation();

    // Because this is a real form submit → page will reload/redirect
    // We can't easily detect PHP success here without AJAX.
    // For demo: simulate success after 1.8s (remove in production)
    // setTimeout(() => {
    //   stopLoadingAnimation(true);
    // }, 1800);

    // In real app → use fetch/AJAX → then call stopLoadingAnimation(true/false)
  });

  // ─── React to alert appearance (success / error) ───
  const observer = new MutationObserver(() => {
    if (alert && alert.textContent.trim()) {
      const isSuccess = alert.classList.contains('success');

      stopLoadingAnimation(isSuccess);

      // Extra flair on success
      if (isSuccess) {
        gsap.to(submitBtn, {
          scale: 1.12,
          duration: 0.6,
          ease: "elastic.out(1.1, 0.4)"
        });
      }
    }
  });

  if (alert) {
    observer.observe(alert, { childList: true, subtree: true, characterData: true });
  }

  // ─── Optional: hover shine (already had scale, now + shine) ───
  submitBtn.addEventListener('mouseenter', () => {
    if (isSubmitting) return;
    gsap.to(submitBtn, {
      scale: 1.04,
      boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  submitBtn.addEventListener('mouseleave', () => {
    if (isSubmitting) return;
    gsap.to(submitBtn, {
      scale: 1,
      boxShadow: "none",
      duration: 0.5,
      ease: "power2.inOut"
    });
  });

  console.log("Button press & loading animations ready 🔥");
});