document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const toggleBtn = document.querySelector('.menu-toggle');
  const overlay   = document.querySelector('.overlay');
  const body      = document.body;

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
    });
    overlay.addEventListener('click', () => {
      body.classList.remove('sidebar-open');
    });
  }

  // (Optional) your trailer logic lives here too,
  // so you don't need inline scripts on each page:
  const openTrailer  = document.getElementById('open-trailer');
  const closeTrailer = document.getElementById('close-trailer');
  const videoSection = document.getElementById('video-section');
  if (openTrailer && closeTrailer && videoSection) {
    openTrailer .addEventListener('click', () => videoSection.classList.add('active'));
    closeTrailer.addEventListener('click', () => videoSection.classList.remove('active'));
  }
});
