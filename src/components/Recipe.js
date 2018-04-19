import React from 'react';
import DropIngredients from './DropIngredients.js';
class Recipe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        drop: "hide"
      };
    }
  
    handleDelete = () => {
      let temp = JSON.parse(localStorage.getItem("recipes"));
      console.log(this.props.index);
      temp.splice(this.props.index, 1);
      localStorage.setItem("recipes", JSON.stringify(temp));
      this.props.update();
      this.setState({ drop: "" });
    };
  
    handleDrop = event => {
      this.props.selected(event);
      if (this.state.drop === "hide") {
        this.setState({
          drop: ''
        });
      } else {
        this.setState({
          drop: "hide"
        });
      }
    };
    render() {
      return (
        <div className="recipe">
          <div id={this.props.index} className="title" onClick={this.handleDrop}>
            {this.props.title}
          </div>
          <div><DropIngredients
              visible={this.state.drop}
              handleDelete={this.handleDelete}
              edit={() => {
                this.props.edit(this.props);
              }}
              ingredients={this.props.ingredients.split(",")}
            /></div>
        </div>
      );
    }
  }
  export default Recipe;