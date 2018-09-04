import 'react-native-webcrypto'
import { tests } from './hooks'

import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

import { name as appName } from './app.json'

import './test/aes-gcm'
import './test/pbkdf2'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    for (const name of Object.keys(tests)) {
      this.setState({ [name]: 'running' })

      const start = Date.now()

      try {
        await tests[name]()
        this.setState({ [name]: `success (${Date.now() - start}ms)` })
      } catch (err) {
        this.setState({ [name]: `error (${Date.now() - start}ms)` })
        console.error(err)
      }
    }
  }

  render () {
    return React.createElement(View, {}, Object.keys(tests).map((name) => {
      const status = this.state[name] || 'waiting'

      return React.createElement(Text, { key: name }, `${status} - ${name}`)
    }))
  }
}

AppRegistry.registerComponent(appName, () => App)
