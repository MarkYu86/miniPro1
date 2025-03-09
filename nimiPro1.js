let allCars = [];
fetch("http://localhost:3000/cars")
  .then((response) => {
    if(!response.ok){
      throw new Error(`Error Status:${response.status}`)
    }
    return response.json()
  })
  .then((json) => {
    allCars = json;
    popCars(allCars);
  });

function popCars(cars){
  const carList = document.querySelector('#car-list')
  carList.innerHTML = "";//remove it later to check 
  cars.forEach((car)=>{
    addCars(car)
  });
}

function addCars(car) {
  const template = document
    .getElementById("car-template")
    .content.cloneNode(true);
  template.querySelector(".card-img-top").src = car.imageUrl;
  template.querySelector(".car-make").innerText = car.make;
  template.querySelector(".car-model").innerText = `${car.model} ${car.year}`;
  document.querySelector("#car-list").appendChild(template);
}


document.getElementById('filter').addEventListener('change',function(){
  const chosenYear = this.value;
  if(chosenYear){
    const filteredCars = allCars.filter((car)=>{
      const carYear = car.year;
      if (chosenYear === "-1980" && carYear < 1980) return true;
      if (chosenYear === "1980-1990" && carYear >= 1980 && carYear < 1990)
        return true;
      if (chosenYear === "1990-2000" && carYear >= 1990 && carYear < 2000)
        return true;
      if (chosenYear === "2000-2010" && carYear >= 2000 && carYear < 2010)
        return true;
      if (chosenYear === "2010-" && carYear >= 2010) return true;
      return false;
    });
    popCars(filteredCars);
  }else{
    popCars(allCars)
  }
})
document.querySelector('button').addEventListener('click',function(){
  document.getElementById('filter').value = '';
  popCars(allCars);
})