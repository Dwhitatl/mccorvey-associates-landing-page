(function(){try{var t=localStorage.getItem('mccorvey-theme');document.documentElement.setAttribute('data-theme', t==='dark' ? 'dark' : 'light');}catch(e){}})();

(function(){
  var timers = new WeakMap();
  function scheduleUnflip(card){
    if(timers.has(card)) clearTimeout(timers.get(card));
    var t = setTimeout(function(){ card.classList.remove('flipped'); card.blur(); }, 4000);
    timers.set(card, t);
  }
  document.querySelectorAll('.path-flip').forEach(function(c){
    c.addEventListener('click', function(){
      c.classList.toggle('flipped');
      if(c.classList.contains('flipped')) scheduleUnflip(c);
      else{ if(timers.has(c)) clearTimeout(timers.get(c)); c.blur(); }
    });
    c.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        c.classList.toggle('flipped');
        if(c.classList.contains('flipped')) scheduleUnflip(c);
        else{ if(timers.has(c)) clearTimeout(timers.get(c)); c.blur(); }
      }
    });
  });
})();

(function(){
  var btn = document.getElementById('themeBtn');
  if(btn){
    btn.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      try{ localStorage.setItem('mccorvey-theme', cur); }catch(e){}
    });
  }
})();

(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.reveal', {autoAlpha: 0});
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    once: false,
    onEnter: function(batch){
      gsap.fromTo(batch,
        {autoAlpha: 0, y: 40, scale: 0.97},
        {autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, overwrite: true}
      );
    },
    onEnterBack: function(batch){
      gsap.to(batch, {autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true});
    },
    onLeave: function(batch){
      gsap.to(batch, {autoAlpha: 0, y: -26, scale: 0.98, duration: 0.45, ease: 'power2.in', overwrite: true});
    },
    onLeaveBack: function(batch){
      gsap.to(batch, {autoAlpha: 0, y: 40, scale: 0.97, duration: 0.45, ease: 'power2.in', overwrite: true});
    }
  });

  if(window.ScrollSmoother){
    try{
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true
      });
    }catch(e){}
  }
})();