document.addEventListener('DOMContentLoaded', function() {

    const newsCollapsibles = document.querySelectorAll(".collapsible");

    newsCollapsibles.forEach(newsCollapsible => {
        
        newsCollapsible.addEventListener('click', function(e) {
            newsCollapsible.classList.toggle("active");
            let content = newsCollapsible.nextElementSibling;

            if(content.style.display === "block")
                content.style.display = 'none';
            else
                content.style.display = 'block';
        });
    })



    // var coll = document.getElementsByClassName("collapsible");
    // var i;

    // for (i = 0; i < coll.length; i++) {
    // coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.display === "block") {
    //     content.style.display = "none";
    //     } else {
    //     content.style.display = "block";
    //     }
    // });
    // }

    // get tne first post on this stage, for handling post display
    let currentPost = document.querySelector("#first-post");

    // select all div that has container class of option-reply-chat
    const replyOptions = document.querySelectorAll(".option-reply-chat");
    replyOptions.forEach(option => {

        // addeventlistener to all of these options
        option.addEventListener('click', function(e) {
            e.preventDefault();

            // if this option is click, create a div container for it 
            const replyContainer = document.createElement('div');
            replyContainer.className = 'reply-convo sliding-command-convo'
            replyContainer.innerHTML = option.innerHTML;

            // get the nxt element sibling
            const nxtConvo = option.parentNode.parentNode.nextElementSibling;

            // the container to insert the option
            const mainChatContainer = option.parentNode.parentNode.parentNode

            // insert the option chose to the previous convo
            mainChatContainer.insertBefore(replyContainer, nxtConvo);

            // check external container list of className (div class="hide display-post")
            const optionExternalContainer = option.parentNode.parentNode;

            // check if the div container contains display-post in its class
            if(optionExternalContainer.classList.contains("display-post")) {
                currentPost.classList.remove('hide');
                currentPost.classList.add('show');
                currentPost = currentPost.nextElementSibling;
            } else {
                // check the user option, verify what convo to display
                checkUserChoice(option.textContent, nxtConvo);
            }

            // then remove this div
            option.parentNode.remove()
        });
    });

    // select all the option-post-container, add event listener to all of the post
    const optionContainers = document.querySelectorAll(".option-post-container");
    optionContainers.forEach(optionContainer => {

        // when the user choose this option via click
        optionContainer.addEventListener('click', async function(e) {
            // get the text content
            const newPost = optionContainer;
            newPost.className = 'post-container';

            // remove the option-post-container parent node parent node
            const toRemoveOptionContainer = optionContainer.parentNode.parentNode.parentNode;

            // check if this container goes back to the chat convo
            if(toRemoveOptionContainer.classList.contains('back-to-chat-container')) {
                // remove the carousel option
                toRemoveOptionContainer.remove();

                // display the chosen option post
                const postInMainStageContainer = document.querySelector("#main-internal-stage-container");
                postInMainStageContainer.append(newPost);

                // wait for 2 secs 
                const sleep = async (milliseconds) => {
                    await new Promise(resolve => {
                        return setTimeout(resolve, milliseconds)
                    });
                };

                // show nxt div after 2 seconds
                await sleep(2000);

                // ask the textContent of the html tag and confirm what chat reply should be display
                if(newPost.textContent.includes("#NotForMinorities") || newPost.textContent.includes("#ReyesWitless")) {
                    // get the reply container where it should go back
                    const trendingResponse = document.querySelector("#trending-chat");
                    trendingResponse.classList.remove('hide');
                    trendingResponse.classList.add('show');
                    trendingResponse.scrollIntoView({behavior: "smooth"});
                } else if(newPost.textContent.includes("ABS-CBÑ News") || newPost.textContent.includes("GmA News") || newPost.textContent.includes("TV6")) {
                    // get the reply container where it should go back
                    const clientNewsResponse = document.querySelector("#client-response-news-chat");
                    clientNewsResponse.classList.remove('hide');
                    clientNewsResponse.classList.add('show');
                    clientNewsResponse.scrollIntoView({behavior: "smooth"});
                }
            // if the post is the first post in the second stage
            }else if(toRemoveOptionContainer.id === "second-stage-first-post") {
                
                // then remove the carousel then post the chosen post 
                toRemoveOptionContainer.remove();

                // display the chosen option
                const postInMainStageContainer = document.querySelector("#main-internal-stage-container");
                postInMainStageContainer.append(newPost);

                // wait for 2 secs, before posting the nxt post
                const sleep = async (milliseconds) => {
                    await new Promise(resolve => {
                        return setTimeout(resolve, milliseconds)
                    });
                };

                // before displaying the nxt post, display the notif first
                // this contains notification that instruct the user, display the notification
                const notif = document.querySelector("#post-client-notif");
                notif.classList.remove("hide");

                // show nxt div after 2 seconds
                await sleep(5000);

                // fade out the element
                fadeOut(notif);

                // should create another div instead of getting the existing div and modify its content
                
                // create new post container
                const newPostContainer = document.createElement('div');
                newPostContainer.className = "post-container back-to-chat-container";
                newPostContainer.id = "recent-post-page";

                // create title post container 
                const titleNewPostContainer = document.createElement('div');
                titleNewPostContainer.className = 'post-title';
                titleNewPostContainer.innerText = newPost.querySelector('.post-title').innerText;
                newPostContainer.append(titleNewPostContainer);

                // create content post container
                const contentNewPostContainer = document.createElement('div');
                contentNewPostContainer.className = 'post-content';
                contentNewPostContainer.innerText = 'The right candidate plays fairly and will never pull down anyone';
                newPostContainer.append(contentNewPostContainer);

                // add hr element
                const hrElement = document.createElement('hr');
                newPostContainer.append(hrElement);

                // add the click to continue container 
                const spanElement = document.createElement('span');
                spanElement.className = 'continue-post-proceed';
                spanElement.innerText = ' Click here to continue ';

                // create listener to the click here text
                spanElement.addEventListener('click', function(e) {
                    // remove the click here continue
                    spanElement.remove();

                    // display the "#sudden-commotion-convo"
                    const nxtReplyChat = document.querySelector("#sudden-commotion-convo");
                    nxtReplyChat.classList.remove("hide");
                    nxtReplyChat.classList.add("show");
                })

                const arrowElement = document.createElement('i');
                arrowElement.classList.add('arrow');
                arrowElement.classList.add('right');
                spanElement.append(arrowElement);

                newPostContainer.append(spanElement);

                postInMainStageContainer.prepend(newPostContainer);
            }
        });
    });

    // select all class that has 'click here to continue' (in chat)
    const continueContainers = document.querySelectorAll('.continue-container-proceed');
    continueContainers.forEach(continueContainer => {

        continueContainer.addEventListener('click', async function(e) {

            // check the class of this parent node, before it gets remove
            const continueOptionParentNode = continueContainer.parentNode.parentNode;

            const nxtConvo = continueContainer.parentNode.parentNode.nextElementSibling;

            continueContainer.parentNode.remove();

            // check if the parent will go back to post container
            if(continueOptionParentNode.classList.contains("back-to-post-container")) {
                // confirm where post container should it go
                if(continueOptionParentNode.textContent.includes("Mr. Reyes is trending!")) {
                    // post this reaction container
                    const firstReactionContainer = document.querySelector("#from-trending-chat");
                    firstReactionContainer.classList.remove("hide");
                } else if(continueOptionParentNode.textContent.includes("Interesting, I'll let you handle from this")) {
                    const firstPostContainer = document.querySelector("#second-stage-first-post");
                    firstPostContainer.classList.remove("hide");

                    // this contains notification that instruct the user, display the notification
                    const notif = document.querySelector("#choose-page-notif");
                    notif.classList.remove("hide");

                    // wait for 2 secs 
                    const sleep = async (milliseconds) => {
                        await new Promise(resolve => {
                            return setTimeout(resolve, milliseconds)
                        });
                    };

                    // show nxt div after 2 seconds
                    await sleep(5000);

                    // fade out the element
                    fadeOut(notif);
                } else if(continueOptionParentNode.textContent.includes("Look there is a sudden commotion about Mr. Reyes!")) {
                    
                    // get the reaction container that needs to be posted 
                    const secondReactionContainer = document.querySelector("#from-commotion-chat");

                    // get the recent post page
                    const recentPostPage = document.querySelector("#recent-post-page");

                    // get the main container where the nxt post should be place
                    const mainStageContainer = document.querySelector("#main-internal-stage-container");

                    // insert at the center the first reaction container in the 2nd stage before the recent page, to place it at the top
                    mainStageContainer.insertBefore(secondReactionContainer, recentPostPage);

                    // show the reaction container posted at the center
                    secondReactionContainer.classList.remove("hide");
                } else if(continueOptionParentNode.textContent.includes("Alright")) {
                    // get the div container that has the client nxt post
                    const clientNxtPost = document.querySelector("#client-chosen-post").nextElementSibling;

                    // get the innerText for the content of the nxt post of the client 
                    const nxtPost = clientNxtPost.innerText;

                    // create new post container for the client's post
                    const newPostContainer = document.createElement('div');
                    newPostContainer.className = "post-container";

                    // create title post container 
                    const titleNewPostContainer = document.createElement('div');
                    titleNewPostContainer.className = 'post-title';
                    titleNewPostContainer.innerText = 'Juan Dela Cruz (Official)';
                    newPostContainer.append(titleNewPostContainer);

                    // create content post container
                    const contentNewPostContainer = document.createElement('div');
                    contentNewPostContainer.className = 'post-content';
                    // replace the double quotatin in the string with none
                    contentNewPostContainer.innerText = nxtPost.replace(/['"]+/g, '');
                    newPostContainer.append(contentNewPostContainer);

                    // add hr element
                    const hrElement = document.createElement('hr');
                    newPostContainer.append(hrElement);

                    // add the click to continue container 
                    const spanElement = document.createElement('span');
                    spanElement.className = 'continue-post-proceed';
                    spanElement.innerText = ' Click here to continue ';

                    // create listener to the click here text
                    spanElement.addEventListener('click', function(e) {

                        console.log(spanElement.parentNode.nextElementSibling);

                        // remove the click here continue
                        spanElement.remove();

                        // get the nxt post container to be posted
                        const nxtPostContainer = document.querySelector("#recent-post-page").nextElementSibling;

                        // get the main stage container
                        const mainStageContainer = document.querySelector("#main-internal-stage-container");

                        // insert before the client post container
                        mainStageContainer.insertBefore(nxtPostContainer, newPostContainer);

                        // display the nxt post container 
                        nxtPostContainer.classList.remove("hide");
                    })

                    const arrowElement = document.createElement('i');
                    arrowElement.classList.add('arrow');
                    arrowElement.classList.add('right');
                    spanElement.append(arrowElement);

                    // assemble the spanElement to the created post container of the client 
                    newPostContainer.append(spanElement);

                    // get the last reaction container
                    const lastReactContainer = document.querySelector("#kap-tiag-container");

                    // get the main stage container
                    const mainStageContainer = document.querySelector("#main-internal-stage-container");

                    // append the client's post container to the main stage
                    mainStageContainer.insertBefore(newPostContainer, lastReactContainer);
                } else if (continueOptionParentNode.textContent.includes("Well then, I leave it up to you")) {
                    // post this reaction container
                    const thirdReactionContainer = document.querySelector("#third-stage-first-post");
                    thirdReactionContainer.classList.remove("hide");

                    // this contains notification that instruct the user, display the notification
                    const notif = document.querySelector("#impersonate-notif");
                    notif.classList.remove("hide");

                    // wait for 2 secs 
                    const sleep = async (milliseconds) => {
                        await new Promise(resolve => {
                            return setTimeout(resolve, milliseconds)
                        });
                    };

                    // show nxt div after 2 seconds
                    await sleep(5000);

                    // fade out the element
                    fadeOut(notif);
                }
            // if it will not go to post container, then proceed to show the nxt convo in the chat reply
            } else {
                nxtConvo.classList.remove("hide");
                nxtConvo.classList.add("show");
                nxtConvo.scrollIntoView({ behavior: 'smooth'});
            }
        });
    })

    // select all class that has 'click here to continue' (in post)
    const continuePostContainers = document.querySelectorAll(".continue-post-proceed");
    continuePostContainers.forEach(continuePostContainer => {

        continuePostContainer.addEventListener('click', function(e) {
            // basis of the post reaction container, and the first stage indicator
            const basedPostContainer = document.querySelector("#from-trending-chat");

            // second stage indicator
            const secondStageIndicator = document.querySelector("#recent-post-page");

            // get the main post container where to insert the nxt post
            const mainPostContainer = continuePostContainer.parentNode.parentNode;

            // if in first stage
            if(basedPostContainer) {
                // get the nxt element sibling to show nxt
                const nxtPost = basedPostContainer.nextElementSibling;

                // get the current post container 
                const currentPostContainer = continuePostContainer.parentNode;

                // remove the click here text
                continuePostContainer.remove();

                // check if the currentPostContainer will go back to chat container
                if(currentPostContainer.classList.contains("back-to-chat-container")) {
                    
                    // confirm the textContent of the post
                    if(currentPostContainer.textContent.includes("Now I'm rethinking my decisions...")) {
                        const nxtReplyChat = document.querySelector("#decision-right-chat");
                        nxtReplyChat.classList.remove('hide');
                        nxtReplyChat.classList.add('show');
                        nxtReplyChat.scrollIntoView({behavior: "smooth"});
                    }
                } else {
                    // insert the nxtPost before the current node in the mainPostContainer
                    mainPostContainer.insertBefore(nxtPost, currentPostContainer);

                    nxtPost.classList.remove("hide");
                }
            // else if in stage 2
            } else if(secondStageIndicator) {

                // get the nxt post 
                const nxtPost = secondStageIndicator.nextElementSibling;

                // get the current post container 
                const currentPostContainer = continuePostContainer.parentNode;

                // remove the click here text
                continuePostContainer.remove();

                // check if the currentPostContainer will go back to chat container
                if(currentPostContainer.classList.contains("back-to-chat-container")) {
                    
                    // confirm the textContent of the post
                    if(currentPostContainer.textContent.includes("Mr. Reyes should withdraw his candidacy now!")) {
                        const nxtReplyChat = document.querySelector("#turn-tables-chat");
                        nxtReplyChat.classList.remove('hide');
                        nxtReplyChat.classList.add('show');
                        nxtReplyChat.scrollIntoView({behavior: "smooth"});
                    } else if(currentPostContainer.textContent.includes("BAbaSILsilIOio")) {
                        console.log("here")
                        const nxtReplyChat = document.querySelector("#client-reaction-chat");
                        nxtReplyChat.classList.remove('hide');
                        nxtReplyChat.classList.add('show');
                        nxtReplyChat.scrollIntoView({behavior: "smooth"});
                    }
                } else {
                    // insert the nxtPost before the current node in the mainPostContainer
                    mainPostContainer.insertBefore(nxtPost, currentPostContainer);

                    nxtPost.classList.remove("hide");
                }
            }
        });
    });

    // if the nxt stage button is click, open the last message in the final stage
    const nxtStageButton = document.querySelector(".nxt-button");
    nxtStageButton.addEventListener('click', function() {
        // check the id of the button
        if(nxtStageButton.id === 'end-button')
            showLastMsg();
    });
});

// function to show the final message in the final stage
function showLastMsg() {
    const finalMsg = document.querySelector('#final-msg-container');
    finalMsg.style.display = 'block';
    finalMsg.classList.add("show")

    // if the back button is click, show the back to menu button
    const backButton = document.querySelector('#close-button-main-final-msg-container');
    backButton.addEventListener('click', function(e) {
        window.location.replace(`/`);
    });
}

// function to fade out  
function fadeOut(notif) {
    notif.classList.remove("hide");
    notif.classList.add("fadeOut")
}

async function checkUserChoice(option, nxtConvo) {

    // wait for 2 secs 
    const sleep = async (milliseconds) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };

    // show nxt div after 2 seconds
    await sleep(2000);
    
    // check user option 
    if(option.includes("Sure, it will be an honor to work with you Sir!")) {
        const showAnotherConvo = nxtConvo.nextElementSibling;
        nxtConvo.remove();
        showAnotherConvo.classList.remove('hide');
        showAnotherConvo.classList.add('show');
        showAnotherConvo.scrollIntoView({behavior: "smooth"});
    } else {
        nxtConvo.classList.remove('hide');
        nxtConvo.classList.add('show');
        nxtConvo.scrollIntoView({behavior: "smooth"});
    }
}