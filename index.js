const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

circles.forEach(function(circle) {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  
    // Check if the cursor is on an even or odd section
    let isInSection = false;
    document.querySelectorAll('.row').forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isInSection = index % 2 === 0 ? 'even' : 'odd';
      }
    });
  
    // Add or remove a class based on the section
    if (isInSection === 'even') {
      circles.forEach(circle => circle.classList.add('light-circle'));
      circles.forEach(circle => circle.classList.remove('dark-circle'));
    } else if (isInSection === 'odd') {
      circles.forEach(circle => circle.classList.add('dark-circle'));
      circles.forEach(circle => circle.classList.remove('light-circle'));
    }
  });
  

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function(circle, index) {
    circle.style.left = x - 0 + 'px';
    circle.style.top = y - 0 + 'px';

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.7;
    y += (nextCircle.y - y) * 0.7;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

window.addEventListener('click', function() {
  circles.forEach(function(circle) {
    circle.style.transform = 'scale(1.4)';
  });
});
