import path from 'path'
import fs from 'fs';

/**
 * @param { Request } req
 * @param { Response } res
*/
const staticServe = (req, res) => {
  const file = path.join(__dirname, '../../static', req.url);
  const stream = fs.createReadStream(file);

  stream.on('error', error => {
      res.status(404).text('Not Found');
  });
  stream.pipe(res);
}

export default staticServe;
