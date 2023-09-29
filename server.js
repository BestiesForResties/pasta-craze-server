const app = require('./app');

const PORT = process.env.PORT || 8080

const init = async () =>{
  try {
    app.get('/', (req, res)=> {
      res.send("Root Path Get Endpoint successfully running");
    });

    app.listen(PORT, ()=> {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Error starting server:', error)
  }
};

init();