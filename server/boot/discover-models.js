'use strict';

module.exports = function(app, callback) {
  // Obtain the datasource registered with the name "my_db"
  const dataSource = app.dataSources.my_db;

  // Step 1: define a model for "INVENTORY" table,
  // including any models for related tables (e.g. "PRODUCT").
  dataSource.discoverAndBuildModels(
    'departments',
    {relations: true},
    function(err, models) {
      if (err) return callback(err);

      // Step 2: expose all new models via REST API
      for (const modelName in models) {
        app.model(models[modelName], {dataSource: dataSource});
      }

      callback();
    });
};
