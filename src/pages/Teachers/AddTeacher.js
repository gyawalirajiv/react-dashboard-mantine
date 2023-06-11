import { Table } from '@mantine/core';
const AddTeacher = (props) => {
    const elements = [
        {name: 'Rajiv Gyawali', position: "SE", symbol: "Add", mass: 60}
    ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
            <tr>
                <th>Element position</th>
                <th>Element name</th>
                <th>Symbol</th>
                <th>Atomic mass</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
export default AddTeacher;