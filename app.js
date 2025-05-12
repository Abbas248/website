var allUsers = [];
var users = localStorage.getItem('users');
if(users !== null){
    allUsers = JSON.parse(users)
}
function signup() {
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    // Check if user already exists
    var existingUser = allUsers.find(user => user.email === email.value);
    if (existingUser) {
        alert("User already exists with this email. Please login.");
        return;
    }
    var user = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    allUsers.push(user);
    localStorage.setItem('users', JSON.stringify(allUsers));
    location.href = "./login.html";
}
function login() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var filterUser = users.find(data => data.email === email.value && data.password === password.value);
    if (filterUser) {
        alert("User login successful");
        location.href = "./deshbord.html";
    } else {
        alert("Email/password incorrect");
    }
}

// Load posts from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
  var storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  storedPosts.forEach(post => addCard(post.image, post.caption, post.price));
});
function postData() {
  var imageInput = document.getElementById('image-input');
  var captionInput = document.getElementById('caption-input');
  var priceInput = document.getElementById('price-input');
  if (!imageInput.files[0]) return alert("Please upload an image.");
  var reader = new FileReader();
  reader.onload = function (e) {
    var imageUrl = e.target.result;
    var caption = captionInput.value;
    var price = priceInput.value;
    // Save to localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ image: imageUrl, caption: caption, price: price });
    localStorage.setItem('posts', JSON.stringify(posts));
    // Add to display
    addCard(imageUrl, caption, price);
    // Reset form
    document.getElementById('postForm').reset();
    // Close modal
    var modalElement = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modalElement.hide();
  };
  reader.readAsDataURL(imageInput.files[0]);
}
function addCard(imageUrl, caption, price) {
  var postDisplay = document.getElementById('post-display');
  var card = document.createElement('div');
  card.className = 'card post-card';
  card.innerHTML = `<img src="${imageUrl}" class="card-img-top" alt="Post Image">
    <div class="card-body">
      <h5 class="card-title">${caption}</h5>
      <p class="card-text">Price: $${price}</p>
    </div>`;
  postDisplay.appendChild(card);
}
  function logOut() {
    alert("You clicked Log out");
    location.href = "./index.html";
  }


