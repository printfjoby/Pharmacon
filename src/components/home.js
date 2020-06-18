import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component {
  render() {
    return (
        <div  >  

          <Carousel>  
            <Carousel.Item >  

              <img style={{"width":"100%",'height':"95vh"}}  

                className="d-block w-100"  

                src={'/images/doctor1.jpg'}  />  

              <Carousel.Caption style={{'paddingBottom':"30vh"}} >  
                <div className="container">
                  <div className="jumbotron mt-5" style={{'opacity': '0.5'}} >
                    <div style={{'color':"#000000"}}>
                      <h3> Welcome To Pharmacon </h3> 
                      <h5> Make Prescriptions Digital! </h5>
                    </div>
                  </div>
                </div>
              </Carousel.Caption>  

            </Carousel.Item  > 
            <Carousel.Item style={{'height':"95vh"}} >  

              <img style={{'height':"95vh"}}  

                className="d-block w-100"  

                src={'/images/doctor6.png'}  />  

              <Carousel.Caption style={{'paddingBottom':"30vh"}} >  
                <div className="container">
                  <div className="jumbotron mt-5" style={{'opacity': '0.5'}} >
                    <div style={{'color':"#000000"}}>
                      <h3> Pharmacon </h3> 
                      <h5> Makes Prescriptions Paperless! </h5>
                    </div>
                  </div>
                </div>
              </Carousel.Caption>  
              
            </Carousel.Item  > 

          </Carousel>  
      </div> 
    )
  }
}

export default Home;
