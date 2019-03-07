let element = document.createElement("div");
element.classList.add("foodList");
document.body.appendChild(element);
let foodLog = document.querySelector(".foodList")
const builder = (insertMe) => {
    return `
        <div>
            <h1>${insertMe.name}</h1>
            <p>${insertMe.ethnicity} ${insertMe.category}</p>
            <p>${insertMe.ingredients}</p>
            <p>${insertMe.country}</p>
            <p>${insertMe.calories} calories per serving</p>
            <p>${insertMe.fat}g fat per serving</p>
            <p>${insertMe.sugar}g of sugar per serving</p>

        </div>
    `;
}
const render = (item) => {
    foodLog.innerHTML += builder(item);
}
fetch("http://localhost:8088/food")
    .then(food => food.json())
    .then(parsedFood => {
        parsedFood.forEach(food => {
            // render(food)
            // console.log(food);
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text;
                    food.country = productInfo.product.countries;
                    food.calories = Math.ceil((productInfo.product.nutriments.energy_serving) / 4.184);
                    food.fat = productInfo.product.nutriments.fat_serving;
                    food.sugar = productInfo.product.nutriments.sugars_serving;
                    render(food);
                })
        })
    });

// Alternative way to write this code, function expressions
//instead of arrow

// fetch("http://localhost:8088/food")
//     .then(function(foods) {
//         return foods.json();
//     })
//     .then(function (parsedFoods) {
//         console.table(parsedFoods);
//     });
// Ingredients
// Country of origin
// Calories per serving
// Fat per serving
// Sugar per serving


