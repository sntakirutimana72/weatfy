import app from './api/server';

const port = process.env.HOST_PORT || 3000 ;

app.listen(port, () =>
  console.log(`Englass server started at port - ${port}`)
);
