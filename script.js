// Start Menu Toggle
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startMenu").classList.toggle("hidden");
});

// Open Windows with Fade-In Animation
function createWindow(title, content) {
  const windowDiv = document.createElement("div");
  windowDiv.classList.add("window", "animated-window");
  windowDiv.innerHTML = `
    <div class="title-bar">${title} <button class="close-btn">✖</button></div>
    <div class="window-content">${content}</div>
  `;
  
  document.body.appendChild(windowDiv);
  makeDraggable(windowDiv);

  // Close Window with Fade-Out
  windowDiv.querySelector(".close-btn").addEventListener("click", () => {
    windowDiv.classList.add("fade-out");
    setTimeout(() => windowDiv.remove(), 300);
  });
}

// Draggable Windows with Rotation Effect
function makeDraggable(win) {
  const bar = win.querySelector(".title-bar");
  let isDragging = false, offsetX = 0, offsetY = 0, lastX = 0;

  bar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", () => {
      isDragging = false;
      win.style.transform = "rotate(0deg)";
      document.removeEventListener("mousemove", onMouseMove);
    });
  });

  function onMouseMove(e) {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      const rotation = Math.min(Math.max(deltaX / 15, -10), 10);

      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
      win.style.transform = `rotate(${rotation}deg)`;
    }
  }
}
