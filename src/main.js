import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // keep it to replay when scrolling? Let's just play once for better performance
      }
    });
  };

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  console.log("Notepad++++ loaded perfectly without any ModuleNotFoundError!");
  console.log("Welcome to the ultimate IDE experience.");
  
  createMascots(30); // 生成多個會飛的吉祥物！
});

function createMascots(num) {
  const container = document.createElement('div');
  container.id = 'mascot-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '50'; // 讓它們浮在大部分內容上層
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  const mascots = [];

  for (let i = 0; i < num; i++) {
    const img = document.createElement('img');
    img.src = '/stone.png';
    img.alt = 'Mascot Stone';
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.margin = '0';
    
    // 隨機大小、透明度
    const size = 30 + Math.random() * 50; 
    img.style.width = `${size}px`;
    img.style.opacity = (0.3 + Math.random() * 0.7).toString();
    img.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))';
    
    // 隨機初始位置與速度、旋轉角度
    let x = Math.random() * (window.innerWidth - size);
    let y = Math.random() * (window.innerHeight - size);
    let dx = (Math.random() - 0.5) * 5; 
    let dy = (Math.random() - 0.5) * 5;
    let rot = Math.random() * 360;
    let drot = (Math.random() - 0.5) * 6;

    // 防止初始速度太慢
    if (Math.abs(dx) < 1) dx *= 2;
    if (Math.abs(dy) < 1) dy *= 2;

    mascots.push({ el: img, x, y, dx, dy, rot, drot, size });
    container.appendChild(img);
  }

  function animate() {
    mascots.forEach(m => {
      m.x += m.dx;
      m.y += m.dy;
      m.rot += m.drot;

      // 碰到螢幕邊緣反彈
      if (m.x <= 0) { m.dx = Math.abs(m.dx); m.x = 0; }
      if (m.x + m.size >= window.innerWidth) { m.dx = -Math.abs(m.dx); m.x = window.innerWidth - m.size; }
      
      if (m.y <= 0) { m.dy = Math.abs(m.dy); m.y = 0; }
      if (m.y + m.size >= window.innerHeight) { m.dy = -Math.abs(m.dy); m.y = window.innerHeight - m.size; }

      m.el.style.transform = `translate(${m.x}px, ${m.y}px) rotate(${m.rot}deg)`;
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}
