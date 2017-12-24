import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPosts } from "../actions";

class PostsNew extends Component {
  constructor(props){
    super(props);
    this.renderInputField = this.renderInputField.bind(this);
  }

  renderInputField(field){
    const {meta: {touched , error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className = {className}>
        <label>{field.label}</label>
        <input
          className = "form-control"
          type="text"
          placeholder="Type in the Title"
          {...field.input}
        />
        <div className = "text-help">
          {touched ? error : ''}
        </div>
      </div>);
  }

  onSubmit(values){
    this.props.createPosts(values,()=>{this.props.history.push('/')});
  }

  render(){
    const { handleSubmit} = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <Field label = "Title for posts" name="title" component={this.renderInputField} />
        </div>
        <div>
          <Field label = "Categories"  name="categories" component={this.renderInputField} />
        </div>
        <div className = "form-group">
          <label htmlFor="content">Content</label>
          <Field className = "form-control" name="content" component="textarea" placeholder = "This is the body of you posts." />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        <Link className = "btn btn-danger" to="/">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title){
    errors.title = "Please enter a title!";
  }
  if(!values.categories){
    errors.categories = "Please enter a categories!";
  }
  if(!values.content){
    errors.content = "Please enter a content!";
  }
  return errors;
}

export default reduxForm({
                validate,
                form: 'PostsNewForm'
              })(connect(null, {createPosts})(PostsNew));


