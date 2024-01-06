document.addEventListener('DOMContentLoaded', function(){
    // if user click the start button
    const startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', function() {
        // display the popup form for the name
        const usernameContainer = document.querySelector('#username-container');
        usernameContainer.style.display = 'block';

        const blocker = document.querySelector("#background-blocker");
        blocker.style.display = 'block';

        // if blocker is click then close this pop up container
        blocker.addEventListener('click', function(e) {
            usernameContainer.style.display = 'none';
            blocker.style.display = 'none';
        });
    });


    // if user click the back button in username container
    const userNameBackButton = document.querySelector('#form-back-button');
    userNameBackButton.addEventListener('click', function(e) {
        // stop the page from refreshing
        e.preventDefault();
        // close the popup form for the name
        document.querySelector('#username-container').style.display = 'none';

        const blocker = document.querySelector("#background-blocker");
        blocker.style.display = 'none';
    });

    // if user click the creator text
    const creatorText = document.querySelector("#creator-text");
    creatorText.addEventListener('click', function(e) {
        e.preventDefault();

        // display the conatiner of creator txt
        const creatorContainer = document.querySelector("#creator-page-container");
        creatorContainer.style.display = 'block';

        const blocker = document.querySelector("#background-blocker");
        blocker.style.display = 'block';

        // if blocker is click then close this pop up container
        blocker.addEventListener('click', function(e) {
            creatorContainer.style.display = 'none';
            blocker.style.display = 'none';
        });
    });

    // if user click the about text
    const aboutText = document.querySelector("#about-text");
    aboutText.addEventListener('click', function(e) {
        const aboutContainer = document.querySelector("#about-page-container");
        aboutContainer.style.display = 'block';

        const blocker = document.querySelector("#background-blocker");
        blocker.style.display = 'block';

        // if blocker is click then close this pop up container
        blocker.addEventListener('click', function(e) {
            aboutContainer.style.display = 'none';
            blocker.style.display = 'none';
        });
    });
});