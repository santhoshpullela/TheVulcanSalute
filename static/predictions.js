function setImage() {
  var img = document.getElementById("image");
  img.src = this.value;
  return false;
}
document.getElementById("ImageList").onchange = setImage;