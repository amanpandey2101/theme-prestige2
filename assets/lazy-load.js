// Simple lazy loading for images with data-src
(function(){
  if (!('IntersectionObserver' in window)) {
    // Fallback: immediately load all images
    document.querySelectorAll('img[data-src]').forEach(function(img){
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
    return;
  }

  function onIntersect(entries, observer) {
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        var img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    var imageObserver = new IntersectionObserver(onIntersect, { rootMargin: '200px 0px' });
    images.forEach(function(img){ imageObserver.observe(img); });
  });
})(); 