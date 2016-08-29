import React, { Component } from 'react'

import GeoStore from '../modules/GeoStore'

class AbstractMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provinceMapData: null,
      geoStore: null
    }
    this.loadMap = this.loadMap.bind(this)
  }
  componentWillMount() {
    this.loadMap()
  }
  loadMap() {
    require.ensure([], (require) => {
      const provinceMapData = require('../modules/cn-china-by-peng8.json')
      const geoStore = new GeoStore(require('../modules/cn-cities-lon-lat.json'))
      this.setState({
        provinceMapData,
        geoStore
      })
    }, 'mapData')
  }
  render() {
    return (
      <div className="text-center" style={{ background: 'pink' }}> Please use a concrete Map Class </div>
    )
  }
}

export default AbstractMap
