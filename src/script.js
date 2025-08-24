// src/script.js
// DOM Elements

const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('preview-image');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const cardPhoto = document.getElementById('card-photo');
const cardMessage = document.getElementById('card-message');
const confettiContainer = document.getElementById('.confetti-container');
const fileBtnText = document.getElementById('file-btn-text');
const shareModal = document.getElementById('share-modal');

/*
const closeModal = document.querySelector('.close-modal');
const socialIcons = document.querySelectorAll('.social-icon');
*/

// Preview uploaded image
photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block';
            fileBtnText.textContent = 'photo uploaded';

        }
        reader.readAsDataURL(file);
    }
});

// Generate card function
generateBtn.addEventListener('click', function(){
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert('Please enter both name and messages');
        return;
    }

    // Update card content
    document.querySelector('.card-title').textContent = `Happy Birthday, ${name}!`;
    cardMessage.textContent = message;

    // update card photo if uploaded by user
    if ( previewImage.src && previewImage.style.display === 'block') {
        cardPhoto.src = previewImage.src;
        cardPhoto.style.display = 'block';
        document.querySelector('.card-image-placeholder').style.display = 'none';

    } else {
        cardPhoto.style.display = 'none';
        document.querySelector('.card-image-placeholder').style.display = 'block';
    }

    // Enable action buttons (download and share)
    downloadBtn.disabled = false;
    shareBtn.disabled = false;

    // Add fade-in animation to the card
    const cardContainer = document.querySelector('cardcontainer');
    cardContainer.classList.remove('fade-in');
    void cardContainer.offsetWidth; // Trigger reflow
    cardContainer.classList.add('fade-in');

    // create confetti effect
    createConfetti();

});


// =========Download card as image 2nd method=========
function myfunc(){
    const element = document.getElementById("cardcontainer");

    // Disable button during processing
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Processing...";

    html2canvas(element, {
        scale: 2, // Higher quality
        backgroundColor: "#ffffff", // White background
        logging: false,
        useCORS: true
    }).then(function(canvas) {
        canvas.toBlob(function(blob) {
            // Generate filename with recipient's name if available
            const name = document.getElementById("name").value.trim() || "birthday";
            saveAs(blob, `birthday-card-${name}.png`);
            
            // Restore button state
            downloadBtn.disabled = false;
            downloadBtn.textContent = "Download Card as Image";

            //window.saveAs(blob, "download.png");
        });
    }).catch(function(error) {
        console.error("Error generating image:", error);
        alert("Error generating image. Please try again.");
        
        // Restore button state on error
        downloadBtn.disabled = false;
        downloadBtn.textContent = "Download Card as Image";
    }
    );
};



/*
// Open share modal
shareBtn.addEventListener('click', function() {
    shareModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', function() {
    shareModal.style.display = 'none';
})

// Close modal on outside click
window.addEventListener('click', function(e) {
    if (e.target === shareModal) {
        shareModal.style.display = 'none';
    }
});

// Social sharing functionality
socialIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const platform = this.getAttribute('data-platform');
        const name = nameInput.value.trim() || 'Friend';
        const message = messageInput.value.trim() || 'Happy Birthday!';
        const imageUrl = cardPhoto.src || 'https://via.placeholder.com/400x300?text=Birthday+Card';
        
        let shareUrl = '';
        const shareText = `Check out this birthday card I made for ${name} with HBD-WishSnap! ${message}`;
        
        switch(platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                break;
            case 'instagram':
                alert('For Instagram, save the image and share it directly to your story or feed');
                return;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'snapchat':
                alert('For Snapchat, save the image and share it directly in the app');
                return;
            default:
                shareUrl = window.location.href;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
        shareModal.style.display = 'none';
    });
});
*/

// Create confetti effect
function createConfetti() {
    // Clear previous confetti
    confettiContainer.innerHTML = '';

    // Create new confetti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random position and size
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width; // Make it square

        // Random color
        const colors = ['#ff6b6b', '#4ecdc4', '#ffeb0b', '#6c5ce7', '#1dd1a1'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random animation duration and delay
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Between 2s and 5s
        confetti.style.animationDelay = `${Math.random() * 2}s`; // Between 0s and 2s

        confettiContainer.appendChild(confetti);

    }
}

// Initialize with example data
window.addEventListener('load', function() {
    nameInput.value = "Alex";
    messageInput.value = "Wishing you a day filled with happiness and a year filled with joy. Happy birthday!";
    setTimeout(() => generateBtn.click(), 500); // Auto-generate card after 500ms
});

// Update the footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();