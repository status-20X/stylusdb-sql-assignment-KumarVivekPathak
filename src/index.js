const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    const { fields, table, whereClauses } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);
    
    // Filtering based on WHERE clause
    const filteredData = whereClauses.length > 0
        ? data.filter(row => whereClauses.every(clause =>{
            return row[clause.field] === clause.value;
        })
            // const [field, value] = whereClause.split('=').map(s => s.trim());
            // return row[field] === value;
        )
        : data;

    // Selecting the specified fields
    return filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
}

module.exports = executeSELECTQuery;