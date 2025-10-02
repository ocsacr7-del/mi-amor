document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('bgm');
  if (!audio) return;

  // Ensure looping
  audio.loop = true;

  // Restore state
  const savedTime = parseFloat(localStorage.getItem('bgm-currentTime') || '0');
  const wasPlaying = localStorage.getItem('bgm-playing') === 'true';

  function restorePlayback() {
    if (!Number.isNaN(savedTime) && savedTime > 0) {
      try { audio.currentTime = savedTime; } catch (_) {}
    }
    if (wasPlaying || audio.autoplay) {
      audio.play().catch(() => {});
    }
  }

  if (audio.readyState >= 1) {
    restorePlayback();
  } else {
    audio.addEventListener('loadedmetadata', restorePlayback, { once: true });
  }

  // Persist state
  let lastSaved = 0;
  audio.addEventListener('timeupdate', function () {
    const t = audio.currentTime;
    if (Math.abs(t - lastSaved) >= 1) {
      lastSaved = t;
      localStorage.setItem('bgm-currentTime', String(t));
    }
  });

  function persistPlayState() {
    localStorage.setItem('bgm-playing', String(!audio.paused));
    localStorage.setItem('bgm-currentTime', String(audio.currentTime));
  }

  audio.addEventListener('play', persistPlayState);
  audio.addEventListener('pause', persistPlayState);
  audio.addEventListener('ended', persistPlayState);
  window.addEventListener('beforeunload', persistPlayState);
});
