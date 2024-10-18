import React from "react";

class Signin extends React.Component{

    constructor (props){
        super(props);
        
        this.state = {
            email : '',
            pass : '',
            errors: {} // Object to store validation errors
        }
    }

    /******* grab email value from mail input ***/
    OnEmailChange = (event)=>{
        this.setState({email:event.target.value})
    }

    /******* grab pass value from pass input ***/
    OnPassChange = (event) =>{
        this.setState({pass:event.target.value})
    }

    /********Validation fun ***** */

    InputsValidation = ()=>{

        const { email , pass} = this.state;

        let errors = {};
        let isValid = true ;

        // email validation 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            errors.email = 'Email is not valid';
            isValid = false;
          
        }
           // Password validation (at least 6 characters)
           if (pass.length < 6) {
            errors.pass = "Password must be at least 6 characters";
            isValid = false;
        }
        this.setState({ errors });

     return isValid;
    }

     /******* submit function ***/

     onSubmit = () =>{
        if(this.InputsValidation()){

            fetch('https://facedetectapi-0667bec6ffc0.herokuapp.com/signin',{
                method : 'post',
                headers:{'Content-Type' :'application/json'},
                body:JSON.stringify({
                    email : this.state.email,
                    pass:this.state.pass
                })
            })
            .then(Response => Response.json())
            .then(user =>{
                if(user.id){
                    // we have to send user info to app.js to store it to an object user that we have  declar in the state
                 this.props.LoadUser(user);
                 this.props.onRouteChange ('home');
               
                }else{

                }
            })
            .catch(err => console.log('CANT FETCH',err))
        }
      

     }
    
    render(){
        const {onRouteChange} = this.props;
        const { errors} = this.state;
        return(
            <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                   {/**** Email input ****/}
                    <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.OnEmailChange}
                    />
                </div>
                {errors.email && <p className="error">{errors.email}</p>}
                
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    {/**** Password input ****/}
                    <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.OnPassChange}
                    />
                </div>
                {errors.pass && <p className="error">{errors.pass}</p>}
                </fieldset>
                <div className="">
                    {/****** Submit ****/}
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                    onClick={this.onSubmit}
                />
                </div>

                 {/**** Register direction ****/}
                <div className="lh-copy mt3">
                    <p 
                    onClick = {() => onRouteChange('register')}
                    className="f6 link dim db pointer">Register
                    </p>
                </div>
            </div>
            </main>
      </article>
            </div>
        );
    }
}
export default Signin;