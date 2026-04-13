const { Worker } = require('worker_threads');
const path = require('path');

exports.compare = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: 'ids parameter is required (comma-separated, max 3)' });
    }

    const idArray = ids.split(',').map(Number).filter(n => !isNaN(n) && n > 0);

    if (idArray.length < 2 || idArray.length > 3) {
      return res.status(400).json({ error: 'Provide 2 or 3 valid car IDs' });
    }

    // Pad to 3 IDs (stored procedure expects 3)
    while (idArray.length < 3) {
      idArray.push(0);
    }

    const result = await new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, '../workers/compareWorker.js'), {
        workerData: {
          ids: idArray,
          dbConfig: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
        },
      });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });

    if (result && result.__error) {
      throw new Error(result.message || 'Worker comparison failed');
    }

    res.json(result);
  } catch (err) {
    console.error('Compare error:', err);
    res.status(500).json({ error: 'Comparison failed' });
  }
};
