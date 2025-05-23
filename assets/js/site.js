document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const overlay   = document.querySelector('.overlay');
  const body      = document.body;
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('sidebar-open');
  });
  overlay.addEventListener('click', () => {
    body.classList.remove('sidebar-open');
  });
});
