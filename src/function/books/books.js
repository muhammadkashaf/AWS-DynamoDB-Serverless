const uuid = require("uuid/v4");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async function (event) {
  console.log(event);

  switch (event.field) {
    case 'createBooks':
        return await createBook(event.arguments.input)
    case 'getBooks':
        return await getBook(event.arguments.id)
    case 'updateBooks':
        return await updateBook(event.arguments.input)
    case 'deleteBooks':
        return await deleteBook(event.arguments.input.id)
    default:
      throw new Error(
        'Invalid Request'
      )
  }
};


const createBook = async (data) => {
  const result = await createItem(data);
  return result;
}

const createItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "BooksTable",
      Item: {
        id: uuid(),
        book: data.book,
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


const getBook = async (data) => {
  const result = await getItem(data);
  return result;
}

const getItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "BooksTable", 
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


const updateBook = async (data) => {
  const result = await UpdateItem(data);
  return result;
}

const UpdateItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "BooksTable", 
      Key: {
        id: data.id,
      },
      UpdateExpression: 'set #t = :t',
      ExpressionAttributeNames:{
        '#t': 'author'
      },
      ExpressionAttributeValues: {
        ':t' : data.author,
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


const deleteBook = async (data) => {
  const result = await deleteItem(data);
  return result;
}

const deleteItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "BooksTable", 
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
