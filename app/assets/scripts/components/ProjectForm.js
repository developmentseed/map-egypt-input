import React from 'react';
import Form from 'react-jsonschema-form';
import 'date-input-polyfill';

const schema = {
  title: 'Project Form',
  type: 'object',
  properties: {
    name: {type: 'string', title: 'Project Name'},
    description: {
      title: 'Description',
      type: 'string'
    },
    status: {type: 'string', title: 'Project Status', enum: ['Ongoing', 'Closed']},
    planned_start_date: {type: 'string', title: 'Planned Start Date', format: 'date'},
    actual_start_date: {type: 'string', title: 'Actual Start Date', format: 'date'},
    planned_end_date: {type: 'string', title: 'Planned End Date', format: 'date'},
    actual_end_date: {type: 'string', title: 'Actual End Date', format: 'date'},
    number_served: {type: 'number', title: 'Number Served'},
    number_served_unit: {type: 'string', title: 'Number Served Unit'},
    responsible_party: {type: 'string', title: 'Responsible Party'},
    responsible_ministry: {type: 'string', title: 'Responsible Ministry'},
    project_link: {type: 'string', format: 'uri'},
    sds_indicator: {
      title: 'SDS Indicators',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'SDS Indicator 1',
          'SDS Indicator 2',
          'SDS Indicator 3'
        ]
      }
    },
    sdg_indicator: {
      title: 'SDG Indicators',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'SDG Indicator 1',
          'SDG Indicator 2',
          'SDG Indicator 3'
        ]
      }
    },
    category: {
      type: 'array',
      title: 'Category',
      items: {
        type: 'string'
      }
    },
    location: {
      title: 'Location',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          governorate: {
            title: 'Governorate',
            type: 'string',
            enum: [
              'governorate 1',
              'governorate 2',
              'governorate 3'
            ]
          },
          district: {
            title: 'District',
            type: 'string',
            enum: [
              'district 1',
              'district 2',
              'district 3'
            ]
          }
        }
      }

    },
    funds: {
      title: 'Funds',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          budget: {
            type: 'number',
            title: 'Budget'
          },
          donor_name: {
            type: 'string',
            title: 'Donor Name'
          },
          type: {
            type: 'string',
            title: 'Type of Fund',
            enum: ['Loan', 'Grant']
          }
        }
      }
    },
    kmi: {
      title: 'Key Monitoring Indicators',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          activity: {
            type: 'string',
            title: 'Activity'
          },
          status: {
            type: 'string',
            title: 'Status',
            enum: ['Partially Implemented', 'Implemented', 'Not Implemented']
          },
          description: {
            type: 'string',
            title: 'Implementation Description'
          },
          kpi: {
            type: 'string',
            title: 'KPIs (selected)'
          },
          date: {
            type: 'string',
            title: 'Monitoring Date',
            format: 'date'
          }
        }
      }
    }
  }
};

const uiSchema = {
  name: {
    'ui:placeholder': 'Unique name'
  },
  description: {
    'ui:widget': 'textarea'
  },
  number_served: {
    'ui:placeholder': 20000
  },
  number_served_unit: {
    'ui:placeholder': 'Households'
  },
  planned_start_date: {
    'ui:widget': 'alt-date',
    'classNames': 'alt-date'
  },
  actual_start_date: {
    'ui:widget': 'alt-date',
    'classNames': 'alt-date'
  },

  planned_end_date: {
    'ui:widget': 'alt-date',
    'classNames': 'alt-date'
  },

  actual_end_date: {
    'ui:widget': 'alt-date',
    'classNames': 'alt-date'
  },
  project_link: {
    'ui:placeholder': 'http://'
  },
  kmi: {
    items: {
      date: {
        'ui:widget': 'alt-date',
        'classNames': 'alt-date'
      },
      description: {
        'ui:widget': 'textarea'
      }
    }
  }
};

class ProjectForm extends React.Component {
  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      formData={this.props.formData}
      uiSchema = {uiSchema}
    />;
  }

}

export default ProjectForm;
