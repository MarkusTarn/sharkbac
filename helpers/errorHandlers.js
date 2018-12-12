// Define error types
class System extends Error {
	constructor(data, message, code) {
		super();
		this.name = 'SystemError';
		this.message = message || 'System-level error occurred';
		this.data = data || {};
		this.status = 424;
		this.code = code;
	}
}

class Validation extends Error {
	constructor(data, message) {
		super();
		this.name = 'ValidationError';
		this.message = message || 'Error when validating data';
		this.data = data || {};
		this.status = 400;
	}
}

class Request extends Error {
	constructor(data, message, status) {
		super();
		this.name = 'RequestError';
		this.message = message;
		this.data = data || {};
		this.status = status || 400;
	}
}

class Resource extends Error {
	constructor(data, message, status) {
		super();
		this.name = 'ResourceError';
		this.message = message || 'No such resource was found';
		this.data = data || {};
		this.status = status || 404;
	}
}

export default {
	System,
	Validation,
	Request,
	Resource
};
