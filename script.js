document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle like state
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                this.classList.remove('fas');
                this.classList.add('far');
                
                // Update like count (decrease)
                const likesElement = this.closest('.post').querySelector('.likes strong');
                const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                likesElement.textContent = (currentLikes - 1).toLocaleString() + ' likes';
            } else {
                this.classList.add('liked');
                this.classList.remove('far');
                this.classList.add('fas');
                
                // Add animation
                this.classList.add('animate');
                setTimeout(() => this.classList.remove('animate'), 300);
                
                // Update like count (increase)
                const likesElement = this.closest('.post').querySelector('.likes strong');
                const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                likesElement.textContent = (currentLikes + 1).toLocaleString() + ' likes';
            }
        });
    });

    // Save/bookmark functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('fas')) {
                this.classList.remove('fas');
                this.classList.add('far');
            } else {
                this.classList.remove('far');
                this.classList.add('fas');
            }
        });
    });

    // Follow button functionality
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.color = '#8e8e8e';
            } else {
                this.textContent = 'Follow';
                this.style.color = '#0095f6';
            }
        });
    });

    // Double tap to like (mobile)
    const postImages = document.querySelectorAll('.post-image img');
    
    postImages.forEach(image => {
        let tapCount = 0;
        let tapTimer;
        
        image.addEventListener('click', function() {
            tapCount++;
            
            if (tapCount === 1) {
                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, 300);
            } else if (tapCount === 2) {
                clearTimeout(tapTimer);
                tapCount = 0;
                
                // Trigger like
                const likeButton = this.closest('.post').querySelector('.like-btn');
                if (!likeButton.classList.contains('liked')) {
                    likeButton.click();
                    
                    // Show heart animation
                    showHeartAnimation(this);
                }
            }
        });
    });

    // Heart animation for double tap
    function showHeartAnimation(element) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        heart.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            color: white;
            font-size: 80px;
            pointer-events: none;
            z-index: 10;
            text-shadow: 0 0 20px rgba(0,0,0,0.3);
            animation: heartPop 1s ease-out forwards;
        `;
        
        const container = element.parentElement;
        container.style.position = 'relative';
        container.appendChild(heart);
        
        setTimeout(() => {
            container.removeChild(heart);
        }, 1000);
    }

    // Add heart animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            15% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 1;
            }
            30% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.backgroundColor = 'white';
            this.parentElement.style.borderColor = '#a8a8a8';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.backgroundColor = '#efefef';
            this.parentElement.style.borderColor = '#dbdbdb';
        });
    }

    // Infinite scroll simulation
    let isLoading = false;
    
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && !isLoading) {
            loadMorePosts();
        }
    });

    function loadMorePosts() {
        isLoading = true;
        
        // Simulate loading delay
        setTimeout(() => {
            const postsContainer = document.querySelector('.posts-container');
            const newPost = createNewPost();
            postsContainer.appendChild(newPost);
            
            // Re-attach event listeners to new post
            attachPostEventListeners(newPost);
            
            isLoading = false;
        }, 1000);
    }

    function createNewPost() {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <div class="post-header">
                <div class="post-profile">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" alt="Profile">
                    <div class="post-info">
                        <h4>new_user_${Math.floor(Math.random() * 1000)}</h4>
                        <span>Somewhere, Earth</span>
                    </div>
                </div>
                <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="post-image">
                <img src="https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=600&h=600&fit=crop" alt="Post">
            </div>
            <div class="post-actions">
                <div class="action-buttons">
                    <i class="far fa-heart like-btn"></i>
                    <i class="far fa-comment"></i>
                    <i class="far fa-paper-plane"></i>
                </div>
                <i class="far fa-bookmark save-btn"></i>
            </div>
            <div class="post-info-section">
                <div class="likes">
                    <strong>${Math.floor(Math.random() * 5000)} likes</strong>
                </div>
                <div class="caption">
                    <strong>new_user_${Math.floor(Math.random() * 1000)}</strong> Just posted something amazing! ✨
                </div>
                <div class="comments-link">
                    View all ${Math.floor(Math.random() * 50)} comments
                </div>
                <div class="post-time">
                    ${Math.floor(Math.random() * 24)} hours ago
                </div>
            </div>
        `;
        
        return post;
    }

    function attachPostEventListeners(post) {
        // Like button
        const likeBtn = post.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                this.classList.remove('fas');
                this.classList.add('far');
                
                const likesElement = this.closest('.post').querySelector('.likes strong');
                const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                likesElement.textContent = (currentLikes - 1).toLocaleString() + ' likes';
            } else {
                this.classList.add('liked');
                this.classList.remove('far');
                this.classList.add('fas');
                this.classList.add('animate');
                setTimeout(() => this.classList.remove('animate'), 300);
                
                const likesElement = this.closest('.post').querySelector('.likes strong');
                const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
                likesElement.textContent = (currentLikes + 1).toLocaleString() + ' likes';
            }
        });

        // Save button
        const saveBtn = post.querySelector('.save-btn');
        saveBtn.addEventListener('click', function() {
            if (this.classList.contains('fas')) {
                this.classList.remove('fas');
                this.classList.add('far');
            } else {
                this.classList.remove('far');
                this.classList.add('fas');
            }
        });

        // Double tap to like
        const postImage = post.querySelector('.post-image img');
        let tapCount = 0;
        let tapTimer;
        
        postImage.addEventListener('click', function() {
            tapCount++;
            
            if (tapCount === 1) {
                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, 300);
            } else if (tapCount === 2) {
                clearTimeout(tapTimer);
                tapCount = 0;
                
                const likeButton = this.closest('.post').querySelector('.like-btn');
                if (!likeButton.classList.contains('liked')) {
                    likeButton.click();
                    showHeartAnimation(this);
                }
            }
        });
    }

    // Navigation active states
    const navIcons = document.querySelectorAll('.nav-right i');
    
    navIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // Remove active state from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active state to clicked icon
            this.classList.add('active');
            
            // Home icon is active by default
            if (index === 0) {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Set home icon as active by default
    if (navIcons[0]) {
        navIcons[0].classList.add('active');
    }
});