import React from 'react';

  /**
   * Location field implementing latitude / longitude
   */
export default class LocationField extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    for (let key in props.formData) {
      this.state[key] = props.formData[key];
    }
  }

  onChange (name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

  render () {
    const {lat, lon} = this.state;
    return (
      <div className="row">
        <div className="col-sm-6">
          <label>Latitude</label>
          <input className="form-control" type="number" value={lat} step="0.00001"
            onChange={this.onChange('lat')} />
        </div>
        <div className="col-sm-6">
          <label>Longitude</label>
          <input className="form-control" type="number" value={lon} step="0.00001"
            onChange={this.onChange('lon')} />
        </div>
      </div>
    );
  }
}
