import React from 'react';
 function RecipeForm(props) {


  return (
    <div className="recipeform">
      <div className="test">{props.action + " recipe"}</div>

      <label>recipe title</label>
      <input id="title" onChange={props.title} value={props.titleValue} />
      <label>ingredients</label>
      <textarea
        id="ingredients"
        onChange={props.ingredients}
        value={props.ingredientsValue}
      />

      <div className="flexbutton">
        <div
          id={props.action}
          className="formbutton addnew"
          onClick={props.submitFunc}
        >
          {props.menu}
        </div>
        <div className="formbutton addnew" onClick={props.submitFunc}>
          close
        </div>
      </div>
    </div>
  );
}
export default RecipeForm;