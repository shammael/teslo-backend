const expressAdapter = (controller) => {
    return (request, response, next) => {
        return Promise.resolve(controller
            .handleRequest({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: request.body,
            params: request.params,
            query: request.query,
            headers: request.headers,
        })
            .then((controllerResponse) => {
            response
                .status(controllerResponse.statusCode)
                .json(controllerResponse.body);
            return next();
        })
            .catch((error) => {
            return next(error);
        }));
    };
};
export default expressAdapter;
