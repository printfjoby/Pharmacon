import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Pharmasist = props => (
  <tr>
    <td>{props.pharmasist.first_name + " " + props.pharmasist.last_name}</td>
	<td>{props.pharmasist.email}</td>
    <td>
     <Link to="#" onClick={() => { props.deletePharmasist(props.pharmasist._id) }}>Remove</Link>
    </td>
  </tr>
)

export default class PharmasistsList extends Component {
	constructor(props) {
	  super(props);
	  this.deletePharmasist = this.deletePharmasist.bind(this);
	  this.state = {
	  	pharmasists: []
	  };
	}

	componentDidMount() {
	  axios.get('http://localhost:5000/pharmasistInfo/')
	   .then(response => {
	     this.setState({ pharmasists: response.data });
	   })
	   .catch((error) => {
	      console.log(error);
	   })
	}

	deletePharmasist(id) {
	  axios.delete('http://localhost:5000/users/'+id)
		.then(res => {
	  	 	this.setState({
		  		pharmasists: this.state.pharmasists.filter(el => el._id !== id)
			 });
		})
		.catch((error) => {
			console.log(error);
		})
	}

	pharmasistList() {
	  return this.state.pharmasists.map(currentPharmasist => {
	    return <Pharmasist pharmasist={currentPharmasist} deletePharmasist={this.deletePharmasist} key={currentPharmasist._id}/>;
	  })
	}
	render() {
	    return (
	        <>
			<div>
			  <h3 style={{textAlign:"center"}}>Pharmacists List</h3>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
					<th>Email</th>
			        <th>Actions</th>
			      </tr>
			    </thead>
			    <tbody>
			      { this.pharmasistList() }
			    </tbody>
			  </table>
		    </div>
			</>
	    )
	}
}