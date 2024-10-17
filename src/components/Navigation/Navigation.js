import React from "react";
import './nav.css';

class Navigation extends React.Component {

  

    render(){
        const {Signed,onRouteChange} = this.props;
        if(!Signed){
            return(
                <div>
                  <nav className='zone black'>
                    <ul className='main-nav'>
                        <li onClick={() => onRouteChange('home')}><span className='navtitle'>Home</span></li>
                        <li onClick={()=> onRouteChange('about')}><span className='navtitle'>About</span></li>
                        <li className='pushleft'>
                            <ul  className='left-nav'>
                            <li onClick={()=>onRouteChange('signin')}><span className='navtitle'>Sign in</span></li>
                            <li onClick={() => onRouteChange('register')}
                            style={{marginRight:'35px'}}><span className='navtitle'>Register !</span></li>
                            </ul>
                         </li>
                    </ul>
                   </nav>
                </div>
        );
        }else{
            return(
                <div>
                  <nav className='zone black'>
                    <ul className='main-nav'>
                        <li onClick={() => onRouteChange('home')}><span className='navtitle'>Home</span></li>
                        <li onClick={()=> onRouteChange('detector')}><span className='navtitle'>Detector</span></li>
                        <li onClick={()=> onRouteChange('about')}><span className='navtitle'>About</span></li>
                        <li className='pushleft'>
                            <ul  className='left-nav'>
                            <li onClick={()=>onRouteChange('signout')}><span className='navtitle'>Sign Out</span></li>
                    
                            </ul>
                         </li>
                    </ul>
                   </nav>
                </div>
        );
        }
      
    }
}


export default Navigation;