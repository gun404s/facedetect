import React from "react";
import './nav.css';
import { Navbar,Container ,Nav} from "react-bootstrap";

class Navigation extends React.Component {

  

    render(){
        const {Signed,onRouteChange} = this.props;
        if(!Signed){
            return(
                <div>
                 
                   <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>

                    { /******* logo nav *******/}
                        <Navbar.Brand 
                        onClick={() => onRouteChange('home')}>FaceDetection</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                        { /******* right nav *******/}
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => onRouteChange('home')}>Home</Nav.Link>
                            <Nav.Link onClick={() => onRouteChange('about')}  >About</Nav.Link>
                        </Nav>
                        { /******* left nav *******/}
                         <Nav className="ms-auto">
                            <Nav.Link className="fontweight" onClick={() => onRouteChange('signin')}>
                            <span className="fontweight">Signin</span>
                            </Nav.Link>
                            <Nav.Link className="fontweight" onClick={() => onRouteChange('register')}>
                            <span className="fontweight">Register</span>
                            </Nav.Link>
                        </Nav>
                        
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>

                </div>
        );
        }
        else{
            return(
                <div>
                    
                   <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand 
                        onClick={() => onRouteChange('home')}>FaceDetection</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Nav.Link  onClick={() => onRouteChange('home')}>Home</Nav.Link>
                            <Nav.Link  onClick={() => onRouteChange('about')}>About</Nav.Link>
                            <Nav.Link  onClick={() => onRouteChange('detector')}>Detector</Nav.Link>
                            
                        </Nav>
                        <Nav className="ms-auto">
                        <Nav.Link className="fontweight"  onClick={() => onRouteChange('signout')}><span className="fontweight">Sign Out</span></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                </div>
        );
        }
      
    }
}


export default Navigation;