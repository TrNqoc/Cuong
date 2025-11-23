//// Nếu người dùng đăng đăng nhập.
if (localStorage.getItem("currentUser")) {
  document.querySelector("#avatar-action-container").innerHTML += /*html*/ `
    <div tabindex="0" class="avatar-action">
      <img src="${`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        JSON.parse(localStorage.getItem("currentUser")).username
      )}`}" />
      <div class="popup">
        <button class="action-button" onclick="handleSignOut()">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span> Logout</span>
        </button>
      </div>
    </div>
  `;
} else {
  document.querySelector("#avatar-action-container").innerHTML += /*html*/ `
    <a style="font-size: 25px" href="./login.html">
      <i class="fa-solid fa-right-to-bracket"></i>
    </a>
  `;
}