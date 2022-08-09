import mongoose from "mongoose";

const connection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our database*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
