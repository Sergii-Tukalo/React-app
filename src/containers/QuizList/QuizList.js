import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from '../../axios-quiz/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import classes from './QuizList.module.css'

export default class QuizList extends Component {
   
   state = {
      quizes: [],
      loading: true
   }

   renderQuizes() {
      return this.state.quizes.map(quiz => {
         return (
            <li key={quiz.id}>
               <NavLink to={'/quiz/' + quiz.id}>
                  {quiz.name}
               </NavLink>
            </li>
         )
      })
   }

   async componentDidMount() {
      try {
         const response = await axios.get('/quizes.json')
         
         const quizes = []

         Object.keys(response.data).forEach((key, index) => {
            quizes.push({
               id: key,
               name: `Test №${index+1}`
            })
         })

         this.setState({
            quizes: quizes,
            loading: false
         })
      } catch (e) {
         console.log(e)
      }
   }

   render() {
      return(
         <div className={classes.QuizList}>
            <h1>Tests list</h1>

            {this.state.loading ? <Loader/> : <ul>{ this.renderQuizes() }</ul>}
            
         </div>
      )
   }
}
