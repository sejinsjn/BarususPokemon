const ni1 = document.getElementsByClassName("ni1");

for (let link of ni1) {
    link.onclick = function () {
        document.getElementById("nav-check1").checked = false;
    }
}