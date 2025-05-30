document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.cliente-slide');
  const nextBtn = document.querySelector('.cliente-next');
  const prevBtn = document.querySelector('.cliente-prev');
  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  showSlide(current);
});
