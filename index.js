// on load
window.sessionStorage.clear();
document.getElementById("showCreateNewUser").style.visibility = "visible";
document.getElementById("myDIV").style.visibility = "hidden";
document.getElementById("showLeftItem").style.visibility = "hidden";

// initial values
let users = [];
let userName = "";
let myGroceryItems = [];
let indexOfUserDetail = "";
let maxItem = 5;

function newUser() {
  userName = document.getElementById("userName").value;
  if (userName === "") {
    onError("enter user name");
  } else {
    userDetail = {
      name: userName,
    };
    users.push(userDetail);
    window.sessionStorage.setItem("users", JSON.stringify(users));
    changeStatus();
  }
}

function addGroceries() {
  let li = document.createElement("li");
  let groceryName = document.getElementById("myGrocery").value;
  li.appendChild(document.createTextNode(groceryName));
  if (groceryName === "") {
    onError("enter grocery name");
    return;
  } else if (maxItem === 0) {
    onError(`can not add more than 5 items`);
  } else {
    document.getElementById("myUL").appendChild(li);
    addItemToSession(groceryName);
  }
}

function addItemToSession(groceryName) {
  myGroceryItems.push(groceryName);
  const sessionData = JSON.parse(sessionStorage.getItem("users"));
  const index = sessionData.findIndex((x) => x.name === userName);
  sessionData[index] = {
    name: userName,
    groceries: myGroceryItems,
  };
  window.sessionStorage.setItem("users", JSON.stringify(sessionData));
  maxItem -= 1;
  document.getElementById("myText").innerHTML = maxItem;
  document.getElementById("showLeftItem").style.visibility = "visible";
  document.getElementById("myGrocery").value = "";
}

function changeStatus() {
  const sessionData = JSON.parse(sessionStorage.getItem("users"));
  if (sessionData) {
    document.getElementById("showCreateNewUser").style.visibility = "hidden";
    document.getElementById("myDIV").style.visibility = "visible";
  } else {
    console.log("No users found");
  }
}

function onError(err) {
  alert(err);
}
