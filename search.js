document.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search).get('query');
    const recipeContainer = document.querySelector('.recipe-container');
    const recipeDetailsContent = document.querySelector('.recipe-details-content');
    const recipeModal = document.getElementById('recipeModal');
    const closeModalBtn = document.querySelector('.close');
  
    // Function to open recipe details popup
    const openRecipePopup = (meal) => {
      recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong></p>
        <p>${meal.strInstructions}</p>
        ${meal.strYoutube ? `<p><strong>Watch on YouTube:</strong> <a href="${meal.strYoutube}" target="_blank">Recipe Video</a></p>` : ''}
      `;
      recipeModal.style.display = 'flex';
    }
  
    // Function to close recipe details popup
    closeModalBtn.addEventListener('click', () => {
      recipeModal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
      }
    });
  
    // Fetch search results
    const fetchSearchResults = async (query) => {
      recipeContainer.innerHTML = "<h2>Loading search results...</h2>";
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
  
      recipeContainer.innerHTML = "";
      data.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>It belongs to <span>${meal.strCategory}</span></p>
        `;
        recipeDiv.addEventListener('click', () => {
          openRecipePopup(meal);
        });
  
        recipeContainer.appendChild(recipeDiv);
      });
    }
  
    // Initialize search results
    if (query) {
      fetchSearchResults(query);
    }
  });
  