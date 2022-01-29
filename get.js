const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  console.log(event);

  
  // const params = {
  //   TableName: "DemoTable", 
  //   Key: {
  //     id: event.pathParameters.id
  //   }
  // };

  // const result = await dynamoDb.get(params).promise();
  // if (result.Item) {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(result.Item)
  //   };
  // } else {
  //   return {
  //     statusCode: 404,
  //     body: JSON.stringify({ message: "Couldn't find the todo item." })
  //   };
  // }
};


const getUsers = async (data) => {
  const result = await getItem(data);
  return result;
}

const getItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "DemoTable", 
      Key: {
        id: data.pathParameters.id
      }
    };
  
     dynamoDb.get(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(params.Key)
      }
    })
  })
}
