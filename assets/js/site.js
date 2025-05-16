document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-trailer');
  btn.addEventListener('click', () => {
    // avoid adding twice
    if (document.querySelector('.wrapper')) return;

    // create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.innerHTML = `
      <input type="checkbox" id="video-toggle" checked />
      <div class="video">
        <video
          src="movie.mov"
          type="video/quicktime"
          loop muted autoplay playsinline>
          Your browser does not support this video.
        </video>
      </div>
      <div class="text">
        <label for="video-toggle">
          <span data-text="Close Trailer"></span>
        </label>
      </div>
    `;

    // insert above footer
    const footer = document.getElementById('footer');
    footer.parentNode.insertBefore(wrapper, footer);

    // on close, remove
    const toggle = wrapper.querySelector('#video-toggle');
    toggle.addEventListener('change', (e) => {
      if (!e.target.checked) wrapper.remove();
    });
  });
});
