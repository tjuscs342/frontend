class GeoStore {
  constructor(cityMap) {
    this.cityMap = new Map(cityMap)
  }
  _cityQuery(key) {
    // console.log("Query : "+key)
    return null
  }
  get(key) {
    if ( this.cityMap.has(key) ) {
      return Object.assign({},this.cityMap.get(key)) // Copy object
    } else {
      return this._cityQuery(key)
    }
  }
}

export default GeoStore
