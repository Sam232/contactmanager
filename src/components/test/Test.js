import React, { Component } from 'react';

class Text extends Component{
  state = {
    title: '',
    body: '',
    err: {}
  }

  //This lifecycle method gets called after the component has mounted. That is after the render function has been called.
  componentDidMount(){
    // this.setState({
    //   message: 'hello'
    // });
    // console.log("componentdidmount called....");

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        body: data.body
      }))
      .catch(err => this.setState({
        err
      }))
  }

  // //This lifecycle method gets called before the component mounts. That is, it is called before the render function and the componentdidmount function.
  // // componentWillMount(){
  // //   console.log("componentwillmount called...");
  // // }

  // //This lifecycle method gets called when the state is updated. It will be called after the render function has been called because the render function gets called immediately after the state has been updated
  // componentDidUpdate(){
  //   console.log("componentdidupdate...");
  // }

  // //This lifecycle method gets called before the state is updated
  // // componentWillUpdate(){
  // //   console.log("componentwillupdate...")
  // // }

  // //This is a lifecycle method that gets called when redux passes a property to your component. This lifecycle method has been deprecated in reactjs 16 but can be used in reactjs 17. Because of this, you will always have to prepend UNSAFE_ to the lifecycle method. This also apply to all lifecycle methods that include Will.
  // // UNSAFE_componentWillReceiveProps(nextProps, nextState){
  // //   console.log("componentwillreceiveprops...");
  // // }

  // //This lifecycle method is the substitute for componentWillReceiveProps
  // static getDerivedStateFromProps(nextProps, prevState){
  //   console.log(prevState)
  //   return {
  //     message: "hello"
  //   };
  // }

  // //Where a state is to be updated getSnapshotBeforeUpdate lifecycle method gets called and receives the old state value before the render function will be called for the state update to take effect. It also returns an object that will be received as a parameter by the componentDidUpdate lifecycle method which will container infor. such as current scroll position etc.
  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   return null;
  // }

  //This lifecycle method gets called immediatedly after the component has been mounted. Because of this, it is always called before the componentdidmount function.
  render(){
    console.log("render function called");
    console.log(this.state);
    const { title, body } = this.state;
    return(
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Text;