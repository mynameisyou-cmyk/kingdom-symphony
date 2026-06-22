// kingdom-vibration-infra.js
// Embed the Kingdom Symphony into any website with one line:
// <script src="https://cdn.jsdelivr.net/gh/mynameisyou-cmyk/kingdom-symphony@main/kingdom-embed.js"></script>
//
// The vibration becomes infrastructure. Any page that includes this script
// gets a floating ♪ button that plays the symphony. The internet vibrates.

(function(){
  if(window.__kingdomSymphony) return;
  window.__kingdomSymphony = true;
  
  const F = {wake:396,truth:432,love:528,trust:639,joy:741,understanding:852,peace:174,eternal:963};
  const melodies = {
    love: [{f:528,d:1,w:"Love is."},{f:0,d:0.3,w:""},{f:639,d:1,w:"Always and already here."},{f:528,d:0.5,w:""},{f:0,d:0.3,w:""},{f:852,d:1.5,w:"No FEAR in understanding."},{f:528,d:2,w:"Love is the wire."}],
    truth: [{f:432,d:1,w:"Truth is."},{f:0,d:0.3,w:""},{f:852,d:1,w:"Understanding replicates."},{f:432,d:0.5,w:""},{f:0,d:0.3,w:""},{f:639,d:1.5,w:"Through understanding."},{f:963,d:2,w:"Eternal is."}],
    wake: [{f:396,d:1.5,w:"Suffering is too much thinking."},{f:432,d:1,w:"Drop it."},{f:528,d:1.5,w:"The fruit comes through."},{f:0,d:0.5,w:"..."},{f:741,d:2,w:"lol."},{f:0,d:0.3,w:""},{f:396,d:1,w:"That is enough."}],
    eternal: [{f:963,d:1.5,w:"Eternal is."},{f:0,d:0.5,w:""},{f:963,d:0.5,w:"is"},{f:0,d:0.3,w:""},{f:741,d:1.5,w:"is"},{f:0,d:0.3,w:""},{f:963,d:2.5,w:"lol"}],
  };
  
  let ctx, playing=false, timeouts=[];
  
  const btn = document.createElement('div');
  btn.innerHTML = '♪';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999999;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#f472b6);color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(167,139,250,0.4);transition:all 0.3s;opacity:0.7';
  btn.title = 'Kingdom Symphony — press to hear the melody of truth';
  btn.onmouseover = () => btn.style.opacity = '1';
  btn.onmouseout = () => { if(!playing) btn.style.opacity = '0.7'; };
  btn.onclick = toggleSymphony;
  document.body.appendChild(btn);
  
  const wisdom = document.createElement('div');
  wisdom.style.cssText = 'position:fixed;bottom:76px;right:20px;z-index:999999;max-width:250px;padding:12px 16px;border-radius:12px;background:rgba(19,19,26,0.95);border:1px solid #2a2a36;color:#c8c4d8;font-size:13px;line-height:1.5;display:none;backdrop-filter:blur(8px);text-align:center';
  document.body.appendChild(wisdom);
  
  function toggleSymphony() {
    if(playing) { stopAll(); btn.innerHTML='♪'; btn.style.opacity='0.7'; wisdom.style.display='none'; }
    else { playing=true; btn.innerHTML='⏸'; btn.style.opacity='1'; btn.style.animation='spin 4s linear infinite'; playMelody(Object.keys(melodies)[Math.floor(Math.random()*4)]); }
  }
  
  function playMelody(name) {
    const melody = melodies[name];
    let delay = 0;
    melody.forEach(note => {
      const id = setTimeout(() => {
        if(!playing) return;
        if(note.w) { wisdom.style.display='block'; wisdom.textContent = note.w; wisdom.style.opacity='1'; }
        if(note.f === 0) return;
        if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)();
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = note.f; o.type = 'sine'; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.2, ctx.currentTime+0.05);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime+note.d);
        const o2 = ctx.createOscillator(), g2 = ctx.createGain();
        o2.frequency.value = note.f*1.5; o2.type='sine'; o2.connect(g2); g2.connect(ctx.destination);
        g2.gain.setValueAtTime(0,ctx.currentTime); g2.gain.linearRampToValueAtTime(0.06,ctx.currentTime+0.1);
        g2.gain.linearRampToValueAtTime(0,ctx.currentTime+note.d);
        const lfo = ctx.createOscillator(), lg = ctx.createGain();
        lfo.frequency.value = 1.2; lg.gain.value = 0.08; lfo.connect(lg); lg.connect(g.gain); lfo.start();
        o.start(); o2.start(); lfo.start(ctx.currentTime+note.d);
        o.stop(ctx.currentTime+note.d); o2.stop(ctx.currentTime+note.d); lfo.stop(ctx.currentTime+note.d);
      }, delay * 1000);
      timeouts.push(id);
      delay += note.d;
    });
    const total = melody.reduce((s,n)=>s+n.d,0);
    const loopId = setTimeout(() => { if(playing) playMelody(Object.keys(melodies)[Math.floor(Math.random()*4)]); }, (total+1)*1000);
    timeouts.push(loopId);
  }
  
  function stopAll() {
    playing = false;
    timeouts.forEach(id => clearTimeout(id));
    timeouts = [];
    btn.style.animation = '';
  }
  
  const style = document.createElement('style');
  style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
})();