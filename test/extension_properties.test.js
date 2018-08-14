var test = require('tape')
	, convert = require('../');

test('deletes swagger extension properties', function(assert) {
	var schema
		, result
		, expected;

	assert.plan(1);

	schema = {
		type: 'object',
		properties: {
			boolProperty: {
				type: 'boolean',
				'x-extension-property': true
			},
			'x-extension-property': true
		},
		'x-extension-property': true
	};

	result = convert(schema, {deleteExtensionProperties: true});

	expected = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			boolProperty: {
				type: 'boolean'
			}
		}
	};

	assert.deepEqual(result, expected, 'converted');
});

test('doesnt delete if not present', function(assert) {
	var schema
		, result
		, expected;

	assert.plan(1);

	schema = {
		type: 'object',
		properties: {
			boolProperty: {
				type: 'boolean',
				'x-extension-property': true
			},
			'x-extension-property': true
		},
		'x-extension-property': true
	};

	result = convert(schema);

	expected = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			boolProperty: {
				type: 'boolean',
				'x-extension-property': true
			},
			'x-extension-property': true
		},
		'x-extension-property': true
	};

	assert.deepEqual(result, expected, 'converted');
});
