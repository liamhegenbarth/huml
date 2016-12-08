
const helpers = {

	index : (row, test) => {
		return row.indexOf(test) !== -1;
	},

	isList : (row) => {
		return row.charAt(row.length - 1) === ':';
	},

	isKey : (row) => {
		return row.charAt(0) === '-';
	},

	isKeyValue : (row) => {
		return row.charAt(0) === '-' && row.indexOf(':') !== -1;
	},

	toRow : (row) => {
		return row.replace(/\t/g, '').trim();
	},

	toType : (value) => {

		if ( value === 'true' )
		{
			return true;
		}
		else if ( value === 'false' )
		{
			return false;
		}
		else if ( value === 'null' )
		{
			return null;
		}
		else if ( value === 'undefined' )
		{
			return undefined;
		}
		else if ( typeof value === 'string' && value.match(/^[+-]?\d+(\.\d+)?$/) )
		{
			return parseFloat(value, 10);
		}
		else
		{
			return value;
		}

	}
}


module.exports = helpers;
