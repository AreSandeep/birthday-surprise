// Background Music
const audio = document.getElementById('background-music');
const images = document.querySelectorAll('.paper');

// Play music on click
images.forEach(image => {
  image.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    }
  });
});

// Dragging Functionality
let highestZ = 1;
let draggedImagesCount = 0;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 30 - 15;
  }

  init(paper) {
    paper.addEventListener('mousedown', (e) => this.startDrag(e, paper));
    paper.addEventListener('mousemove', (e) => this.moveDrag(e, paper));
    paper.addEventListener('mouseup', () => this.endDrag());
    paper.addEventListener('touchstart', (e) => this.startDrag(e, paper));
    paper.addEventListener('touchmove', (e) => this.moveDrag(e, paper));
    paper.addEventListener('touchend', () => this.endDrag());
  }

  startDrag(e, paper) {
    e.preventDefault();
    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    const rect = paper.getBoundingClientRect();
    this.startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    this.startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    this.offsetX = this.startX - rect.left;
    this.offsetY = this.startY - rect.top;
  }

  moveDrag(e, paper) {
    if (!this.holdingPaper) return;
    const moveX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const moveY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    this.currentX = moveX - this.offsetX;
    this.currentY = moveY - this.offsetY;
    paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
    draggedImagesCount++;
    if (draggedImagesCount === images.length) {
      document.getElementById('birthday-box').style.opacity = 1;
    }
  }
}

// Initialize Papers
images.forEach(image => {
  const paper = new Paper();
  paper.init(image);
});

// Show Drag Instruction
setTimeout(() => {
  document.getElementById('drag-instruction').style.opacity = 1;
}, 1000);
