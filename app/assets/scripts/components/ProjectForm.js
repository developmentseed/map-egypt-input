import React from 'react';
import Form from 'react-jsonschema-form';
import 'date-input-polyfill';

const schema = {
  title: "Project Description",
  type: "object",
  properties: {
    name: {type: "string", title: "Project Name", default: "A new project"},
    status: {type: "string", title: "Project Status", enum: ['Ongoing', 'Closed']},
    planned_start_date: {type: "string", title: "Planned Start Date", format: "date"},
    actual_start_date: {type: "string", title: "Actual Start Date", format: "date"},
    planned_end_date: {type: "string", title: "Planned End Date", format: "date"},
    actual_end_date: {type: "string", title: "Actual End Date", format: "date"},
    category: {
      type: "array",
      title: "Category",
      items: {
        type: "string",
      }
    },
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
          },
          type: {
            type: "string",
            title: "Type of Fund",
            enum: ["Loan", "Grant"]
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

const uiSchema = {
  planned_start_date: {
    "ui:widget": "alt-date"
  },

  actual_start_date: {
    "ui:widget": "alt-date"
  },

  planned_end_date: {
    "ui:widget": "alt-date"
  },

  actual_end_date: {
    "ui:widget": "alt-date"
  },
}

class ProjectForm extends React.Component {
  render () {
    return <Form schema={schema} 
        onSubmit={this.props.onSubmit} 
        formData={this.props.formData}
        uiSchema = {uiSchema}
      />
  }

}

export default ProjectForm;
