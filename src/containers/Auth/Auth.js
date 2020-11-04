import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/Input'
import Axios from 'axios';

function validateEmail(email) {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

   state = {
      formControls: {
         email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'enter correct email',
            valid: false,
            touched: false,
            validation: {
               required: true,
               email: true
            }
         },
         password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'enter correct password',
            valid: false,
            touched: false,
            validation: {
               required: true,
               minLenght: 6
            }}
      }
   }

   loginHandler = async () => {
      const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value,
         returnSecureToken: true
      }
      try {
         const response = await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcwLQuMXgSRsEBNwkR_uC7nFTzxpJ8hrg', authData)

         console.log(response.data)
      } catch (e) {
         console.log(e)
      }
   }

   registerHandler = async () => {
      const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value,
         returnSecureToken: true
      }
      try {
         const response = await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcwLQuMXgSRsEBNwkR_uC7nFTzxpJ8hrg', authData)

         console.log(response.data)
      } catch (e) {
         console.log(e)
      }
   }

   submitHandler = event => {
      event.preventDefault()
   }

   validateControl(value, validation) {
      if (!validation) {
         return true
      }

      let isValid = true

      if(validation.required) {
         isValid = value.trim() !== '' && isValid
      }

      if(validation.email) {
         isValid = validateEmail(value) && isValid
      }

      if(validation.minLenght) {
         isValid = value.length >= validation.minLenght && isValid
      }

      return isValid
   }

   onChangeHandler = (event, controlName) => {
      const formControls = {...this.state.formControls}
      const control= { ...formControls[controlName] }

      control.value = event.target.value
      control.touched = true
      control.valid = this.validateControl(control.value, control.validation)

      formControls[controlName] = control

      let isFormValid = true

      Object.keys(formControls).forEach(name => {
         isFormValid = formControls[name].valid && isFormValid
      })

      this.setState({
         formControls, isFormValid
      })
   }

   renderInputs() {
      return Object.keys(this.state.formControls).map((controlName, index) =>{
         const control = this.state.formControls[controlName]
      return (
            <Input
               key={controlName + index}
               type={control.type}
               value={control.value}
               valid={control.valid}
               touched={control.touched}
               label={control.label}
               shouldValidate={!!control.validation}
               errorMessage={control.errorMessage}
               onChange={event => this.onChangeHandler(event, controlName)}
            />
         )
      })
   }

   render() {
      return(
         <div className={classes.Auth}>
            <div>
               <h1>authorization</h1>

               <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                  {this.renderInputs()}

                  <Button
                     type='success'
                     onClick={this.loginHandler}
                     disabled = {!this.state.isFormValid}
                  >
                     Log In
                  </Button>
                  <Button
                     type='primary'
                     onClick={this.registerHandler}
                     disabled = {!this.state.isFormValid}
                  >
                     Regestration
                  </Button>
               </form>
            </div>
         </div>
      )
   }
}
