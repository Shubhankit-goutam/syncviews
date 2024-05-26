document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const createButton = document.getElementById('create-button');
    const decreaseButton = document.getElementById('decrease-button');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const iframeCountInput = document.getElementById('iframe-count');
    const decreaseCountInput = document.getElementById('decrease-count');
    const videoIdInput = document.getElementById('video-id');
    const setVideoIdButton = document.getElementById('set-video-id');

    function createIframes() {
        const parts = videoIdInput.value.split("/"); // Split the URL by "/"
        const videoId = parts[parts.length - 1].split("?")[0]; // Get the last part and split it by "?" to remove the query parameters
        console.log(videoId); 
        const existingIframeCount = videoContainer.childElementCount;
        const targetIframeCount = parseInt(iframeCountInput.value);
        const iframeIncrement = targetIframeCount - existingIframeCount;

        for (let i = 0; i < Math.abs(iframeIncrement); i++) {
            const iframe = document.createElement('iframe');
            iframe.className = 'video-iframe'; // Add the class for styling
            iframe.width = '350'; // Set width to 144px
            iframe.height = '200'; // Set height to 144px
            iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&mute=1&autoplay=1`; // Add mute and autoplay parameters
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            if (iframeIncrement > 0) {
                videoContainer.appendChild(iframe); // Append new iframes
            } else {
                videoContainer.removeChild(videoContainer.lastChild); // Remove excess iframes
            }
        }

        playButton.disabled = false; // Enable the play button after iframes are created
        pauseButton.disabled = false; // Enable the pause button after iframes are created
        decreaseButton.disabled = false; // Enable the decrease button after iframes are created
    }

    function decreaseIframes() {
        const decreaseCount = parseInt(decreaseCountInput.value);
        for (let i = 0; i < decreaseCount && videoContainer.childElementCount > 0; i++) {
            videoContainer.removeChild(videoContainer.lastChild); // Remove the last iframe
        }

        // Disable decrease button if no iframes remain
        if (videoContainer.childElementCount === 0) {
            decreaseButton.disabled = true;
        }
    }

    function playAllVideos() {
        const iframes = document.getElementsByClassName('video-iframe');
        for (let i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            iframes[i].contentWindow.postMessage('{"event":"command","func":"setPlaybackQuality","args":["tiny"]}', '*');
        }
    }

    function pauseAllVideos() {
        const iframes = document.getElementsByClassName('video-iframe');
        for (let i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }

    function setVideoId() {
        const videoId = prompt("Enter YouTube Video ID:");
        if (videoId !== null && videoId.trim() !== "") {
            videoIdInput.value = videoId;
        }
    }

    createButton.addEventListener('click', createIframes);
    decreaseButton.addEventListener('click', decreaseIframes);
    playButton.addEventListener('click', playAllVideos);
    pauseButton.addEventListener('click', pauseAllVideos);
    setVideoIdButton.addEventListener('click', setVideoId);
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to get the time of day
    function getTimeOfDay() {
        const currentTime = new Date().getHours();
        if (currentTime >= 5 && currentTime < 12) {
            return 'Good morning';
        } else if (currentTime >= 12 && currentTime < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }

    // Function to display the welcome message 
    function displayWelcomeMessage() {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'alert alert-info text-center';
        welcomeMessage.setAttribute('role', 'alert');
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        welcomeMessage.innerHTML = `<strong>${getTimeOfDay()},</strong> Welcome to SyncView!<br> ${currentTime} <button id="closeButton" class="btn btn-danger btn-sm ml-2">Close</button>`;
        document.body.insertBefore(welcomeMessage, document.body.firstChild);

        // Adding event listener to close button
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', function() {
            welcomeMessage.style.display = 'none';
        });
    }

    // Call the function to display the welcome message
    displayWelcomeMessage();
});