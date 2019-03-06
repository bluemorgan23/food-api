let element = document.createElement("div");
element.classList.add("foodList");
document.body.appendChild(element);
let foodLog = document.querySelector(".foodList")

const builder = (insertMe) => {
    return `
        <div>
            <h1>${insertMe.name}</h1>
            <p>${insertMe.category}</p>
            <p>${insertMe.ethnicity}</p>
        </div>
    `;
} 

const render = (item) => {
    foodLog.innerHTML += builder(item);
    console.log(item);
}

fetch("http://localhost:8088/food")
    .then(food => food.json())
    .then(parsedFood => {
        parsedFood.forEach(food => {
            render(food)
        })
    });

// Alternative way to write this code, function expressions  
// instead of arrow 

// fetch("http://localhost:8088/food")
//     .then(function(foods) {
//         return foods.json();
//     })
//     .then(function (parsedFoods) {
//         console.table(parsedFoods);
//     });



