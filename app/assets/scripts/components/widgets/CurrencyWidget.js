import React from 'react';

export default class CurrencyField extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    for (let key in props.formData) {
      this.state[key] = props.formData[key];
    }
  }

  onChange (name) {
    const component = this;
    return (event) => {
      let scratch = Object.assign({}, this.state);
      scratch[name] = parseFloat(event.target.value);
      scratch['amount'] = scratch['rate'] * scratch['original'];
      component.setState(scratch, () => component.props.onChange(component.state));
    };
  }

  render () {
    const {currency, original, rate, amount} = this.state;
    return <div>
      <legend>{this.props.schema.title}</legend>
      <div className="row">
        <div className="col-sm-4">
          <label>Currency</label>
          <input className="form-control" type="text">{currency}</input>
        </div>
        <div className="col-sm-4">
          <label>Original Amount</label>
          <input className="form-control" type="number" value={original} step="1"
            onChange={this.onChange('original')} />
        </div>
        <div className="col-sm-4">
          <label>Exchange Rate</label>
          <input className="form-control" type="number" value={rate} step="0.01"
            onChange={this.onChange('rate')} />
        </div>
      </div>
      <div className="row" >
        <div className="col-sm-4">
          <label>Amount</label>
          <input className="form-control" type="number" value={amount} disabled/>
        </div>
      </div>
    </div>;
  }
}
