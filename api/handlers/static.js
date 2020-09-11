import path from 'path'

const serveStatic = (req, res) => {
  res.render(path.join(__dirname, req.url));
}

export default serveStatic;
