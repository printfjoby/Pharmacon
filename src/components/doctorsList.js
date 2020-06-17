import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Doctor = props => (
  <tr>
    <td>{props.doctor.first_name + " " + props.doctor.last_name}</td>
	<td>{props.doctor.email}</td>
    <td>
     <Link to="#" onClick={() => { props.deleteDoctor(props.doctor._id) }}>Remove</Link>
    </td>
  </tr>
)

export default class DoctorsList extends Component {
	constructor(props) {
	  super(props);
	  this.deleteDoctor = this.deleteDoctor.bind(this);
	  this.state = {
	  	doctors: []
	  };
	}

	componentDidMount() {
	  axios.get('http://localhost:5000/doctorInfo/')
	   .then(response => {
	     this.setState({ doctors: response.data });
	   })
	   .catch((error) => {
	      console.log(error);
	   })
	}

	deleteDoctor(id) {
	  axios.delete('http://localhost:5000/users/'+id)
		.then(res => {
	  	 	this.setState({
		  		doctors: this.state.doctors.filter(el => el._id !== id)
			 });
		})
		.catch((error) => {
			console.log(error);
		})
	}

	doctorList() {
	  return this.state.doctors.map(currentDoctor => {
	    return <Doctor doctor={currentDoctor} deleteDoctor={this.deleteDoctor} key={currentDoctor._id}/>;
	  })
	}
	render() {
	    return (
	        <>
			<div>
			  <h3 style={{textAlign:"center"}}>Doctors List</h3>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
					<th>Email</th>
			        <th>Actions</th>
			      </tr>
			    </thead>
			    <tbody>
			      { this.doctorList() }
			    </tbody>
			  </table>
		    </div>
			</>
	    )
	}
}