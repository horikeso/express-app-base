exports.helloWorld = function(string) {
    return 'Hello World ' + string;
}

exports.asyncHelloWorld = function(string, callback) {
    callback('Hello World ' + string);
}

exports.throwTypeError = function() {
    throw new TypeError('type error');
}

exports.throwSyntaxError = function() {
    throw new SyntaxError('syntax error');
}