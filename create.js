const uuid = require("uuid/v4");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async function (event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "users",
    Item: {
      id: uuid(),
      text: data.text,
      checked: false
    }
  };

  await client.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };
};
