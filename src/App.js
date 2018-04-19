import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeForm from './components/RecipeForm.js';
import Recipe from './components/Recipe';
import DropIngredients from './components/DropIngredients';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideAdd: "hide",
      hideEdit: "hide",
      selected: "",
      dim: "",
      recipeTitle: "",
      recipeIngredients: "",
      allRecipes: [],
      defaultRecipes: [{ 'title': 'Frittata', 'ingredients': '4 eggs,1/4 cup milk,1/4 tsp. dried thyme leaves,Salt and pepper,2 tsp. butter' }, { 'title': 'Lasagna', 'ingredients': '1 (16 ounce) package lasagna noodles,1 pound fresh mushrooms, sliced,3/4 cup chopped green bell pepper,3/4 cup chopped onion,3 cloves garlic, minced,2 tablespoons vegetable oil,2 (26 ounce) jars pasta sauce,1 teaspoon dried basil,1 (15 ounce) container part-skim ricotta cheese,4 cups shredded mozzarella cheese,2 eggs, 1/2 cup grated Parmesan cheese ' }]
    };
  }
  componentDidMount() {

    if (JSON.parse(localStorage.getItem("recipes")) !== null) {
      this.setState({
        allRecipes: JSON.parse(localStorage.getItem("recipes"))
      });
    }
    else if (!JSON.parse(localStorage.getItem("recipes"))) {
      localStorage.setItem("recipes", JSON.stringify(this.state.defaultRecipes));
      this.setState({
        allRecipes: JSON.parse(localStorage.getItem("recipes"))
      });
    }
  }
  showAdd = () => this.setState({ hideAdd: "show", dim: "dim" });
  showEdit = event => {
    console.log(event.ingredients);
    this.setState({

      hideEdit: "show",
      dim: "dim",
      recipeTitle: event.title,
      recipeIngredients: event.ingredients
    });
  };
  hide = event => {
    let newRecipe = {
      title: this.state.recipeTitle,
      ingredients: this.state.recipeIngredients
    };
    let temp;
    if (localStorage.getItem("recipes") !== null) {
      temp = JSON.parse(localStorage.getItem("recipes"));
    } else {
      temp = [];
    }
    if (
      event.target.id == "add" &&
      this.state.recipeTitle &&
      this.state.recipeIngredients
    ) {
      temp.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(temp));
      this.setState({
        allRecipes: JSON.parse(localStorage.getItem("recipes"))
      });
    } else if (
      event.target.id == "edit" &&
      this.state.recipeTitle &&
      this.state.recipeIngredients
    ) {
      temp.splice(this.state.selected, 1, newRecipe);
      localStorage.setItem("recipes", JSON.stringify(temp));
      this.setState({
        allRecipes: JSON.parse(localStorage.getItem("recipes"))
      });
    }

    this.setState({
      hideAdd: "hide",
      hideEdit: "hide",
      dim: "",
      recipeTitle: "",
      recipeIngredients: ""
    });
  };

  update = () => {
    this.setState({ allRecipes: JSON.parse(localStorage.getItem("recipes")) });
  };
  isSelected = event => {
    this.setState({ selected: event.target.id, menu: true });
  };
  val = event => {
    if (event.target.id === "title") {
      this.setState({
        recipeTitle: event.target.value
      });
    }
    if (event.target.id === "ingredients") {
      this.setState({ recipeIngredients: event.target.value });
    }
  };

  render() {
    return (
      <div className="main">
        <div className={"form " + this.state.hideAdd}>
          <RecipeForm
            title={this.val}
            action="add"
            menu="add recipe"
            ingredients={this.val}
            ingredientsValue={this.state.recipeIngredients}
            titleValue={this.state.recipeTitle}
            submitFunc={this.hide}
          />
        </div>
        <div className={"form " + this.state.hideEdit}>
          <RecipeForm
            title={this.val}
            action="edit"
            menu="edit"
            ingredients={this.val}
            ingredientsValue={this.state.recipeIngredients}
            titleValue={this.state.recipeTitle}
            submitFunc={this.hide}
          />
        </div>
        <div className={"flex " + this.state.dim}>
          {this.state.allRecipes.map((item, index) => {
            return (
              <Recipe
                update={this.update}
                menu={this.state.menu}
                selected={this.isSelected}
                edit={this.showEdit}
                key={index}
                index={index}
                title={item.title}
                ingredients={item.ingredients}
              />
            );
          })}
        </div>
        <div className={"addnew " + this.state.dim} onClick={this.showAdd}>
          new recipe
        </div>
      </div>
    );
  }
}

export default App;
