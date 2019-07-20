import React, { Component } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";


class Categories extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log("category state = "+this.state);
        return (
            <div className="CategoryList">
                <span className="CategoryList-header">Categories:</span>
                <div className="Category">
                    <span className="Category-count">2</span>
                    <span className="Category-name">Science-fiction</span>
                </div>
                <div className="Category">
                    <span className="Category-count">1</span>
                    <span className="Category-name">Horror</span>
                </div>
                <div className="Category">
                    <span className="Category-count">2</span>
                    <span className="Category-name">History</span>
                </div>
                <div className="Category">
                    <span className="Category-count">1</span>
                    <span className="Category-name">Biography</span>
                </div>
                <div className="Category">
                    <span className="Category-count">1</span>
                    <span className="Category-name">Technology</span>
                </div>
            </div>
        )
    }
}
export default Categories

