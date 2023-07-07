import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Table } from 'flowbite-react';

function DataTableBase(props) {
	const { columns, rows } = props;

	return (
		<Table hoverable>
			<Table.Head>
				{columns.map((columnItem, i) => (
					<Table.HeadCell key={i}>{columnItem}</Table.HeadCell>
				))}
			</Table.Head>
			<Table.Body>
				{rows.map((rowItem, i) => (
					<Table.Row key={i}>
						{Object.keys(rowItem).map((key) => (
							<Table.Cell key={key}>{rowItem[key]}</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

DataTableBase.propTypes = {
	columns: PropTypes.array,
	rows: PropTypes.array,
};

export default DataTableBase;
