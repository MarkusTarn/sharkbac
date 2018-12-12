const logger = require('./logger');

function errorHandler(err, req, res, next) {
	logger.log('debug', err.message, {
		data: err.data,
		statusCode: err.status,
		rid: req.rid,
	});

	return res.status(err.status || 500)
		.json({
			status: err.status,
			message: err.message,
			data: err.data,
		});
}

function requestResponse(req, res, next) {
	req.response = (statusCode, message, data) => {
		logger.log('debug', message, {
			rid: req.rid,
			data,
			statusCode,
		});

		return res.status(statusCode)
			.json({
				status: statusCode,
				message: message,
				data,
			});
	};
	next();
}

export default {
	response: requestResponse,
	error: errorHandler
};