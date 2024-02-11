document.addEventListener("DOMContentLoaded", function() {
    // Simulate page loading
    setTimeout(function() {
        hideLoading(); // Hide loading animation after some time (simulating content loading)
    }, 1000); // Change 3000 to the desired milliseconds for the loading time
});

function hideLoading() {
    var loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.opacity = '0'; // Fade out the loading overlay

    // Add the black screen
    var blackoutScreen = document.createElement('div');
    blackoutScreen.style.position = 'fixed';
    blackoutScreen.style.top = '0';
    blackoutScreen.style.left = '0';
    blackoutScreen.style.width = '100%';
    blackoutScreen.style.height = '100%';
    blackoutScreen.style.background = 'black';
    blackoutScreen.style.opacity = '0.4'; // Adjust opacity as needed
    blackoutScreen.style.transition = 'opacity 1s'; // Add a smooth transition effect
    document.body.appendChild(blackoutScreen);

    setTimeout(function() {
        blackoutScreen.style.opacity = '0'; // Fade out the black screen
        setTimeout(function() {
            blackoutScreen.remove(); // Remove the black screen after fading out
        }, 1000); // Adjust the milliseconds as needed
    }, 1000); // Adjust the milliseconds for displaying the black screen
}