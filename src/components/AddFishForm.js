import React, { Component } from 'react';

class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    event.preventDefault();
    const fish = {
        nameRef: this.nameRef.value.value,
        priceRef: parseFloat(this.priceRef.value.value),
        statusRef: this.statusRef.value.value,
        descRef: this.descRef.value.value,
        imageRef: this.imageRef.value.value,
    }
    this.props.addFish(fish);
    event.currentTarget.reset();
  }
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
      <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
      <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
      <select name="status" ref={this.statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <input name="desc" ref={this.descRef} type="text" placeholder="Desc" />
      <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
      <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;