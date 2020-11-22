// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './myDB/lessons.db3'
    },
    useNullAsDefault: true
  },
};
