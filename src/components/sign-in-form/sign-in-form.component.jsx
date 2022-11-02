import {useState} from 'react';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {  signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
const defaultFormFields={
    email:'',
    password:''
}

const SignInForm=()=>{
    const[formFields,setFormFields]=useState(defaultFormFields);
    const{email,password}=formFields;

    


 const resetFormFields=()=>{
setFormFields(defaultFormFields)
 };

 const SignInWithGoogle=async()=>{
   await signInWithGooglePopup();
  
    
};

 const handleSubmit=async(event)=>{
event.preventDefault();

try{
const {user}=await signInAuthUserWithEmailAndPassword(email,password);

resetFormFields();
}

catch(error){
    switch(error.code){
        case 'auth/wrong-password':
        alert("Wrong Password");
        break
        case 'auth/user-not-found':
        alert("No user associated with this email")
        break;
        default: console.log(error)
    }
}
}
    
 
const handleChange=(event)=>{
  const { name, value}=event.target;
setFormFields({...formFields,[name]:value})
    }

    
    return(
        <div className='sign-up-container'>
            <h2>Already Have An Account?</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
               
               
                
                <FormInput
                 label="Email"
                  type="email"
                   required onChange={handleChange}
                    name="email"
                     value={email}/>
               
                <FormInput
                 label="Password"
                  type="Password"
                   required 
                   onChange={handleChange} 
                   name="password"
                    value={password}/>
                <div className='buttons-container'>
               
                <Button  type="submit">Sign In</Button>
                <Button  type='button' buttonType="google"onClick={SignInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;