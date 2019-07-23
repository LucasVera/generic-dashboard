import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestAuth } from '../../modules/login'
import { bindActionCreators } from 'redux'

export class Login extends Component {
  static propTypes = {
    requestAuth: PropTypes.func,
    isFetching: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object,
    error: PropTypes.string
  }
  state = {
    email: '',
    password: ''
  }

  async handleLogin(e) {
    const { email, password } = this.state
    const { requestAuth } = this.props
    await requestAuth(email, password)
  }

  render() {
    return (
      <div className="d-flex bg-light full-height align-items-center justify-content-center">
        <div
          className="
            d-flex
            shadow
            p-3
            mb-5
            bg-white
            rounded rounded-lg
            "
          style={{
            minWidth: '35vw',
            minHeight: '60vh'
          }}
        >
          <div className="form-group w-100">
            <h3 className="pb-3 text-center">Welcome to Dashboard</h3>
            <p className="mb-3 text-center">You need to authenticate in our system to continue</p>
            {
              this.props.error && <p className="text-danger">{this.props.error}</p>
            }
            {
              this.props.user && this.props.user.name && <p className="text-success">Welcome, {this.props.user.name}</p>
            }
            <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
            <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={e => this.handleLogin(e)}>Login</button>
            <button type="button" className="btn btn-secondary btn-lg btn-block mb-4">Register</button>
            <hr />
            <button type="button" className="btn btn-danger btn-lg btn-block"><i className="fab fa-google mr-3"></i>Login with Google</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  isFetching: login.isFetching,
  token: login.token,
  user: login.user,
  error: login.error
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestAuth
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
