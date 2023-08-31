if (!localStorage.getItem("favouritesList")) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

window.addEventListener("DOMContentLoaded", () => {
    displayMealListOnLoad();
});

// Fetch meals from API and return them
async function getMealsFromApi(apiUrl, searchValue) {
    const res = await fetch(`${apiUrl + searchValue}`);
    const mealData = await res.json();
    return mealData;
}
//shows details of each meal
async function showMealDetails(id) {
    let apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let content = "";
    await getMealsFromApi(apiUrl, id).then(data => {
        content += `
            <div id="meal-details" class="mb-5">
                <div id="meal-header" class="d-flex justify-content-around flex-wrap">
                    <div id="meal-thumbail">
                        <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
                    </div>
                    <div id="details">
                        <h3>${data.meals[0].strMeal}</h3>
                        <h6>Category : ${data.meals[0].strCategory}</h6>
                        <h6>Area : ${data.meals[0].strArea}</h6>
                    </div>
                </div>
                <div id="meal-instruction" class="mt-3">
                    <h5 class="text-center">Instruction :</h5>
                    <p>${data.meals[0].strInstructions}</p>
                </div>
                <div class="text-center">
                    <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3">Watch Video</a>
                </div>
            </div>
        `;
    });
    document.getElementById("main").innerHTML = content;
}

//display a list when page is loaded
function displayMealListOnLoad() {
    let searchValue = 'a';
    let favMeals = JSON.parse(localStorage.getItem("favouritesList"));
    let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let content = "";
    let meals = getMealsFromApi(apiUrl, searchValue);
    meals.then(data => {
        if (data.meals) {
            data.meals.forEach((meal) => {
                let isFavorite = false;
                for (let i = 0; i < favMeals.length; i++) {
                    if (favMeals[i] == meal.idMeal) {
                        isFavorite = true;
                    }
                }
                if (isFavorite) {
                    content += `
                        <div id="card" class="card mb-3" style="width: 20rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <div class="d-flex justify-content-between mt-5">
                                    <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${meal.idMeal})">More Details</button>
                                    <button id="main${meal.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${meal.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    content += `
                        <div id="card" class="card mb-3" style="width: 20rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="text-muted">${data.meals[0].strArea} | ${data.meals[0].strCategory}</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${meal.idMeal})">More Details</button>
                                    <button id="main${meal.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${meal.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            content += `
                <div class= "page-wrap d-flex flex-row align-items-center">
                    <div class= "container">
                        <div class= "row justify-content-center">
                            <div class= "col-md-12 text-center">
                                <span class= "display-1 d-block">Not Found!!!</span>
                                <div class= "mb-4 lead">
                                    Are you sure you have typed correctly!!!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("main").innerHTML = content;
    });
}

//see the searched text and use apiurl to get other data related to it
function showMealList() {
    let searchValue = document.getElementById("my-search").value;
    let favMeals = JSON.parse(localStorage.getItem("favouritesList"));
    let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let content = "";
    let meals = getMealsFromApi(apiUrl, searchValue);
    meals.then(data => {
        if (data.meals) {
            data.meals.forEach((meal) => {
                let isFavorite = false;
                for (let i = 0; i < favMeals.length; i++) {
                    if (favMeals[i] == meal.idMeal) {
                        isFavorite = true;
                    }
                }
                if (isFavorite) {
                    content += `
                        <div id="card" class="card mb-3" style="width: 20rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="text-muted">${data.meals[0].strArea} | ${data.meals[0].strCategory}</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${meal.idMeal})">More Details</button>
                                    <button id="main${meal.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${meal.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    content += `
                        <div id="card" class="card mb-3" style="width: 20rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="text-muted">${data.meals[0].strArea} | ${data.meals[0].strCategory}</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${meal.idMeal})">More Details</button>
                                    <button id="main${meal.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${meal.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            content += `
                <div class= "page-wrap d-flex flex-row align-items-center">
                    <div class= "container">
                        <div class= "row justify-content-center">
                            <div class= "col-md-12 text-center">
                                <span class= "display-1 d-block">Not Found!!!</span>
                                <div class= "mb-4 lead">
                                    Are you sure you have typed correctly!!!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("main").innerHTML = content;
    });
}
//see the favourite meals from local storage and use apiurl to get other data related to it
async function showFavMealList() {
    let favMeals = JSON.parse(localStorage.getItem("favouritesList"));
    let apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let content = "";
    if (favMeals.length == 0) {
        content += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">You have no favorites 😞</span>
                            <div class="mb-4 lead">
                                Please select your favorite meals 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        for (let i = 0; i < favMeals.length; i++) {
            await getMealsFromApi(apiUrl, favMeals[i]).then(data => {
                content += `
                    <div id="card" class="card mb-3 shadow" style="width: 20rem;">
                        <div style="display: flex">
                            <div style="flex: 2" class="card-body">
                                <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                <p class="text-muted">${data.meals[0].strArea} | ${data.meals[0].strCategory}</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                                    <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                            <img style="height: 100px; width: 100px; flex: 1" src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                        </div>
                    </div>
                `;
            });
        }
    }
    document.getElementById("favourites-body").innerHTML = content;
}
//remove or add meals using local storage
function addRemoveToFavList(id) {
    let favMeals = JSON.parse(localStorage.getItem("favouritesList"));
    let isContained = false;
    for (let i = 0; i < favMeals.length; i++) {
        if (id == favMeals[i]) {
            isContained = true;
        }
    }
    if (isContained) {
        let index = favMeals.indexOf(id);
        favMeals.splice(index, 1);
        
    } else {
        favMeals.push(id);
        
    }
    localStorage.setItem("favouritesList", JSON.stringify(favMeals));
    showMealList();
    showFavMealList();
}
