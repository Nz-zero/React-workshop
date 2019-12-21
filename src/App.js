import React from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment'
import Input from './input.js'
import axios from 'axios'

const targetDate = moment("12/21/2019 17:00:00")
const subjects = ["-- Please select --", "Angular", "React", "Golang"]

function App() {
  const [name, setName] = React.useState("") //return initial value and set method
  const [email, setEmail] = React.useState("")
  const [subject_selected, setSubject] = React.useState("None")
  const [agree, setAgree] = React.useState(false)
  const [timer, setTimer] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  function calc(a, b) {

  }

  const handleSubmit = () => {
    setIsLoading(true)
    axios.get("http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR2l-JbsdO9SNlr36ir3sXuEULnLY8JC8nKSR_YwEcCVXMhiPVMUe2vu6WQ")
      .then(response => {
        const { data } = response
        // console.log(response)
        // console.log(data)
        setMessage(data.response)
        setIsLoading(false)
      }); /*.then() is called promise ==> wait for server response 
  const { data } = response --> object destructuring from response object
  inside data contain response so we use data.response*/
  }

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours")
    const diffMinutes = targetDate.diff(moment(), "Minutes") % 60
    const diffSeconds = targetDate.diff(moment(), "Seconds") % 60

    setTimer(`${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`)
    // console.log(diffHours)
    // console.log(diffMinutes)
    // console.log(diffSeconds)
    // console.log(moment())
  }
  React.useEffect(() => {
    axios.get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b")
      .then(response => {
        console.log(response)
        setSubject(response.data.subject)
      });
    const interval = setInterval(updateTimer, 1000) //set interval update, in this case 1000 ms = 1 s so update every second
    return () => clearInterval(interval) //it use ram so clear it after use it
  }, []) //work when finished render then react will use effect, blank array means work only one time (render only)


  // console.log("State:",{name: name, email: email, subject_selected: subject_selected, agree: agree})
  console.log("State:", { name, email, "Selected Subject": subject_selected, agree }) //if key and value is same
  return (
    <div className="App">
      <div className="title">Season change registration form</div>
      <p>Form ends in</p>
      <p>{timer}</p>

      {/*Custom component use capital letter*/}
      <Input label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)} /> {/*it directly get value from component
        instead of event that we have to point to value (event.target.value)*/}
      <Input label="Email"
        value={email}
        onChangeFromComponent={value => setEmail(value)} />
      {/* <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" value={name} onChange={event => setName(event.target.value)} />
        </div>
      </div> */}

      {/* <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input is-danger" type="email" placeholder="Email input" value={email} onChange={event =>
            setEmail(event.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div> */}

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select value={subject_selected} onChange={event => setSubject(event.target.value)}>
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
              {/* {subjects.map(subject => (
                console.log(i);
                console.log(subject);
              ))} */}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox" 
          value={agree} onChange={event => setAgree(event.target.checked)}> {/*check box is different from others, it use checked*/}
            <input type="checkbox" />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-link ${isLoading && "is-loading"}`} 
          onClick={handleSubmit} >Submit</button> {/*use string template otherwise it will get value of button is-loading is style*/}
          {/*()=>handleSubmit() full syntax 
          means build empty function to recieve function ({handleSubmit} for short)*/}
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
