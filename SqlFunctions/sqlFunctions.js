var connection = require('../dbConnection');
const sqlFunctions = require('./sqlFunctions')


exports.getDetails = (collegeName) => {
    let sql = `select distinct(Branch) from ${collegeName};`;
    let details = [];
    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, results) => {
            if (err) console.log(err);
            else if (results.length != 0) {
                let departmentDetails = [];
                for (let i = 0; i < results.length; i++){
                    departmentDetails.push(results[i].Branch);
                }
                details.push(departmentDetails)
                let fieldDetails = await sqlFunctions.getAllFields(collegeName);
                details.push(fieldDetails)
                resolve(details);
            } else resolve(false)
        });
    });
}


exports.getAllFields = (collegeName) => {
    let sql = `select COLUMN_NAME from information_schema.columns where table_name= '${collegeName}' and COLUMN_NAME in ("Branch","Gender","Admission_Type","Know_About_College","Nationality","Religion","Community","Boarding","Family_Income","Aspiration","District","State","10th_Board_Of_Study","10th_Institution","10th_District","10th_State","12th_Board_Of_Study","12th_Institution","12th_State","12th_District")`;
    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, result) => {
            if (err) console.log(err);
            else if (result.length != 0) {
                let fieldDetails = [];
                for (let i = 0; i < result.length; i++) {
                    fieldDetails.push(result[i].COLUMN_NAME);
                }
                resolve(fieldDetails)
            }
            else {
                resolve("ERROR OCCURED")
            }
        })
    })
}

exports.customSearch = (collegeName, selectedDepartment, selectedField) => {
    let sql = `select year,${selectedField}, count(${selectedField}) as count from ${collegeName} where Branch in ('${selectedDepartment}') group by year,${selectedField} order by year`;
    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, results) => {
            if (err) console.log(err);
            else if (results.length != 0) {
                resolve(results)
            }
            else {
                resolve("ERROR OCCURED")
            }
        })
    })
}

exports.overallSearch = (collegeName, selectedField) => {
    let sql = `select year,${selectedField}, count(${selectedField}) as count from ${collegeName} group by year,${selectedField} order by year`;
    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, results) => {
            if (err) console.log(err);
            else if (results.length != 0) {
                resolve(results)
            }
            else {
                resolve("ERROR OCCURED")
            }
        })
    })
}

exports.fieldSize = (collegeName, selectedField) => {
    if (selectedField === '10th_Institution' || selectedField === '12th_Institution') {
        let sql = `select distinct(${selectedField}) from ${collegeName} where ${selectedField} LIKE '%School%' or ${selectedField} LIKE '%junior%' or ${selectedField} LIKE '%SSS%' or ${selectedField} LIKE '%jr%' or ${selectedField} LIKE '%college%'`;
        return new Promise((resolve, reject) => {
            connection.query(sql, async (err, results) => {
                if (err) console.log(err);
                else if (results.length != 0) {
                    resolve(results)
                }
                else {
                    resolve("ERROR OCCURED")
                }
            })
        })
    }
    else {
        let sql = `select distinct(${selectedField}) from ${collegeName}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, async (err, results) => {
                if (err) console.log(err);
                else if (results.length != 0) {
                    resolve(results)
                }
                else {
                    resolve("ERROR OCCURED")
                }
            })
        })
    }
}

exports.customFieldSize = (collegeName, selectedDepartment, selectedField) => {
    if (selectedField === '10th_Institution' || selectedField === '12th_Institution') {
        let sql = `select distinct(${selectedField}) from ${collegeName} where Branch='${selectedDepartment}' and ${selectedField} LIKE '%School%' or ${selectedField} LIKE '%junior%' or ${selectedField} LIKE '%SSS%' or ${selectedField} LIKE '%jr%' or ${selectedField} LIKE '%college%'`;
        return new Promise((resolve, reject) => {
            connection.query(sql, async (err, results) => {
                if (err) console.log(err);
                else if (results.length != 0) {
                    resolve(results)
                }
                else {
                    resolve("ERROR OCCURED")
                }
            })
        })
    }
    else {
        let sql = `select distinct(${selectedField}) from ${collegeName} where Branch='${selectedDepartment}'`;
        return new Promise((resolve, reject) => {
            connection.query(sql, async (err, results) => {
                if (err) console.log(err);
                else if (results.length != 0) {
                    resolve(results)
                }
                else {
                    resolve("ERROR OCCURED")
                }
            })
        })
    }
}