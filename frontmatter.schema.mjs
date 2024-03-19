/** @type { import('json-schema').JSONSchema7 } */
const schema = {
  title: 'Lab',
  description: 'Metadata surrounding lab content',
  type: 'object',
  properties: {
    title: {
      description: 'Title string displayed in left-hand navigation',
      type: 'string'
    },
    updated: {
      description: 'Represents last date content was updated',
      type: 'string',
      format: 'date'
    },
    timeToComplete: {
      description: 'Amount of time in minutes lab will take to complete',
      type: 'number',
      exclusiveMinimum: 0
    },
    toc: {
      description: 'Whether final lab page should render table of contents',
      type: 'boolean'
    },
    desc: {
      description: 'Short plaintext desciption of the content within',
      type: 'string'
    }
  }
};

export default schema;
