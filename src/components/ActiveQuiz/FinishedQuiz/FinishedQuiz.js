import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
   const successCount = Object.keys(props.results).reduce((total, key) => {
      if(props.results[key] === 'success'){
         total++
      }

      return total
   }, 0)


   return (
      <div className={classes.FinishedQuiz}>
         <ul>
            { props.quiz.map((quizItem, index) => {
               const cls = [
                  'fa',
                  props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                  classes[props.results[quizItem.id]]
               ]
               return (
                  <li 
                     key={index}
                  >
                     <strong>{index + 1}. </strong>
                     {quizItem.question}
                     <i className={cls.join(' ')} />
                  </li>
               )
            }) }
         </ul>
         <p> Your right answers {successCount} from {props.quiz.length}</p>
         <div>
            <Button onClick={props.clickRetry} type='primary'>Repeat again</Button>
            <Link to = '/'>
               <Button type='success'>back to the all tests</Button>
            </Link>
         </div>
      </div>
   )
}

export default FinishedQuiz