const video = document.getElementById('scrub-video');
const bar = document.getElementById('scrub-bar');

gsap.registerPlugin(ScrollTrigger);

// "Prime" do decoder: em iOS/Safari um <video> que nunca deu play()
// às vezes não atualiza o frame visível ao só mudar currentTime.
video.muted = true;
video.play().then(() => video.pause()).catch(() => {});

function setupScrub() {
  ScrollTrigger.create({
    trigger: '.scrub-section',
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: true,
    // Evita o salto de 2-3 frames no des-pin: sem isso, o ScrollTrigger só
    // decide "saí da área pinada" no primeiro tick de scroll DEPOIS que o
    // navegador já passou do limite, gerando um frame com a geometria errada
    // antes de corrigir. anticipatePin faz o cálculo antecipar essa borda.
    anticipatePin: 1,
    onUpdate(self) {
      if (video.duration) {
        video.currentTime = self.progress * video.duration;
      }
      bar.style.width = `${self.progress * 100}%`;
    }
  });

  // Garante que o pin-spacer foi medido com o layout já assentado
  // (evita qualquer resquício de medição feita antes do vídeo carregar).
  ScrollTrigger.refresh();
}

if (video.readyState >= 1) {
  setupScrub();
} else {
  video.addEventListener('loadedmetadata', setupScrub, { once: true });
}
