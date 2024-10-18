import React from "react";

class Register extends React.Component{
    
   constructor (props){
    super(props);
    this.state = {
        name:'',
        email : '',
        pass :'',
        errors: {} // Object to store validation errors
    }
   }

    OnNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    OnEmailChange =(event) =>{
        this.setState ({email : event.target.value});
    }
    OnPassChange = (event) =>{
        this.setState ({pass : event.target.value});
    }

    InputsValidation = ()=>{

        const { name , email , pass} = this.state;
        
        let errors = {};
        let isValid = true ;

        // Name validation
        if(!name.trim()){
            errors.name = 'Name is required';
            isValid = false ;
        }
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

    outputValidation =(info)=>{
        let errors = {};
        errors.output = info;
        this.setState({errors})
    }

    OnSubmit = () =>{
        

        if(this.InputsValidation()){
          
          fetch('https://facedetectapi-0667bec6ffc0.herokuapp.com/register',{
                method : 'post',
                headers : {'Content-Type':'application/json'},
                body:JSON.stringify({
                    email : this.state.email,
                    name : this.state.name,
                    pass : this.state.pass
                })
                })
                .then(response => response.json())
                .then(user =>{
                    if(user.id){
                            this.props.LoadUser(user);
                            this.props.onRouteChange('home');
                    }else if(user.detail){
                       this.outputValidation(user.detail);
                    }
                    else{
                        console.log('cant register')
                    }
                })
                .catch(err => console.log('im here',err));
        }
    
    }


    render(){
        const { errors } = this.state;
        return(
            <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>

                            {/**** Name input ****/}
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="text"
                            name="name"
                            id="signup-name"
                            onChange={this.OnNameChange}

                            />
                        </div>
                        {errors.name && <p className="error">{errors.name}</p>}
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            {/**** Email input ****/}
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="signup-email-address"
                            onChange={this.OnEmailChange}
                            
                            />
                        </div>
                        {errors.email && <p className="error">{errors.email}</p>}
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            {/**** password input ****/}
                            <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="signup-password"
                            onChange={this.OnPassChange}
                        
                            />
                        </div>
                        {errors.pass && <p className="error">{errors.pass}</p>}
                        </fieldset>
                        <div className="">
                            {/**** Submit input ****/}
                        <input
                        
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"
                            onClick={this.OnSubmit}
                        />
                        </div>

                        {errors.output && <p className="error">{errors.output}</p>}
                    </div>
                    </main>
                </article>
            </div>
        );
    }
}
export default Register;