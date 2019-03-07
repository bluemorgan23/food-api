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
                    for (let textProperty in productInfo.product.ingredients){
                    food.ingredients += productInfo.product.ingredients[textProperty].text.split();
                    }
                    
                    render(food);
                    
                    
                })
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



