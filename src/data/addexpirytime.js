// Date.prototype.addHours = function (h) {
//     this.setTime(this.getTime() + h * 60 * 60 * 1000);
//     return this;
// };

function addexpirytime() {
  /////// ADD HOURS
  // let NewDate = new Date();
  // NewDate = NewDate.addHours(1);
  // NewDate = NewDate.getTime();
  // localStorage.removeItem('expiry');
  // localStorage.setItem("expiry", JSON.stringify(NewDate));

  // ADD MINUTES
  let NewDate = new Date();
  let minutesToAdd = 0.5;
  NewDate = new Date(NewDate.getTime() + minutesToAdd * 60000);
  localStorage.removeItem("expiry");
  localStorage.setItem("expiry", JSON.stringify(NewDate.getTime()));
  //localStorage.setItem("location_path", location.location_path);
  //localStorage.setItem("location_path", JSON.stringify());
}

export default addexpirytime;
