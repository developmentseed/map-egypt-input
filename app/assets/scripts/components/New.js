/* Add a new Dataset */
import React from 'react';
import Form from 'react-jsonschema-form';

import 'date-input-polyfill';

const schema = {
  title: "Add Project",
  type: "object",
  properties: {
    name: {type: "string", title: "Project Name", default: "A new project"},
    status: {type: "string", title: "Project Status", enum: ['Ongoing', 'Closed']},
    planned_start_date: {type: "string", title: "Planned Start Date", format: "date"},
    actual_start_date: {type: "string", title: "Actual Start Date", format: "date"},
    planned_end_date: {type: "string", title: "Planned End Date", format: "date"},
    actual_end_date: {type: "string", title: "Actual End Date", format: "date"},
    funds: {
      title: "Funds",
      type: "array",
      items: {
        type: "object",
        properties: {
          budget: {
            type: "number",
            title: "Budget"
          },
          donor_name: {
            type: "string",
            title: "Donor Name"
          }
        }
      } 
    },
    kmi: {
      title: "Key Monitoring Indicators",
      type: "array",
      items: {
        type: "object",
        properties: {
          activity: {
            type: "string",
            title: "Activity"
          },
          status: {
            type: "string",
            title: "Status",
            enum: ["Partially Implemented", "Implemented", "Not Implemented"]
          },
          description: {
            type: "string",
            title: "Implementation Description",
          },
          kpi: {
            type: "string",
            title: "KPIs (selected)"
          }
        }
      }
    }
  }
};

class New extends React.Component {
  render () {
    return <Form schema={schema}/>
  }
}

export default New;
