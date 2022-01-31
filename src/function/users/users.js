const uuid = require("uuid/v4");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async function (event) {
  console.log(event);

  switch (event.field) {
    case 'createUser':
        return await createUser(event.arguments.input)
    case 'getUser':
        return await getUsers(event.arguments.id)
    case 'updateUser':
        return await updateUsers(event.arguments.input)
    case 'deleteUser':
        return await deleteUsers(event.arguments.input.id)
    default:
      throw new Error(
        'Invalid Request'
      )
  }
};


const createUser = async (data) => {
  const result = await createItem(data);
  return result;
}

const createItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "UsersTable",
      Item: {
        id: uuid(),
        text: data.text,
        checked: false
      }
    };
  
     client.put(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(params.Item)
      }
    })
  })
}


const getUsers = async (data) => {
  const result = await getItem(data);
  return result;
}

const getItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "UsersTable", 
      Key: {
        id: data,
      }
    };
  
    client.get(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Item)
      }
    })
  })
}


// <---- User Update ------>


const updateUsers = async (data) => {
  const result = await UpdateItem(data);
  return result;
}

const UpdateItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "UsersTable", 
      Key: {
        id: data.id,
      },
      UpdateExpression: 'set #t = :t',
      ExpressionAttributeNames:{
        '#t': 'text'
      },
      ExpressionAttributeValues: {
        ':t' : data.text,
      },
      ReturnValues:"UPDATED_NEW"
    };
  
    client.update(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Attributes)
      }
    })
  })
}


// <---- User Delete ------>


const deleteUsers = async (data) => {
  const result = await deleteItem(data);
  return result;
}

const deleteItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "UsersTable", 
      Key: {
        id: data,
      }
    };
  
    client.delete(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Item)
      }
    })
  })
}
