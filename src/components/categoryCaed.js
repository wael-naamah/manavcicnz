import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions';
import { Link } from 'react-router-dom';


import vegetable from '../Assets/vegetables.jpeg'; 
import green from '../Assets/green2.jpg';
import fruit from '../Assets/fruit.jpg';

class categoryCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryImage : [
                {
                    id: "1",
                    name: "Meyve",
                    img : (<img key= "1" src={fruit} />)
                },
                {
                    id: "2",
                    name: "Sebze",
                    img : (<img key="2" src={vegetable} />)
                },
                {
                    id: "3",
                    name: "Yesillik",
                    img : (<img key="3" src={green} />)
                }
            ]
        };
    }

    handleCategory(value ) {
      //  e.preventDefault();
        this.props.getProducts(value)
    }

    render() {
        var image = this.props.photo,
        catID = this.props.catID,
        category = this.props.category;
        const newTo = { 
            pathname: "/category/" + catID
          };
        const renderImage =  this.state.categoryImage.map( (cat) => {
            if(category === cat.name)
            return cat.img ;
        })
        return (
            <figure className="snip1584">
                {renderImage}
                <figcaption>
                    <h5>{category}</h5>
                </figcaption><Link to={newTo} ></Link>
            </figure>
        )
    }

}

export default connect(null, { getProducts })(categoryCard);