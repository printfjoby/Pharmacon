import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const User = props => (
  <tr>
    <td>{props.user.first_name + " " + props.user.last_name}</td>
	<td>{props.user.email}</td>
	<td>{props.user.role}</td>
    <td>
     <Link to="#" onClick={() => { props.approveUser(props.user._id) }}>Approve</Link> |
	 	 <Link to="#" onClick={() => { props.deleteUser(props.user._id) }}> Reject</Link>
    </td>
  </tr>
)

export default class ApproveUser extends Component {
	constructor(props) {
	  super(props);
	  this.approveUser = this.approveUser.bind(this);
	  this.deleteUser = this.deleteUser.bind(this);
	  this.state = {
	  	users: []
	  };
	}

	componentDidMount() {
	  axios.get('http://localhost:5000/users/inactive')
	   .then(response => {
	     this.setState({ users: response.data });
	   })
	   .catch((error) => {
	      console.log(error);
	   })
	}

	approveUser(id) {
	  const data ={
		  _id: id,  //id of the user who's status is to be update
		  acc_status:true  
	  } 
	  axios.put('http://localhost:5000/users/approve', data) //put is used for update
		.then(res => {
	  	 	this.setState({
		  		users: this.state.users.filter(el => el._id !== id)
			 });
		})
		.catch((error) => {
			console.log(error);
		})
	}

	deleteUser(id) {
	  axios.delete('http://localhost:5000/users/'+id)
		.then(res => {
			this.setState({
			users: this.state.users.filter(el => el._id !== id)
			});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	userList() {
	  return this.state.users.map(currentUser => {
	    return <User user={currentUser} approveUser={this.approveUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
	  })
	}
	render() {
	    return (
	        <>
			<div>
			  <h3 style={{textAlign:"center"}}>Approval Waiting List</h3>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
					<th>Email</th>
					<th>Role</th>
			        <th>Actions</th>
			      </tr>
			    </thead>
			    <tbody>
			      { this.userList() }
			    </tbody>
			  </table>
		    </div>
			</>
	    )
	}
}