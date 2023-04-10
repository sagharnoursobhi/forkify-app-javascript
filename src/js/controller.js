//import 'core-js/stable';
//import 'regenertor-runtime/runtime';
import icons from 'url:../img/icons.svg';
console.log(icons);


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// https://forkify-v2.netlify.app/#5ed6604591c37cdc054bca21

///////////////////////////////////////

/* const showRecipe = () => {
  fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886').then(res => res.json()).
  then(data => console.log(data))
}

showRecipe(); */

const renderSpinner = (parentEl) => {
   const spinner = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', spinner);
}

const showRecipe = async() => {
  
  try {
    renderSpinner(recipeContainer);
    // LOADING THE RECIPE
    //const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb34');
    const data = await response.json();
    console.log(response, data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients 
    }
    console.log(recipe)

    // RENDERING THE RECIPE
    let recipeMarkup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${
          recipe.ingredients.map(ingr => {
            return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingr.quantity || ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingr.unit}</span>
                ${ingr.description}
              </div>
            </li>
          `
          }).join('')
        }
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}/span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `
  
  //when we are going to insert a new recipe we don't want to have previous markup.
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', recipeMarkup);

    if(!response.ok) {
      throw Error(`${data.message} (${response.status})`)
    }
  } catch(err) {
    alert(err);
  }
}

showRecipe();



