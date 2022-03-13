import React, { Component} from 'react';
import './Home.css'
import Navbar from '../Navbar/Navbar';

class Layout extends Component {
    render() {
        return (
          <>
            <Navbar />
            <div className="bg-img">
              <span className='center' aria-label={this.props.copy} role={this.props.role}>
                {this.props.copy.split("").map(function(char, index){
                  let style = {"animationDelay": (0.5 + index / 10) + "s"}
                    return <span
                    aria-hidden="true"
                    key={index}
                    style={style}>
                    {char}
                    </span>;
                })}
              </span>
            </div>
          </>
        );
    }
}

class Home extends Component {

  render() {
    return <h1><Layout copy="Réseau Social Groupomania" role="heading" /></h1>;
  }
}

export default Home;