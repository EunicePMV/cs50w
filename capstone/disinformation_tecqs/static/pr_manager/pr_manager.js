document.addEventListener('DOMContentLoaded', function() {
    // when the user scroll
    // reveal the nxt div and move up the first div
    const convoContainer = document.querySelector('#conversation-container');

    convoContainer.addEventListener('scroll', function() {
        if(convoContainer.scrollHeight - convoContainer.scrollTop === convoContainer.clientHeight)
            console.log('user at the bottom');
        else if(convoContainer.scrollTop >= 616)
            document.querySelector('#convo-5').className = 'convo-context show';
        else if(convoContainer.scrollTop >= 424)
            document.querySelector('#convo-4').className = 'convo-context show';
        else if(convoContainer.scrollTop >= 265)
            document.querySelector('#convo-3').className = 'convo-context show';
        else if(convoContainer.scrollTop >= 159) {
            // get the scroll note and fade the div container
            const scrollNote = document.querySelector("#scroll-note");
            scrollNote.classList.add("fadeOut");

            document.querySelector('#convo-2').className = 'convo-context show';
        }
    });
});