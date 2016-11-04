import React from 'react';
import {range} from 'lodash';

  /**
   * Date widget with month & year dropdowns
   */
export default class DateField extends React.Component {
  constructor (props) {
    super(props);
    if (props.formData) {
      const [year, month] = props.formData.split('/');
      this.state = {month, year};
    } else {
      this.state = {month: -1, year: -1};
    }
  }

  readyForChange () {
    return this.state.month && this.state.year &&
      this.state.month !== -1 && this.state.year !== -1;
  }

  onChange (name) {
    return (event) => {
      this.setState({[name]: event.target.value}, () => {
        if (this.readyForChange()) {
          this.props.onChange(this.state.year + '/' + this.state.month);
        }
      });
    };
  }

  render () {
    const {month, year} = this.state;
    let months = range(1, 13).map((month) => {
      return <option key={month} value={month}>{month}</option>;
    });
    months.unshift(<option key={-1} value={-1}>Month</option>);

    const years = range(1900, 2100).map((year) => {
      return <option key={year} value={year}>{year}</option>;
    });

    years.unshift(<option key={-1} value={-1}>Year</option>);

    return <div>
      <legend>{this.props.schema.title}</legend>
      <div className="row">
        <div className="col-sm-6">
          <select className="form-control" value={Number(year)} onChange={this.onChange('year')}>
            {years}
          </select>
        </div>
        <div className="col-sm-6">
          <select className="form-control" value={Number(month)} onChange={this.onChange('month')}>
            {months}
          </select>
        </div>
      </div>
    </div>;
  }
}
