import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {
    state = {
      fishes: {},
      order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        console.log("Adding a fish!");
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
            // same as fishes: fishes in ES6
        })
    }

    updateFish = (key, updatedFish) => {
        // copy the current fish
        const fishes = { ...this.state.fishes };
        // update that state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // take a copy of state (because it's an object)
        const fishes = { ...this.state.fishes };
        // update the state
        fishes[key] = null;
        // update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key]; // doesn't have to set to null since aren't mirroring to Firebase
        this.setState({ order });
    }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
              {Object.keys(this.state.fishes).map(key =>
                  <Fish key={key}
                        index={key}
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder}>
                      key
                  </Fish>)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;