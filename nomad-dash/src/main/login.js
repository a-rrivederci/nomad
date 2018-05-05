import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OverButton from '../components/over-button'
import {Header, Footer} from '../components/bar'
import FullPage from '../components/full-page'
import Brand from '../components/brand'
import LoginImg from '../assets/attackle_gradbg.png'

// Form to receive user authentication
const LoginForm = () => (
  <form>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input 
        type="email" 
        className="form-control" 
        id="username" 
        aria-describedby="emailHelp" 
        placeholder="Enter email"
      />
    </div>
    <div className="form-group">
      <label htmlFor="userkey">Key</label>
      <input 
        type="password" 
        className="form-control"
        id="userkey"
        placeholder="Password"
      />
    </div>
    <Link to="/dashboard">
      <OverButton id="login-button">
        Login
      </OverButton>
    </Link>
  </form>
)

// Window housing image and login form
const LoginWindow = (props) => (
  <div id="login-window" className="d-flex mx-auto my-auto container">
  <div className="row">
      <div className="col d-flex justify-content-center">
        <img id="profile-img" src={LoginImg} alt="Login Profile"/>
      </div>
      <div className="col d-flex justify-content-center">
        <LoginForm />
      </div>
    </div>
  </div>
)


// Main login component
class Login extends Component {
  componentDidMount() {
    document.title = "Login | NOMAD"
  }

  render() {
    return (
      <FullPage id="login">
        <Header id="login-header"></Header>
        <LoginWindow />
        <Footer id="login-footer">
          <Brand /> | <span className="mx-3">Attackle &copy; 2018</span>
        </Footer>
      </FullPage>
    )
  }
}

export default Login
