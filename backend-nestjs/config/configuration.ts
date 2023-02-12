export default () => ({
  // nodeEnv: process.env.NODE_ENV || 'development',
  // server: {
  //   port: parseInt(process.env.PORT) || 4000,
  //   hostName: process.env.hostname || 'localhost:4000',
  // },
  database: {
    host: `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@learngraphql.doxh4xt.mongodb.net/?retryWrites=true&w=majority`,
  }
})