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

    // Capture at higher resolution for better quality
    const cardElement = document.quorySelector('.card-container');
    const scale = 2; // Double the resolution

    // Convert HTML to Image
    html2canvas(cardElement, {
        scale: scale,
        backgroundColor: null, // Transparent background
        logging: false, // Disable logging for performance
        userCORS: true // Enable CORS for external images
    
    }).then(canvas =>{
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a link to download the image
        const link = document.createElement('a');
        link.download = `birthday-card-${nameInput.value.trim() || 'wish'}.png`
        link.href = dataURL;
        document.body.appendchild(link);
        link.click();
        document.body.removeChild(link);

        // Restore Button State on Success
        downloadBtn.textContent = 'Download Card as Image';
        downloadBtn.disabled = false;
    
    // Error Handling
    }).catch(err => {
        console.error('Error generating image:', err);
        alert('Error generating image. Please try again.');
        downloadBtn.textContent = 'Download Card as Image';
        downloadBtn.disabled = false;


    });


});


// Open share modal
shareBtn.addEventListener('click', function() {
    shareModel.style.display = 'flex';
});