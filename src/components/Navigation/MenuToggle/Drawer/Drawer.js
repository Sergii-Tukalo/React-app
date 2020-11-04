import React from 'react'
import classes from './Drawer.module.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../../UI/Button/Backdrop/Backdrop'

const links = [
   {to: '/', label: 'Test', exact: true},
   {to: '/auth', label: 'Auth', exact: false},
   {to: '/quiz-creator', label: 'Quiz-Creator', exact: false}
]

class Drawer extends React.Component {

   renderLinks()  {
      return links.map((link, index) => {
         return (
            <li key = {index}>
               <NavLink
                  to={link.to}
                  label={link.label}
                  activeClassName={classes.active}
                  onClick={this.props.onClose}
               >
                   {link.label}
               </NavLink>
            </li>
         )
      })
   }

   

   render() {
      const cls = [classes.Drawer]
      if(!this.props.isOpen) {
         cls.push(classes.close)
      }
      return (
         <div>
            <nav className={cls.join(' ')}>
               <ul>
                  { this.renderLinks() }
               </ul>
            </nav>
            { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null } 
         </div>
      )
   }
} 

export default Drawer