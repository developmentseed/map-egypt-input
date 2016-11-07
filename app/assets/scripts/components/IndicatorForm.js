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
    category: {
      type: 'array',
      title: 'Category',
      items: {
        type: 'string',
        enum: [
          'Agriculture Extension & Research',
          'Agro-industry, Marketing & Trade',
          'Crops',
          'Fishing, Aquaculture & Trade',
          'Livestock',
          'Rural Infrastructure & Irrigation'
        ]
      }
    },
    data: {
      type: 'string',
      title: 'Data'
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
  data: {
    'ui:widget': 'textarea',
    classNames: 'large'
  }
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
