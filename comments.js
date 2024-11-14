const commentSection = document.getElementById('commentSection');
const newComment = document.getElementById('newComment');
const charCount = document.getElementById('charCount');
let userCounter = 1;  

newComment.addEventListener('input', () => {
    charCount.textContent = `${250 - newComment.value.length} characters remaining`;
});

function addComment(parentId = null) {
    const commentText = parentId ? document.getElementById(`replyInput-${parentId}`).value : newComment.value;
    if (!commentText.trim()) return; 

    const commentId = Date.now(); 
    const comment = document.createElement('div');
    comment.className = "p-4 bg-gray-200 rounded-lg";
    
   
    const userLabel = parentId ? `Reply by User` : `User ${userCounter++}`;
    
    comment.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="font-bold">${userLabel}</span>
            <button onclick="toggleReplies(${commentId})" class="text-sm text-blue-500">Toggle Replies</button>
        </div>
        <p>${commentText}</p>
        <div class="flex space-x-2 mt-2">
            <button onclick="showReplyInput(${commentId})" class="text-sm text-blue-500">Reply</button>
            <button onclick="deleteComment(${commentId})" class="text-sm text-red-500">Delete</button>
        </div>
        <div id="replySection-${commentId}" class="ml-6 mt-4 space-y-2 hidden"></div>
        <div id="replyInputContainer-${commentId}" class="ml-6 mt-2 hidden">
            <textarea id="replyInput-${commentId}" maxlength="250" placeholder="Write a reply..." class="w-full p-2 border rounded mb-2"></textarea>
            <button onclick="addComment(${commentId})" class="bg-blue-500 text-white px-4 py-1 rounded">Add Reply</button>
        </div>
    `;

    if (parentId) {
        document.getElementById(`replySection-${parentId}`).appendChild(comment);
        document.getElementById(`replyInput-${parentId}`).value = ""; 
    } else {
        commentSection.appendChild(comment);
        newComment.value = ""; 
        charCount.textContent = "250 characters remaining";
    }
}

function showReplyInput(commentId) {
    const replyInputContainer = document.getElementById(`replyInputContainer-${commentId}`);
    replyInputContainer.classList.toggle('hidden');
}

function deleteComment(commentId) {
    const comment = document.getElementById(`replySection-${commentId}`) || document.getElementById(`comment-${commentId}`);
    if (comment) {
        comment.remove();
    }
}

function toggleReplies(commentId) {
    const replySection = document.getElementById(`replySection-${commentId}`);
    if (replySection) {
        replySection.classList.toggle('hidden');
    }
}

// Reset button functionality
const resetButton = document.getElementById('resetButton');

function resetComments() {
    const confirmation = confirm("Are you sure you want to delete all comments?");
    if (confirmation) { 
        commentSection.innerHTML = '';
        userCounter = 1;  
        alert("All comments have been deleted.");
    }
}

resetButton.addEventListener('click', resetComments);
