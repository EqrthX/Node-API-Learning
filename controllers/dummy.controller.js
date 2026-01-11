const axios = require("axios");

exports.hello = (req, res) => {
  
  const user = req;

  console.log(user);
  
  return res.json({
    message: "Hello World",
    time: new Date().toISOString()
  });
};

exports.getTodos = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json("Error fetch data dummy");
  }
};
