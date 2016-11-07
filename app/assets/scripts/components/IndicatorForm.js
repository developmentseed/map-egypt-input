import React from 'react';
import Form from 'react-jsonschema-form';

export const schema = {
  title: 'Indicator Form',
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Indicator Name'},
    description: {
      title: 'Description',
      type: 'string'
    },
  //   project_delays: {
  //     title: 'Project Delays',
  //     type: 'string'
  //   },
  //   status: {type: 'string', title: 'Project Status', enum: ['Ongoing', 'Closed']},
  //   planned_start_date: {type: 'string', title: 'Planned Start Date', format: 'date'},
  //   actual_start_date: {type: 'string', title: 'Actual Start Date', format: 'date'},
  //   planned_end_date: {type: 'string', title: 'Planned End Date', format: 'date'},
  //   actual_end_date: {type: 'string', title: 'Actual End Date', format: 'date'},
  //   responsible_party: {type: 'string', title: 'Responsible Party'},
  //   responsible_ministry: {type: 'string', title: 'Responsible Ministry'},
  //   project_link: {title: 'Project Link', type: 'string', format: 'uri'},
  //   percent_complete: {title: 'Percent Complete', type: 'integer', minimum: 0, multipleOf: 5, maximum: 100, default: 0},
  //   number_served: {
  //     type: 'object',
  //     title: 'Number Served',
  //     properties: {
  //       number_served: {type: 'number', title: 'Amount'},
  //       number_served_unit: {type: 'string', title: 'Unit'}
  //     }
  //   },
  //   sds_indicator: {
  //     title: 'SDS Indicators',
  //     type: 'array',
  //     items: {
  //       type: 'string',
  //       enum: [
  //         'SDS Indicator 1',
  //         'SDS Indicator 2',
  //         'SDS Indicator 3'
  //       ]
  //     }
  //   },
  //   sdg_indicator: {
  //     title: 'SDG Indicators',
  //     type: 'array',
  //     items: {
  //       type: 'string',
  //       enum: [
  //         'SDG Indicator 1',
  //         'SDG Indicator 2',
  //         'SDG Indicator 3'
  //       ]
  //     }
  //   },
  //   category: {
  //     type: 'array',
  //     title: 'Category',
  //     items: {
  //       type: 'string',
  //       enum: [
  //         'Agriculture Extension & Research',
  //         'Agro-industry, Marketing & Trade',
  //         'Crops',
  //         'Fishing, Aquaculture & Trade',
  //         'Livestock',
  //         'Rural Infrastructure & Irrigation'
  //       ]
  //     }
  //   },
  //   location: {
  //     title: 'Location',
  //     type: 'array',
  //     items: {
  //       type: 'object',
  //       required: ['governorate', 'district'],
  //       properties: {
  //         governorate: {
  //           title: 'Governorate',
  //           type: 'string',
  //           enum: [
  //             'governorate 1',
  //             'governorate 2',
  //             'governorate 3'
  //           ]
  //         },
  //         district: {
  //           title: 'District',
  //           type: 'string',
  //           enum: [
  //             'district 1',
  //             'district 2',
  //             'district 3'
  //           ]
  //         }
  //       }
  //     }
  //
  //   },
  //   funds: {
  //     title: 'Funds',
  //     type: 'array',
  //     items: {
  //       type: 'object',
  //       required: ['amount', 'donor_name', 'type', 'date'],
  //       properties: {
  //         amount: {
  //           type: 'number',
  //           title: 'Amount'
  //         },
  //         donor_name: {
  //           type: 'string',
  //           title: 'Donor Name'
  //         },
  //         type: {
  //           type: 'string',
  //           title: 'Type of Fund',
  //           enum: ['Loan', 'Grant']
  //         },
  //         date: {
  //           type: 'string',
  //           title: 'Disbursement Date',
  //           format: 'date'
  //         }
  //
  //       }
  //     }
  //   },
  //   kmi: {
  //     title: 'Key Monitoring Indicators',
  //     type: 'array',
  //     items: {
  //       type: 'object',
  //       required: ['status', 'activity', 'description', 'target', 'kpi', 'date'],
  //       properties: {
  //         activity: {
  //           type: 'string',
  //           title: 'Activity'
  //         },
  //         status: {
  //           type: 'string',
  //           title: 'Status',
  //           enum: ['Partially Implemented', 'Implemented', 'Not Implemented']
  //         },
  //         description: {
  //           type: 'string',
  //           title: 'Implementation Description'
  //         },
  //         target: {
  //           type: 'string',
  //           title: 'Target'
  //         },
  //         kpi: {
  //           type: 'string',
  //           title: 'KPIs (selected)'
  //         },
  //         date: {
  //           type: 'string',
  //           title: 'Monitoring Date',
  //           format: 'date'
  //         }
  //       }
  //     }
  //   }
  }
};

const uiSchema = {
  name: {
    'ui:placeholder': 'Unique name'
  },
  description: {
    'ui:widget': 'textarea'
  },
  // project_delays: {
  //   'ui:widget': 'textarea'
  // },
  // number_served: {
  //   number_served: {
  //     'ui:placeholder': '20000'
  //   },
  //   number_served_unit: {
  //     'ui:placeholder': 'Households'
  //   }
  // },
  // percent_complete: {
  //   'ui:widget': 'range'
  // },
  // planned_start_date: {
  //   'ui:widget': 'alt-date',
  //   'classNames': 'alt-date'
  // },
  // actual_start_date: {
  //   'ui:widget': 'alt-date',
  //   'classNames': 'alt-date'
  // },
  //
  // planned_end_date: {
  //   'ui:widget': 'alt-date',
  //   'classNames': 'alt-date'
  // },
  //
  // actual_end_date: {
  //   'ui:widget': 'alt-date',
  //   'classNames': 'alt-date'
  // },
  // project_link: {
  //   'ui:placeholder': 'http://'
  // },
  // funds: {
  //   items: {
  //     date: {
  //       'ui:widget': 'alt-date',
  //       'classNames': 'alt-date'
  //     }
  //   }
  // },
  // kmi: {
  //   items: {
  //     date: {
  //       'ui:widget': 'alt-date',
  //       'classNames': 'alt-date'
  //     },
  //     description: {
  //       'ui:widget': 'textarea'
  //     }
  //   }
  // }
};

class IndicatorForm extends React.Component {
  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      formData={this.props.formData}
      uiSchema = {uiSchema}
    />;
  }

}

export default IndicatorForm;
