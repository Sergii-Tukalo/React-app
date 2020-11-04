import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
   return(
      <div className={classes.ActiveQuiz} >
         <p className={classes.Question} >
            <span>
               <strong>{props.numberQuestion}. </strong>
               {props.question}
            </span>

            <small>{props.numberQuestion} / {props.quizLength}</small>
         </p>
         
         <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
         />
      </div>
   )
}

export default ActiveQuiz;