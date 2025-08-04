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

// Close modal
closeModel.addEventListener('click', function() {
    shareModel.style.display = 'none';
})

// Close modal on outside click
window.addEventListener('click', function(e) {
    if (e.target === shareModel) {
        shareModel.style.display = 'none';
    }
});

// Social sharing functionality
socialIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const platform = this.getAttribute('dtata-platform');
        const name = nameInput.value.trim() || 'Friend';
        const message = messsageInput.value.trim() || 'Happy Birthday!';
        const imageUrl = cardPhoto.src || 'https://via.placeholder.com/400x300?text=Birthday+Card';

        let shareUrl = '';
        const shareText = `Check out this birhday card I made for ${name} With HBD-WishSnap! ${message}`;

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%0A${imageUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&quote=${encodeURIComponent(shareText)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(imageUrl)}`;
                break;
            case 'instagram':
                shareUrl = `https://www.instagram.com/create/story/?media=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(shareText)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'snapchat':
                shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            default:
                shareUrl = window.location.href;

        }

        window.open(shareUrl, '_blank', 'width=600, height400, resizable=yes, scrollbars=yes');
        shareModel.style.display = 'none'; // Close modal after sharing


    })
})

