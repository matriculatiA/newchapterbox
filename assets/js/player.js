// NewChapterBox — shared play/pause logic for the single-audio "ritual" panel.
// No dependencies. Works with any <audio id="ritual-audio"> + button#ritual-play on the page.

(function () {
  var audio = document.getElementById('ritual-audio');
  var button = document.getElementById('ritual-play');
  var status = document.getElementById('ritual-status');
  var fill = document.getElementById('ritual-progress-fill');
  var time = document.getElementById('ritual-time');
  var closing = document.getElementById('ritual-closing');

  if (!audio || !button) return;

  var STATUS_IDLE = button.dataset.statusIdle || 'Натисни, за да пуснеш';
  var STATUS_PLAYING = button.dataset.statusPlaying || 'Слуша се...';
  var STATUS_PAUSED = button.dataset.statusPaused || 'На пауза';
  var STATUS_ENDED = button.dataset.statusEnded || 'Пусни отново';

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateTime() {
    if (!time) return;
    var current = formatTime(audio.currentTime);
    var duration = audio.duration && isFinite(audio.duration) ? formatTime(audio.duration) : '--:--';
    time.textContent = current + ' / ' + duration;
  }

  button.addEventListener('click', function () {
    if (audio.paused) {
      audio.play().catch(function (err) {
        setStatus('Аудиото не можа да се пусне.');
        console.error('Playback failed:', err);
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function () {
    button.classList.add('is-playing');
    setStatus(STATUS_PLAYING);
    if (closing) closing.classList.remove('is-visible');
  });

  audio.addEventListener('pause', function () {
    button.classList.remove('is-playing');
    if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
      setStatus(STATUS_PAUSED);
    }
  });

  audio.addEventListener('ended', function () {
    button.classList.remove('is-playing');
    setStatus(STATUS_ENDED);
    if (fill) fill.style.width = '0%';
    if (closing) closing.classList.add('is-visible');
  });

  audio.addEventListener('timeupdate', function () {
    if (fill && audio.duration) {
      fill.style.width = ((audio.currentTime / audio.duration) * 100).toFixed(1) + '%';
    }
    updateTime();
  });

  audio.addEventListener('loadedmetadata', updateTime);

  setStatus(STATUS_IDLE);
  updateTime();
})();
