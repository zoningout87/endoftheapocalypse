
let forestAchterkant = document.getElementById("forestAchterkant");
let forestMiddelkant = document.getElementById("forestMiddelkant");
let forestVoorkant = document.getElementById("forestVoorkant");



window.addEventListener('scroll', function(){
    var value = this.window.scrollX;
    forestAchterkant.style.left = value * 0.40 + 'px';
    forestMiddelkant.style.left = value * 0.20 + 'px';
    forestVoorkant.style.left = -value * 0.10 + 'px';
 
  })