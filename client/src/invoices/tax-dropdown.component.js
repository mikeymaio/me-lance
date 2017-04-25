import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * With a `label` applied to each `MenuItem`, `SelectField` displays
 * a complementary description of the selected item.
 */
const taxByState = [
{name: "Alabama", abbrev: "AL", tax: 4},
{name: "Alaska", abbrev: "AK", tax: 0},
{name: "Arizona", abbrev: "AZ", tax: 5.6},
{name: "Arkansas", abbrev: "AR", tax: 6.5},
{name: "California", abbrev: "CA", tax: 7.5},
{name: "Colorado", abbrev: "CO", tax: 2.9},
{name: "Connecticut", abbrev: "CT", tax: 6.35},
{name: "Delaware", abbrev: "DE", tax: 0},
{name: "District of Columbia", abbrev: "DC", tax: 5.75},
{name: "Florida", abbrev: "FL", tax: 6},
{name: "Georgia", abbrev: "GA", tax: 4},
{name: "Hawaii", abbrev: "HI", tax: 4},
{name: "Idaho", abbrev: "ID", tax: 6},
{name: "Illinois", abbrev: "IL", tax: 6.25},
// Indiana: 7,
// Iowa: 6,
// Kansas: 6.5,
// Kentucky: 6,
// Louisiana: 4,
// Maine: 5.5,
// Maryland: 6,
// Massachusetts: 6.25,
// Michigan: 6,
// Minnesota: 6.88,
// Mississippi: 7,
// Missouri: 4.23,
// Montana: 0,
// Nebraska: 5.5,
// Nevada: 6.85,
// New Hampshire: 0,
// New Jersey: 7
// New Mexico: 5.13
// New York: 4,
// North Carolina: 4.75
// North Dakota: 5,
// Ohio: 5.75,
// Oklahoma: 4.5
// Oregon: 0,
// Pennsylvania: 6,
// Puerto Rico: 6,
// Rhode Island: 7,
// South Carolina: 6,
// South Dakota: 4,
// Tennessee: 7,
// Texas: 6.25
// Utah: 5.95
// Vermont: 6,
// Virginia: 5.3,
// Washington: 6.5,
// West Virginia: 6,
// Wisconsin: 5,
// Wyoming: 4
]
export default class TaxSelect extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <SelectField value={this.state.value} onChange={this.handleChange}>
          { taxByState.map( state => {
              return <MenuItem value={state.tax} label={state.tax} primaryText={state.abbrev} />
          })}
      </SelectField>
    );
  }
}