
const _ 			= require('./helpers'),
	  index 		= _.index,
	  isList 		= _.isList,
	  isKey 		= _.isKey,
	  isKeyValue 	= _.isKeyValue,
	  toRow			= _.toRow,
	  toType 		= _.toType;


class Huml
{

	constructor(file)
	{

		this.store = {};

		this.filterData(file);

		return;

	}


	filterData(file)
	{

		this.data = file.split(/\n/g)
					// remove empties
					.filter((e) => { return e; })
					// ignore comments
					.filter((e) => { return !index(e,'#!'); });

		this.recurseData();

		return;

	}

		
	recurseData( current, count )
	{

		current = current || {};
		count 	= count || 0;

		
		if ( count < this.data.length )
		{

			// replace tabs in data
			const currentRow 	= toRow(this.data[count]),
				  nextRow 		= ( count + 1 < this.data.length ) ? toRow(this.data[count + 1]) : false;

			// begin tests
			if ( isList(currentRow) )
			{

				if ( isKey(currentRow) )
				{
					let key = currentRow.split(/\-(.+)/)[1].split(/:/)[0].trim();

					if ( current instanceof Array )
					{
						current.push( { [key] : ( isKeyValue(nextRow) ) ? {} : [] } );

						this.recurseData( current[current.length-1][key], ++count );
					}
					else
					{
						current[key] = ( isKeyValue(nextRow) ) ? {} : [];

						this.recurseData( current[key], ++count );
					}
				}
				else
				{
					let key = currentRow.split(/:/)[0].trim();

					this.store[key] = ( isKeyValue(nextRow) ) ? {} : [];

					this.recurseData( this.store[key], ++count );
				}

			}
			else if ( isKeyValue(currentRow) )
			{

				let keyValue = currentRow.split(/\:/);

				let key = keyValue[0].split(/\-(.+)/)[1].trim();

				keyValue.shift();

				let value = toType(keyValue.join(' ').trim());

				current[key] = value;

				this.recurseData( current, ++count );

			}
			else if ( isKey(currentRow) )
			{

				let value = toType(currentRow.split(/\-(.+)/)[1].trim());

				current.push(value);

				this.recurseData( current, ++count );

			}
			else
			{

				let keyValue = currentRow.split(/\:/);

				let key = keyValue[0].trim();

				keyValue.shift();

				let value = toType(keyValue.join(' ').trim());

				this.store[key] = value;

				this.recurseData( current, ++count );

			}

		}
		else
		{
			return;
		}

	}


	get returnData()
	{
		return JSON.stringify(this.store);
	}

}


module.exports = (file) => {
	return new Huml(file).returnData;
};
