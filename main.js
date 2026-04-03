(function(){

  function initNavbar(){
    var nav=document.getElementById('navbar');
    var hamburger=document.getElementById('hamburger');
    var navLinks=document.getElementById('navLinks');
    if(!nav)return;

    window.addEventListener('scroll',function(){
      nav.classList.toggle('scrolled',window.scrollY>60);
    },{passive:true});

    hamburger.addEventListener('click',function(){
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    var page=window.location.pathname.split('/').pop()||'index.html';
    navLinks.querySelectorAll('a:not(.nav-cta)').forEach(function(a){
      var href=(a.getAttribute('href')||'').split('/').pop();
      if(href===page||(page===''&&href==='index.html')){
        a.classList.add('active');
      }
    });
  }

  function initHeroAnimations(){
    window.addEventListener('load',function(){
      var eyebrow=document.querySelector('.hero-eyebrow,.page-hero-eyebrow');
      var headlineEl=document.querySelector('#heroHeadline,.page-hero-headline');
      var sub=document.querySelector('.hero-sub,.page-hero-sub');
      var cta=document.getElementById('heroCta');
      var scroll=document.getElementById('heroScroll');

      if(eyebrow)setTimeout(function(){eyebrow.classList.add('visible');},100);

      var words=headlineEl?headlineEl.querySelectorAll('.word'):[];
      words.forEach(function(w,i){
        setTimeout(function(){w.classList.add('revealed');},400+i*130);
      });

      var delay=400+words.length*130;
      if(sub)setTimeout(function(){sub.classList.add('visible');},delay+200);
      if(cta)setTimeout(function(){cta.classList.add('visible');},delay+500);
      if(scroll)setTimeout(function(){scroll.classList.add('visible');},1800);
    });
  }

  var countersRun=false;
  function animateCounters(){
    if(countersRun)return;
    countersRun=true;
    document.querySelectorAll('.stat-number[data-target]').forEach(function(el){
      var target=parseInt(el.dataset.target);
      var suffix=el.dataset.suffix||'';
      var prefix=el.dataset.prefix||'';
      if(target===2013){el.textContent=prefix+'2013'+suffix;return;}
      var duration=1600;
      var startTime=performance.now();
      function step(now){
        var elapsed=now-startTime;
        var progress=Math.min(elapsed/duration,1);
        var eased=1-Math.pow(1-progress,3);
        el.textContent=prefix+Math.round(eased*target)+suffix;
        if(progress<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  function initIntersectionObserver(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        var el=entry.target;

        if(el.dataset.animate==='rule'){
          el.classList.add('visible');
        } else if(
          el.classList.contains('service-card')||
          el.classList.contains('sector-tag')||
          el.classList.contains('value-card')||
          el.classList.contains('sector-card')||
          el.classList.contains('service-detail-item')||
          el.classList.contains('compliance-item')||
          el.classList.contains('process-step')
        ){
          var delay=parseInt(el.dataset.delay||0);
          setTimeout(function(){el.classList.add('visible');},delay);
        } else if(
          el.classList.contains('aos-fade')||
          el.classList.contains('aos-slide-left')||
          el.classList.contains('aos-slide-right')
        ){
          el.classList.add('visible');
        } else if(el.classList.contains('stats-bar')){
          animateCounters();
        }

        io.unobserve(el);
      });
    },{threshold:0.12});

    [
      '[data-animate="rule"]',
      '.service-card','.sector-tag','.value-card',
      '.sector-card','.service-detail-item','.compliance-item','.process-step',
      '.aos-fade','.aos-slide-left','.aos-slide-right',
      '.stats-bar'
    ].forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){io.observe(el);});
    });
  }

  function initGoldRuleOnLoad(){
    window.addEventListener('load',function(){
      setTimeout(function(){
        var firstRule=document.querySelector('.gold-rule');
        if(firstRule)firstRule.classList.add('visible');
      },800);
    });
  }

  function initFormHandler(){
    var form=document.getElementById('quoteForm');
    if(!form)return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('.form-submit');
      var success=document.getElementById('formSuccess');
      btn.textContent='Sending\u2026';
      btn.disabled=true;
      setTimeout(function(){
        form.reset();
        btn.textContent='Submitted';
        if(success)success.style.display='block';
      },900);
    });
  }

  document.addEventListener('DOMContentLoaded',function(){
    initNavbar();
    initHeroAnimations();
    initIntersectionObserver();
    initFormHandler();
    initGoldRuleOnLoad();
  });

})();
