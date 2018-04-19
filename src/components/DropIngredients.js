import React from 'react';
class DropIngredients extends React.Component {
    constructor(props){
      super(props);
      this.state={
        ingredients: this.props.ingredients
      }
    }
    render(){
    return (
      <div className={"dropbox "+this.props.visible}>
        <div className="hr">
          Ingredients<hr />
        </div>
        <div className="dropingredient">
          {this.props.ingredients.map((item, index) => {
            return <div id={"i" + index}>{item}</div>;
          })}
          <div className="formbutton addnew" onClick={this.props.handleDelete}>
            delete
          </div>
          <div className="formbutton addnew" onClick={this.props.edit}>
            edit
          </div>
        </div>
      </div>
    );
     }  
  }
  export default DropIngredients;