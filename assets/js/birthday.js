// Audio setup
const audio = document.getElementById('background-music');

// Play audio when images are clicked
const images = document.querySelectorAll('.paper');
images.forEach(image => {
  image.addEventListener('click', () => {
    // Play the audio only if it's not already playing
    if (audio.paused) {
      audio.play();
    }
  });
});

// Paper Dragging Functionality
let highestZ = 1;
let draggedImagesCount = 0;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('mousedown', (e) => this.startDrag(e, paper));
    paper.addEventListener('mousemove', (e) => this.moveDrag(e, paper));
    paper.addEventListener('mouseup', () => this.endDrag(paper));

    paper.addEventListener('touchstart', (e) => this.startDrag(e, paper));
    paper.addEventListener('touchmove', (e) => this.moveDrag(e, paper));
    paper.addEventListener('touchend', () => this.endDrag(paper));
  }

  startDrag(e, paper) {
    e.preventDefault();
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;

    if (e.type === "touchstart") {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    } else {
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
    }
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  moveDrag(e, paper) {
    if (!this.holdingPaper) return;

    e.preventDefault();

    if (e.type === "touchmove") {
      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;
    } else {
      this.touchMoveX = e.clientX;
      this.touchMoveY = e.clientY;
    }

    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;

    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  endDrag(paper) {
    this.holdingPaper = false;
    checkIfAllImagesDragged();
  }
}

// Function to check if all images are dragged
function checkIfAllImagesDragged() {
  draggedImagesCount++;
  const papers = document.querySelectorAll('.paper');
  if (draggedImagesCount === papers.length) {
    document.getElementById('birthday-box').style.opacity = 1;
    document.getElementById('birthday-box').style.transform = 'scale(1)';
  }
}

// Initialize dragging functionality for each paper
const papers = document.querySelectorAll('.paper');
papers.forEach((paper) => {
  const paperObject = new Paper();
  paperObject.init(paper);
});

// Delay the appearance of the drag instruction
setTimeout(function () {
  document.getElementById('drag-instruction').style.opacity = 1;
}, 1000);
