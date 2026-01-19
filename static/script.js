const audio = document.getElementById('bgMusic');
const tapOverlay = document.getElementById('tapOverlay');

let audioCtx, oscillator, sourceNode;

function ensureAudioContext(){
  if (!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playFallbackTone(){
  ensureAudioContext();
  oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 220;
  gain.gain.value = 0.06;
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  sourceNode = { stop: () => oscillator.stop() };
}

// User must tap the overlay to play. This function runs on that gesture.
async function handleUserPlay(){
  hideTapOverlay();
  // resume AudioContext for WebAudio fallback
  ensureAudioContext();
  if (audioCtx.state === 'suspended') await audioCtx.resume();

  // try to play the audio element if present
  if (audio && audio.src && audio.src.indexOf('static/music.mp3') !== -1){
    try{
      await audio.play();
      return;
    }catch(e){
      // if playing fails, fall back to WebAudio tone
      playFallbackTone();
      return;
    }
  }

  // no file; use fallback tone
  playFallbackTone();
}

function showTapOverlay(){ if (tapOverlay) tapOverlay.classList.add('visible'); }
function hideTapOverlay(){ if (tapOverlay) tapOverlay.classList.remove('visible'); }

// clicking background triggers the overlay click
const bg = document.querySelector('.bg');
if (bg){ bg.addEventListener('click', ()=>{ if (tapOverlay) tapOverlay.click(); }); }

if (tapOverlay){
  // ensure overlay is clickable and visible by default
  tapOverlay.addEventListener('click', handleUserPlay);
}

// make sure the audio element exists; if the file is missing remove src so fallback works
window.addEventListener('load', ()=>{
  fetch('static/music.mp3', {method:'HEAD'}).then(resp=>{
    if (!resp.ok) audio.removeAttribute('src');
  }).catch(()=>{ audio.removeAttribute('src'); });
});
