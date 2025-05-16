document.addEventListener('DOMContentLoaded', () => {
      const btn     = document.querySelector('.menu-toggle');
      const overlay = document.querySelector('.overlay');
    
      btn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
      });
    
      overlay.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
      });
    });
    