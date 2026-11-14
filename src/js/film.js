// Streams films in short chunks so viewers can jump forward and back.
// Safari plays the stream natively; other browsers load hls.js when the film is near the screen.
document.querySelectorAll('video[data-hls]').forEach(function (v) {
  var src = v.getAttribute('data-hls');
  if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = src; return; }
  var started = false;
  function start() {
    if (started) return; started = true;
    var s = document.createElement('script');
    s.src = '/js/hls.light.min.js';
    s.onload = function () {
      if (!window.Hls || !Hls.isSupported()) return;
      var t = v.currentTime, playing = !v.paused;
      var h = new Hls({ startPosition: t || -1 });
      h.loadSource(src); h.attachMedia(v);
      h.on(Hls.Events.MANIFEST_PARSED, function () { if (playing) v.play(); });
    };
    document.head.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { o.disconnect(); start(); } }, { rootMargin: '800px' }).observe(v);
  } else { start(); }
  v.addEventListener('play', start, { once: true });
});
