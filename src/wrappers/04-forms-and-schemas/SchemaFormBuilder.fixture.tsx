import { SchemaFormBuilder } from './SchemaFormBuilder';

export default {
  'Evaluation Rubric Form': (
    <SchemaFormBuilder
      onSubmit={(data) => {
        console.log('Form submitted:', data);
      }}
      fields={[
        { id: 'title', label: 'Project Title', type: 'text' },
        { id: 'category', label: 'Category', type: 'select', options: [{ label: 'Data', value: 'data' }, { label: 'UI/UX', value: 'ui-ux' }, { label: 'State Mgmt', value: 'state-mgmt' }] },
        { id: 'complexity', label: 'Complexity', type: 'number', defaultValue: 5 },
        { id: 'approved', label: 'Approved', type: 'checkbox' },
      ]}
    />
  ),
}