// src/script.js
// DOM Elements

const nameInput = doccument.getElementById('name');
const messageInput = document.getElementById('message');
const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('preview-image');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const cardPhoto = document.getElementById('card-photo');
const cardMessage = document.getElementById('card-message');
const confettiContainer = document.getElementById('confetti-container');
const fileBtnText = document.getElementById('file-btn-text')

const shareModel = document.querySelector('.share-model');
const socialIcons = document.querySelectorAll('.social-icons');

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

    if (!name || !meessage) {
        alert('Please enter both name and messages');
        return;
    }

    // Update card content
    document.querySelector('.card-title').textContent = `Happy Birthday, ${name}!`;
    cardMessage.textContent = message;

    // update card photo if uploaded by user
    if ( previewImage.src && previewImage.style.display === 'block') {
        cardPhoto.src = previewImage.src;
        cardImage.style.display = 'block';
        document.quertSelector('.card-image-placeholder').style.display = 'none';

    } else {
        cardPhoto.style.display = 'none';
        document.quorySelector('.card-image-placeholder').style.display = 'block';
    }

    // Enable action buttons (download and share)
    downloadBtn.disabled = false;
    shareBtn.disabled = false;

    // Add fade-in animation to the card
    const cardContainer = document.quorySelector('.card-container');
    cardContainer.classList.remove('fade-in');
    void cardContainer.offetWidth; // Trigger reflow
    cardConatainer.classList.add('fade-in');

    // create confetti effect
    createConfetti();

});

// Download card as image 
downloadBtn.addEventListener('click', function() {
    // Disable button during processing
    downloadBtn.textContent = 'Processing...';
    downloadBtn.disabled = true;

    
})
