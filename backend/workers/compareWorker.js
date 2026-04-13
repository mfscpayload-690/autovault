const { workerData, parentPort } = require('worker_threads');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const { ids, dbConfig } = workerData;
    const conn = await mysql.createConnection(dbConfig);

    const [rows] = await conn.execute('CALL compare_cars(?, ?, ?)', ids);

    // Stored procedure returns results in rows[0]
    parentPort.postMessage(rows[0]);

    await conn.end();
  } catch (err) {
    parentPort.postMessage({ __error: true, message: err.message });
  }
})();
