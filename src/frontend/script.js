const loginbtn = document.querySelector("#loginBtn");

const checkLogin = async () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await response.json();
  console.log(response);
  if (response.ok) {
    window.location.href = "index.html";
  } else {
    //   window.location.href = "login.html";
    alert(data.message);
  }
};

loginbtn.addEventListener("click", checkLogin);
// login.addEventListener('click',()=>{
//     console.log(username);
//     console.log(password);
// })
