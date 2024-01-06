document.addEventListener('DOMContentLoaded', function() {

	// when the user wants to post new content
	document.querySelector('#post-area').addEventListener('click', post);

	// if the login user wants to view his or her profile
	const loginUser = document.querySelector('#login-user');
	loginUser.addEventListener('click', () => viewProfile(loginUser.innerHTML));

	// add event listener to each username in the all post
	const profiles = document.querySelectorAll('.main-username');
	profiles.forEach(profile => {
		profile.addEventListener('click', () => viewProfile(profile.innerHTML));
	});

	const editPosts = document.querySelectorAll('.main-edit');
	editPosts.forEach(editPost => {
		editPost.addEventListener('click', function(e) {
			e.preventDefault();
			postEdit(editPost.id, loginUser.innerHTML);
		})
	});

	const likePosts = document.querySelectorAll('.like-container');
	likePosts.forEach(postLike => {
		postLike.addEventListener('click', function(e) {
			e.preventDefault();
			likePost(postLike.id, loginUser.innerHTML);
		});
	});

	const followingPost = document.querySelector('#following-post');
	followingPost.addEventListener('click', () => loadView('followingPost'));

	// in default load the all post view 
	loadView('allPageView');
});

function likeProfilePost(postID, loginUser) {
	// fetch the info of the post first 
	fetch(`/post/${postID}`)
	.then(response => response.json())
	.then(post => {
		const likers = post.likers;

		// check if the login user already liked this post
		if(likers.includes(loginUser)) {
			fetch("/like_post", {
				method: 'POST',
				body: JSON.stringify({
					post_id: postID
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);

				// if yes then decrease by 1
				let heartContainer = document.querySelector(`#heart-container-profile-${postID}`);
				heartContainer.innerHTML = parseInt(heartContainer.innerHTML) - 1;
			})
		} else {
			fetch("/like_post", {
				method: 'POST',
				body: JSON.stringify({
					post_id: postID
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);

				// else increase by 1
				let heartContainer = document.querySelector(`#heart-container-profile-${postID}`);
				heartContainer.innerHTML = parseInt(heartContainer.innerHTML) + 1;
			})
		}
	});
}

// get the login user and the post id 
function likePost(postID, loginUser) {
	// fetch the info of the post first 
	fetch(`/post/${postID}`)
	.then(response => response.json())
	.then(post => {
		const likers = post.likers;

		// check if the login user already liked this post
		if(likers.includes(loginUser)) {
			fetch("/like_post", {
				method: 'POST',
				body: JSON.stringify({
					post_id: postID
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);

				// if yes then decrease by 1
				let heartContainer = document.querySelector(`#heart-container-${postID}`);
				heartContainer.innerHTML = parseInt(heartContainer.innerHTML) - 1;
			})
		} else {
			fetch("/like_post", {
				method: 'POST',
				body: JSON.stringify({
					post_id: postID
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);

				// else increase by 1
				let heartContainer = document.querySelector(`#heart-container-${postID}`);
				heartContainer.innerHTML = parseInt(heartContainer.innerHTML) + 1;
			})
		}
	});
}

function postEditProfile(postID) {
	fetch(`/post/${postID}`)
	.then(response => response.json())
	.then(post => {
		const editPostContainerID = document.querySelector(`#profile-container-post-${postID}`);
		editPostContainerID.innerHTML = '';

		// display the current information
		const formEdit = document.createElement('form')
		formEdit.method = 'POST';
		formEdit.innerHTML = `<textarea class="form-control" id="edited-post-content"></textarea>`;
		editPostContainerID.append(formEdit);
		
		const editedContent = document.querySelector('#edited-post-content');
		editedContent.value = post.post

		const saveEditPost = document.createElement('button');
		saveEditPost.className = 'btn btn-primary';
		saveEditPost.id = 'save-edit-post';
		saveEditPost.innerHTML = 'Save';
		saveEditPost.style.marginTop = '10px';
		formEdit.append(saveEditPost);

		// the text area and the save button is not appearing
		formEdit.addEventListener('submit', function(e) {
			e.preventDefault();

			// fetch post request
			fetch(`/post/${postID}`, {
				method: 'POST',
				body: JSON.stringify({
					edited_content: editedContent.value
				})
			})
			.then(response => response.json())
			.then(message => {
				editPostContainerID.innerHTML = editedContent.value;
			})
		});
	})
}

// Edit post of this id 
function postEdit(postID, loginUser) {
	
	// fetch here the content of the post 
	fetch(`/post/${postID}`)
	.then(request => request.json())
	.then(post => { 

		// edit post is only available if this post is the login user post
		if(loginUser === post.user){

			// get the container where to place the text area 
			const editPostContainerID = document.querySelector(`.post-id-${postID}`);
			editPostContainerID.innerHTML = '';

			// display the current information
			const formEdit = document.createElement('form')
			formEdit.method = 'POST';
			formEdit.innerHTML = `<textarea class="form-control" id="edited-post-content"></textarea>`;
			editPostContainerID.append(formEdit);
			
			const editedContent = document.querySelector('#edited-post-content');
			editedContent.value = post.post

			const saveEditPost = document.createElement('button');
			saveEditPost.className = 'btn btn-primary';
			saveEditPost.id = 'save-edit-post';
			saveEditPost.innerHTML = 'Save';
			saveEditPost.style.marginTop = '10px';
			formEdit.append(saveEditPost);

			// the text area and the save button is not appearing
			formEdit.addEventListener('submit', function(e) {
				e.preventDefault();

				// fetch post request
				fetch(`/post/${postID}`, {
					method: 'POST',
					body: JSON.stringify({
						edited_content: editedContent.value
					})
				})
				.then(response => response.json())
				.then(message => {
					editPostContainerID.innerHTML = editedContent.value;
				})
			});
		} 
	});
}

// follow this user when follow button is click
function followUser(username) {
	const followingButton = document.querySelector('#follow-button');

	if(followingButton.innerHTML === 'Follow') {
		document.querySelector('#following-form').addEventListener('submit', function(e) {
			// send POST request to follow the user
			fetch("/user_info", {
				method: 'POST',
				body: JSON.stringify({
					username: username
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);
			});
	
			e.preventDefault();
		});
	
		// update the button into unfollow button
		followingButton.innerHTML = 'Unfollow';
		followingButton.style.color = 'rgb(15, 20, 25)';
		followingButton.style.backgroundColor = '#ffff';
		followingButton.style.border = '0px solid #ffff';

		// increase the number of followers
		let followerNum = document.querySelector('#username-followers-num');
		followerNum.innerHTML = parseInt(followerNum.innerHTML) + 1;
		
	} else {
		document.querySelector('#following-form').addEventListener('submit', function(e) {
			// send POST request to follow the user
			fetch("/user_info", {
				method: 'POST',
				body: JSON.stringify({
					username: username
				})
			})
			.then(response => response.json())
			.then(message => {
				console.log(message);
			});
	
			e.preventDefault();
		});
	
		// update the button into follow button
		followingButton.innerHTML = 'Follow';
		followingButton.style.color = '#ffff';
		followingButton.style.backgroundColor = 'rgb(15, 20, 25)';
		followingButton.style.border = '0px solid rgb(15, 20, 25)';

		// decrease the number of followers
		let followerNum = document.querySelector('#username-followers-num');
		followerNum.innerHTML = parseInt(followerNum.innerHTML) - 1;
	}
}

// display all post of this username 
function displayPost(username, num) {
	const mainUsernameContainer = document.querySelector('#main-profile-username');
	mainUsernameContainer.innerHTML = username;

	// in default fetch the first num page post of this username
	fetch(`/user_post/${username}?page=${num}`)
	.then(response => response.json())
	.then(userPosts => {

		const profilePostContainer = document.querySelector('#username-all-post');
		userPosts.user_posts.forEach(post => {

			const postInformation = document.createElement('div');
			postInformation.className = 'post-information';

			const upperContent = document.createElement('div');
			upperContent.className = 'upper-content';
			upperContent.innerHTML = `<h5 class="main-username">${username}</h5>`;

			const editPost = document.createElement('a');
			editPost.href = '#';
			editPost.className = 'main-edit';
			editPost.id = post.id;
			editPost.innerHTML = 'Edit';

			editPost.addEventListener('click', function(e) {
				e.preventDefault();
				postEditProfile(editPost.id, username);
			});

			upperContent.append(editPost);

			postInformation.append(upperContent);

			const lowerContent = document.createElement('div');
			lowerContent.className = 'lower-content';
			lowerContent.innerHTML = `<div class="main-post post-id-${post.id}" id="profile-container-post-${post.id}">${post.post}</div>
										<div class="post-date">${post.date}</div>`;

			const likeContainer = document.createElement('div');
			likeContainer.className = 'like-container';
			likeContainer.id = `like-container-${post.id}`;
			likeContainer.innerHTML = `<img class="like-main-img" src="https://www.iconpacks.net/icons/1/free-heart-icon-431-thumb.png" alt="" >
										<span class="like-counter" id="heart-container-profile-${post.id}">${post.likers.length}</span>`;
			
			likeContainer.addEventListener('click', function(e) {
				e.preventDefault();
				likeProfilePost(post.id, username);
			})
			
			lowerContent.append(likeContainer);



			postInformation.append(lowerContent);
			profilePostContainer.append(postInformation);
		});
		
		const prevButton = document.querySelector('#prev-button');
		const nxtButton = document.querySelector('#nxt-button');

		if(userPosts.previous_page_number !== false) {
			// if it has previous,profilePostContainer.innerHTML = ''; store the page number to the prev button
			prevButton.value = userPosts.previous_page_number ;
			prevButton.style.display = 'block';
	
			// add event listener to both button when click display all post
			prevButton.addEventListener('click', function(e) {
				e.stopPropagation();
				document.querySelector('#username-all-post').innerHTML = '';
				displayPost(username, prevButton.value)
			});
		} else 
			prevButton.style.display = "none";
		
		if(userPosts.next_page_number !== false) {
			// if it has next, store the page number to the nxt button
			nxtButton.value = userPosts.next_page_number;
			nxtButton.style.display = 'block'
	
			// add event listener to both button when click display all post
			nxtButton.addEventListener('click', function(e) {
				e.stopPropagation();
				document.querySelector('#username-all-post').innerHTML = '';
				displayPost(username, nxtButton.value)
			});
		} else 
			nxtButton.style.display = "none";
	});
}

// view the profile of this username
function viewProfile(username) {
	const profileMainContainer = document.querySelector('#main-profile-username');

	// create and design the container of the profile
	profileMainContainer.innerHTML = username;

	const loginUser = document.querySelector('#login-user').innerHTML;
	// if the login user != username display the follow button
	const followButton = document.querySelector('#follow-button');
	if(username !== loginUser) {
		followButton.style.display = 'block';

		fetch('/user_info')
		.then(response => response.json())
		.then(profileInfo => {
			
			// if the login user is following the given username 
			if(profileInfo.following.includes(username)){
				console.log('login user is following: ', username);
				// display the unfollow button
				followButton.innerHTML = 'Unfollow';
				followButton.style.color = 'rgb(15, 20, 25)';
				followButton.style.backgroundColor = '#ffff';
				followButton.style.border = '0px solid #ffff';
			} 
		});

		followButton.addEventListener('click', () => followUser(username));
	}

	let numberFollowing = document.querySelector('#username-following-num');
	let numberFollowers = document.querySelector('#username-followers-num');

	// fix the number of following and followers
	fetch(`/user_info/${username}`)
	.then(response => response.json())
	.then(user => {
		numberFollowing.innerHTML = user.following.length;
		numberFollowers.innerHTML = user.followers.length;
	});

	// display the first ten post of the user in default
	displayPost(username, null);

	loadView('profileView');
}

// submit post to the api
function post() {

	document.querySelector("#post-form").addEventListener('submit', function(e) {
		e.preventDefault();

		const post = document.querySelector('#post-area').value;

		fetch('/post', {
			method: 'POST',
			body: JSON.stringify({
				post:post
			})
		})
		.then(response => response.json())
		.then(result => {
			console.log(result.message)
		});

		location.reload();
	});
}

// load the specified view
function loadView(pageView) {
	if (pageView === 'allPageView') {
		document.querySelector('#all-post-view').style.display = 'block';
		document.querySelector('#profile-post-view').style.display = 'none';
		document.querySelector('#following-post-view').style.display = 'none';
	} else if (pageView === 'profileView') {
		document.querySelector('#all-post-view').style.display = 'none';
		document.querySelector('#profile-post-view').style.display = 'block';
		document.querySelector('#following-post-view').style.display = 'none';
	} else if (pageView === 'followingPost') {
		document.querySelector('#all-post-view').style.display = 'none';
		document.querySelector('#profile-post-view').style.display = 'none';
		document.querySelector('#following-post-view').style.display = 'block';
	}
}