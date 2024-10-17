import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Ranking from './components/Ranking/Ranking';
import About from './components/About/About';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Detector from './components/Detector/Detector';
import Footer from './components/Footer/Footer'


class App extends React.Component {

  constructor(){
    super();
    const storedRoute = sessionStorage.getItem('route') || 'home'; // Check ssesionStorage immediately
      this.state = {
        Signed : false,
        route: storedRoute, // Set the route based on localStorage
        user : {
          id:'',
          name : '',
          email : '',
          entries : '',
      }
      };
      }

onRouteChange = (route) => {
  this.setState({route: route});
  if(route ==='signout'){
    this.LoadOutUser();
  }
    // Save the route to sessionStorage
   sessionStorage.setItem('route', route);
}

LoadUser = (db_user_data) =>{
    this.setState({
    user : {
      id : db_user_data.id,
      name : db_user_data.name,
      email : db_user_data.email,
      entries : db_user_data.entries
    },
    Signed : true
  });
 // Save user data to localStorage
  localStorage.setItem('user',JSON.stringify(db_user_data));

}
LoadOutUser = () =>{
  // Clear localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('route');

  this.setState({
    
  user : {
    id : '',
    name : '',
    email : '',
    entries : ''
  },
  Signed : false,
  route : 'home'
  });
  }

  onEntriesChange = (key) =>{
    this.setState(Object.assign(this.state.user , {entries:key}));
  }


  componentDidMount() {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedRoute = sessionStorage.getItem('route');
   
    if (storedUser && storedUser.id) {
      this.setState({
        user: storedUser,
        Signed: true
      });
    }

    if (storedRoute) {
      this.setState({ route: storedRoute });
    }
  }
  

    render(){
      const {route} = this.state;
      let content ;

      switch(route){
        case 'home':
          content  = <Ranking />;
          break;

        case 'about' :
          content =  <About />;
          break;

        case 'signin' : 
        content = (
          <Signin onRouteChange={this.onRouteChange}
                            LoadUser = {this.LoadUser} />
            );
        break;

        case 'register' : 
        content = (
          <Register  onRouteChange={this.onRouteChange}
          LoadUser = {this.LoadUser}/>
            ) ;
            break;

        case 'detector' : 
        content = (
        <Detector name = {this.state.user.name}
        entries = {this.state.user.entries}
        id = {this.state.user.id}
        onEntriesChange = {this.onEntriesChange}/>
      
      );
        break;

        default: 
        content = <Ranking/>;
        
            }
    
      return(
        <div className="app-container">
        <div className="main-content">
            <Navigation 
                Signed={this.state.Signed}
                onRouteChange={this.onRouteChange}
            />
            {content}
        </div>
        <Footer />
    </div>
      );
    }
 
  }


export default App;
