import { React, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Header, RecipeCard, NavigationCard, Button, Title } from '../../components';
import { apiKey } from '../../config';
import '../../sharedStyles.scss';

function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  const [foodJoke, setFoodJoke] = useState('');

  const fetchRandomRecipes = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`,
    )
      .then((response) => response.json())
      .then((data) => {
        setRandomRecipes(data.recipes);
      });
  };

  const fetchRandomFoodJoke = async () => {
    await fetch(
      `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setFoodJoke(data.text);
      });
  };
  useEffect(() => {
    // fetchRandomRecipes();
    fetchRandomFoodJoke();
  }, []);

  const menuCards = [
    {
      title: 'Discover',
      description:
        'Discover new recipes by selecting ingridients, nutritions or just by typing a keyword!',
      routerLink: '/discover',
      testId: 'discover',
    },
    {
      title: 'Plan my menu',
      description:
        'Plan your menu for the day, for the week or for the rest of the year!',
      routerLink: '/menu-planner',
      testId: 'menu-planner',
    },
    {
      title: 'Create custom recipe',
      description: 'Create your own  tasty recipes!',
      routerLink: '/custom-recipe',
      testId: 'custom-recipe',
    },
    {
      title: 'Favorite recipes',
      description:
        'Check out your favorite recipes so you can cook them again!',
      routerLink: '/favorite-recipes',
      testId: 'favorite-recipes',
    },
  ];
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-cards">
          {menuCards?.map((card, index) => (
            <NavigationCard
              testId={card.testId}
              key={index}
              title={card.title}
              description={card.description}
              routerLink={card.routerLink}
            />
          ))}
        </div>
        <div>
          <h6 data-testid="random-food-joke-label">Random food joke: </h6>
          <p data-testid="food-joke">{parse(foodJoke)}</p>
        </div>
        <Title title="Daily Recipes" />
        <div className="button-container">
          {' '}
          <Button onClick={fetchRandomRecipes} label="show recipes" />
          {' '}
        </div>

        <div className="recipe-cards-container">
          {randomRecipes?.map((recipe, index) => <RecipeCard key={index} props={recipe} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
