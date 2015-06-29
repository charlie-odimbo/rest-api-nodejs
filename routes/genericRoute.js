/**
 * @file genericRoute.js
 * @author Charlie Fontana <cfontana0@gmail.com>
 * @version 0.1
 */
module.exports = function(router, modelName) {
	var path = '/' + modelName + "s", 
		Model = require('../app/models/' + modelName);

	// Create a new element
	router.route(path).post(function(req, res) {
		var model = new Model();

		for (var property in Model.schema.paths) {
			if (property.indexOf('_') !== 0 && req.body[property] !== undefined) {
				model[property] = req.body[property];
			}
		}

		model.save(function(err) {
			if (err) res.send(err);
			res.json({ message: modelName + ' created!' });
		});
	});

	// Find all the elements
	router.route(path).get(function(req, res) {
		Model.find(function(err, list) {
			if (err) res.send(err);
			res.json(list);
		});
	});

	// Find by Id
	router.route(path + '/:id').get(function(req, res) {
		Model.findById(req.params.id, function(err, model) {
			if (err) res.send(err);
			res.json(model);
		});
	});

	// Update
	router.route(path + '/:id').put(function(req, res) {
		Model.findById(req.params.id, function(err, model) {
			if (err) res.send(err);

			for (var property in Model.schema.paths) {
				if (property.indexOf('_') !== 0 && req.body[property] !== undefined) {
					model[property] = req.body[property];
				}
			}

			model.save(function(err) {
				if (err) res.send(err);
				res.json({ message: modelName + ' updated!' });
			});
		});
	});

	router.route(path + '/:id').delete(function(req, res) {
		Model.remove({ _id: req.params.id}, function(err, model) {
			if (err) res.send(err);
			res.json({ message: modelName + ' deleted!' });
		});
	});
};