import React from 'react';
import Form from 'react-jsonschema-form';
import {cloneDeep} from 'lodash';
import DateFieldFactory from './widgets/DateWidget';
import LocationField from './widgets/LocationWidget';
import CurrencyField from './widgets/CurrencyWidget';

export const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Project Name', 'description': 'Please make sure this is a unique name'},
    description: {
      title: 'Objective',
      type: 'string'
    },
    components: {
      title: 'Components',
      type: 'array',
      items: {
        title: 'Component',
        type: 'string'
      }
    },
    amendments: {
      title: 'Project Amendments',
      type: 'string'
    },
    project_delays: {
      title: 'Project Delays',
      type: 'string'
    },
    status: {type: 'string', title: 'Project Status', enum: ['Planned', 'Ongoing', 'Closed']},
    planned_start_date: {type: 'string', title: 'Planned Start Date'},
    actual_start_date: {type: 'string', title: 'Actual Start Date'},
    planned_end_date: {type: 'string', title: 'Planned End Date'},
    actual_end_date: {type: 'string', title: 'Actual End Date'},
    local_manager: {type: 'string', title: 'Local Project Manager'},
    responsible_ministry: {type: 'string', title: 'Responsible Ministry', enum: ['Select a Ministry', 'Ministry 1', 'Ministry 2', 'Ministry 3']},
    project_link: {title: 'Project Link', type: 'string', format: 'uri'},
    number_served: {
      type: 'object',
      title: 'Number of Beneficiaries',
      properties: {
        number_served: {type: 'number', title: 'Amount', 'description': '2000'},
        number_served_unit: {type: 'string', title: 'Unit', 'description': 'e.g. Households Served'}
      }
    },
    sds_indicator: {
      title: 'SDS Goals',
      type: 'array',
      items: {
        title: 'SDS Goal',
        type: 'string',
        enum: [
          'Select an SDG goal',
          'SDS Goal 1',
          'SDS Goal 2',
          'SDS Goal 3'
        ]
      }
    },
    sdg_indicator: {
      title: 'SDG Goals',
      type: 'array',
      items: {
        title: 'SDG Goal',
        type: 'string',
        enum: [
          'Select an SDG goal',
          'SDG Goal 1',
          'SDG Goal 2',
          'SDG Goal 3'
        ]
      }
    },
    category: {
      type: 'array',
      title: 'Sub-sectors',
      items: {
        title: 'Sub-sector',
        type: 'string',
        enum: [
          'Select a sub-sector',
          'Agriculture Extension & Research',
          'Agro-industry, Marketing & Trade',
          'Crops',
          'Fishing, Aquaculture & Forestry',
          'Livestock',
          'Rural Infrastructure & Irrigation'
        ]
      }
    },
    location: {
      title: 'Location',
      type: 'array',
      items: {
        type: 'object',
        required: ['governorate'],
        properties: {
          governorate: {
            title: 'Governorate',
            type: 'string',
            enum: [
              'Select a Governorate',
              'governorate 1',
              'governorate 2',
              'governorate 3'
            ]
          },
          district: {
            title: 'District',
            type: 'string',
            enum: [
              'Select a District',
              'district 1',
              'district 2',
              'district 3'
            ]
          },
          marker: {
            title: 'Location Marker',
            type: 'object',
            properties: {
              lon: {type: 'number'},
              lat: {type: 'number'}
            }
          }
        }
      }

    },
    budget: {
      title: 'Budget',
      type: 'array',
      items: {
        type: 'object',
        required: ['fund', 'donor_name'],
        properties: {
          fund: {
            type: 'object',
            properties: {
              currency: {type: 'string'},
              rate: {type: 'number'},
              amount: {type: 'number'},
              original: {type: 'number'}
            }
          },
          donor_name: {
            type: 'string',
            title: 'Donor Name'
          }
        }
      }
    },
    disbursed: {
      title: 'Disbursed Funds',
      type: 'array',
      items: {
        type: 'object',
        required: ['fund', 'donor_name', 'type', 'date'],
        properties: {
          fund: {
            type: 'object',
            properties: {
              currenct: {type: 'string'},
              rate: {type: 'number'},
              amount: {type: 'number'},
              original: {type: 'number'}
            }
          },
          donor_name: {
            type: 'string',
            title: 'Donor Name'
          },
          type: {
            type: 'string',
            title: 'Type of Fund',
            enum: ['Loan', 'Grant']
          },
          date: {
            type: 'string'
          }
        }
      }
    },
    kmi: {
      title: 'Key Monitoring Indicators',
      type: 'array',
      items: {
        type: 'object',
        required: ['status', 'activity', 'description', 'target', 'kpi', 'date'],
        properties: {
          component: {
            type: 'string',
            title: 'Component',
            enum: []
          },
          status: {
            type: 'string',
            title: 'Status',
            enum: ['Select an status', 'Partially Implemented', 'Implemented', 'Not Implemented']
          },
          description: {
            type: 'string',
            title: 'Implementation Description'
          },
          baseline: {
            type: 'string',
            title: 'Baseline'
          },
          current: {
            type: 'string',
            title: 'Current'
          },
          target: {
            type: 'string',
            title: 'Target'
          },
          kpi: {
            type: 'string',
            title: 'KPI'
          },
          date: {
            type: 'string',
            title: 'Monitoring Date'
          },
          reportLink: {
            type: 'string',
            title: 'Report Link',
            format: 'uri'
          }
        }
      }
    }
  }
};

class ProjectForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.state.schema = schema;
    this.state.formData = this.props.formData;
    this.state.uiSchema = {
      components: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      category: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      description: {
        'ui:widget': 'textarea'
      },
      amendments: {
        'ui:widget': 'textarea'
      },
      project_delays: {
        'ui:widget': 'textarea'
      },
      number_served: {
        classNames: 'field-half'
      },
      percent_complete: {
        'ui:widget': 'range'
      },
      planned_start_date: {
        'ui:field': 'short-date'
      },
      actual_start_date: {
        'ui:field': 'short-date'
      },
      planned_end_date: {
        'ui:field': 'short-date'
      },
      actual_end_date: {
        'ui:field': 'short-date'
      },
      project_link: {
        'ui:placeholder': 'http://'
      },
      location: {
        classNames: 'form-block multiform-group',
        items: {
          marker: {'ui:field': 'marker'}
        }
      },
      sds_indicator: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      sdg_indicator: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      budget: {
        classNames: 'form-block columns-small multiform-group',
        items: {
          fund: {'ui:field': 'currency'}
        }
      },
      disbursed: {
        classNames: 'form-block columns-small multiform-group',
        items: {
          fund: {'ui:field': 'currency'},
          date: {'ui:field': 'fund-date'}
        }
      },
      kmi: {
        classNames: 'form-block multiform-group',
        items: {
          date: {
            'ui:field': 'monitoring-date'
          },
          description: {
            'ui:widget': 'textarea'
          },
          reportLink: {
            'ui:placeholder': 'http://'
          }
        }
      }
    };
  }

  onChange ({formData}) {
    if (formData.components) {
      const componentEnums = formData.components.filter((component) => {
        return component && component.length > 0;
      });
      if (componentEnums.length > 0) {
        let schema = cloneDeep(this.state.schema);
        schema.properties.kmi.items.properties.component.enum = componentEnums;
        this.setState({schema: schema, formData: formData});
      }
    }
  }

  render () {
    return <Form schema={this.state.schema}
      onSubmit={this.props.onSubmit}
      formData={this.state.formData}
      onChange = {this.onChange.bind(this)}
      fields={{
        'short-date': DateFieldFactory('Year', 'Month'),
        'fund-date': DateFieldFactory('Year Disbursed', 'Month Disbursed'),
        'monitoring-date': DateFieldFactory('Monitoring Date - Year', 'Monitoring Date - Month'),
        'marker': LocationField,
        'currency': CurrencyField
      }}
      uiSchema = {this.state.uiSchema}
    />;
  }
}

export default ProjectForm;
