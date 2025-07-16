/**
 * Animation player module for handling random Lottie animations
 */
const initRandomAnimationPlayer = (player, animationFiles) => {
  if (!player) {
    console.error('Animation player element not found');
    return;
  }
  
  const container = player.parentElement;
  let currentIndex = -1; // Track current animation to avoid repeats
  let heightSet = false; // Track if we've set the container height
  let isVisible = false; // Track if animation is in viewport
  let isInitialized = false; // Track if animation has been initialized
  let isPaused = false; // Track manual pause state

  function setContainerHeight() {
    if (container) {
      const playerHeight = player.offsetHeight;
      if (playerHeight > 0) {
        container.style.height = playerHeight + 'px';
        heightSet = true;
      }
    }
  }

  function playRandomAnimation() {
    if (!isVisible || isPaused) return; // Only play if visible and not paused
    
    let randomIndex;
    
    // Ensure we don't play the same animation twice in a row
    do {
      randomIndex = Math.floor(Math.random() * animationFiles.length);
    } 
    while (randomIndex === currentIndex && animationFiles.length > 1);
    currentIndex = randomIndex;
    player.load(animationFiles[randomIndex]);
  }

  function startAnimation() {
    if (!isInitialized) {
      isInitialized = true;
      
      // Set container height after first animation loads to prevent jumping
      player.addEventListener('ready', () => {
        if (!heightSet) {
          setContainerHeight();
        }
      });

      // Change animation after each loop completes
      player.addEventListener('complete', () => {
        playRandomAnimation()
      });
    }
    
    // Start or resume animation
    playRandomAnimation();
  }

  function stopAnimation() {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  }

  // Public API for pause/resume
  const animationController = {
    pause: () => {
      isPaused = true;
      if (player && typeof player.pause === 'function') {
        player.pause();
      }
    },
    
    resume: () => {
      isPaused = false;
      if (isVisible && player && typeof player.play === 'function') {
        player.play();
      }
    },
    
    toggle: () => {
      if (isPaused) {
        animationController.resume();
      } else {
        animationController.pause();
      }
    },
    
    isPaused: () => isPaused,
    isVisible: () => isVisible
  };

  // Intersection Observer to track visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === container) {
        isVisible = entry.isIntersecting;
        
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      }
    });
  }, {
    rootMargin: '0px' // Start animation 50px before entering viewport
  });

  // Start observing the container
  observer.observe(container);

  // Handle window resize to adjust container height
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (heightSet) {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Temporarily remove height constraint to get natural dimensions
        container.style.height = 'auto';
        // Wait for next frame to get accurate dimensions
        requestAnimationFrame(() => {
          setContainerHeight();
        });
      }, 100);
    }
  });

  // Return the animation controller for external use
  return animationController;
};

// Make function available globally
window.initRandomAnimationPlayer = initRandomAnimationPlayer;