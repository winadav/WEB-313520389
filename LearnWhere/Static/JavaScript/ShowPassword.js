
function showPassword() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }




function submitForm(event) {
  event.preventDefault();
  alert('Your new details has been submitted! You will be taken to the Home Page');
  this.submit();
}
