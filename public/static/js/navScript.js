const ni2 = document.getElementsByClassName("ni2");

for (let link of ni2) {
    link.onclick = function () {
        document.getElementById("nav-check2").checked = false;
    }
}