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
    let randomIndex;
    
    // Ensure we don't play the same animation twice in a row
    do {
      randomIndex = Math.floor(Math.random() * animationFiles.length);
    } 
    while (randomIndex === currentIndex && animationFiles.length > 1);
    currentIndex = randomIndex;
    player.load(animationFiles[randomIndex]);
  }

  // Set container height after first animation loads to prevent jumping
  player.addEventListener('ready', () => {
    if (!heightSet) {
      setContainerHeight();
    }
  });

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

  // Change animation after each loop completes
  player.addEventListener('complete', () => {
    playRandomAnimation()
  });

  // Start with a random animation
  playRandomAnimation();
};

// Make function available globally
window.initRandomAnimationPlayer = initRandomAnimationPlayer;