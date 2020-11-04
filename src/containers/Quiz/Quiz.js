import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'
import axios from '../../axios-quiz/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends React.Component {
   state = {
      results: {},
      isFinished: false,
      numberQuestion: 0,
      answerState: null,
      quiz: [],
      loading: true
   }

   

   onAnswerClickHandler = answerId => {
      if (this.state.answerState) {
        const key = Object.keys(this.state.answerState)[0]
        if (this.state.answerState[key] === 'success') {
          return
        }
      }
  
      const question = this.state.quiz[this.state.numberQuestion]
      const results = this.state.results
  
      if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
          results[question.id] = 'success'
        }
        
        this.setState({
          answerState: {[answerId]: 'success'},
          results
        })
  
        const timeout = window.setTimeout(() => {
          if (this.isQuizFinished()) {
            this.setState({
              isFinished: true
            })
          } else {
            this.setState({
               numberQuestion: this.state.numberQuestion + 1,
              answerState: null
            })
          }
          window.clearTimeout(timeout)
        }, 1000)
      } else {
        results[question.id] = 'error'
        this.setState({
          answerState: {[answerId]: 'error'},
          results
        })
      }
      console.log(answerId)
    }

   

   async componentDidMount() {
      try{
         const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
         const quiz = response.data

         this.setState({
            quiz,
            loading: false
         })

      } catch (e) {
         console.log(e)
      }
      
   }

   retryHandler = () => {
      this.setState ({
         numberQuestion: 0,
         answerState: null,
         isFinished: false,
         results: {},
      })
   }

   isQuizFinished() {
      return this.state.numberQuestion+1 === this.state.quiz.length
   }

   render() {
      return (
         <div className={classes.Quiz} >
            <div className={classes.QuizWrapper}>
               <h1>Answer for all questions</h1>

               { this.state.loading ? <Loader/> : this.state.isFinished 
                  ? 
                  <FinishedQuiz
                     results={this.state.results}
                     quiz = {this.state.quiz}
                     clickRetry = {this.retryHandler}
                  /> : 
                  <ActiveQuiz
                     question={this.state.quiz[this.state.numberQuestion].question}
                     answers={this.state.quiz[this.state.numberQuestion].answers}
                     onAnswerClick={this.onAnswerClickHandler}
                     quizLength={this.state.quiz.length}
                     numberQuestion={this.state.numberQuestion+1}
                     state={this.state.answerState}
                  />}
            </div>
         </div>
      )
   }
}

export default Quiz