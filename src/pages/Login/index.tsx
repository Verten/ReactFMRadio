import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../redux/modules/login'

interface ILoginProps {
  actions: any
}

export class LoginPage extends React.Component<ILoginProps, {}> {
  constructor(props: ILoginProps) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  public render() {
    return (
      <div>
        Login Page
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }

  protected handleLogin(): void {
    this.props.actions.login('abc', 'abc')
  }

}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        login,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
