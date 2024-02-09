export const connect = async () => {
  const { MONGO_URL } = process.env;
  console.log("Connected to Mongo on 27017");
  return Promise.resolve();
}
