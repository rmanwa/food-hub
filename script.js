document.addEventListener('DOMContentLoaded', () => {
    const searchBoxHeader = document.querySelector('header .searchBox');
    const searchBtnHeader = document.querySelector('header .searchBtn');
    const searchBoxMain = document.querySelector('.main-search .searchBox');
    const searchBtnMain = document.querySelector('.main-search .searchBtn');
    const featuredContainer = document.querySelector('.featured-container');
    const popularContainer = document.querySelector('.popular-container');
  
    // Function to redirect to the search results page with the query as a parameter
    const redirectToSearchResults = (query) => {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  
    // Event listeners for the search forms
    searchBtnHeader.addEventListener('click', (e) => {
      e.preventDefault();
      const searchInput = searchBoxHeader.value.trim();
      if (searchInput) {
        redirectToSearchResults(searchInput);
      } else {
        alert("Please enter a search term.");
      }
    });
  
    searchBtnMain.addEventListener('click', (e) => {
      e.preventDefault();
      const searchInput = searchBoxMain.value.trim();
      if (searchInput) {
        redirectToSearchResults(searchInput);
      } else {
        alert("Please enter a search term.");
      }
    });
  
    // Function to open a modal with recipe details
    const openRecipePopup = (meal) => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <p><strong>Instructions:</strong></p>
          <p>${meal.strInstructions}</p>
          ${meal.strYoutube ? `<p><strong>Watch on YouTube:</strong> <a href="${meal.strYoutube}" target="_blank">Recipe Video</a></p>` : ''}
        </div>
      `;
  
      document.body.appendChild(modal);
  
      // Close modal
      modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
      });
  
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    }
  
    // Fetch random recipes for featured section
    const fetchRandomRecipes = async () => {
      featuredContainer.innerHTML = "<h2>Loading featured recipes...</h2>";
      const promises = Array.from({ length: 6 }, () => fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()));
      const responses = await Promise.all(promises);
  
      featuredContainer.innerHTML = "";
      responses.forEach(response => {
        const meal = response.meals[0];
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('featured-recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>It belongs to <span>${meal.strCategory}</span></p>
        `;
  
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
  
        button.addEventListener('click', () => {
          openRecipePopup(meal);
        });
  
        featuredContainer.appendChild(recipeDiv);
      });
    }
  
    // Fetch popular recipes for popular section
    const fetchPopularRecipes = async () => {
      popularContainer.innerHTML = "<h2>Loading popular recipes...</h2>";
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
  
      popularContainer.innerHTML = "";
      data.meals.slice(0, 9).forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('popular-recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>It belongs to <span>${meal.strCategory}</span></p>
        `;
  
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
  
        button.addEventListener('click', () => {
          openRecipePopup(meal);
        });
  
        popularContainer.appendChild(recipeDiv);
      });
    }
  
    // Initialize sections
    fetchRandomRecipes();
    fetchPopularRecipes();
  });
  