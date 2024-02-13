import mockResponse from './mockResponse';

export function parseErrors(errors, status) {
  if (Array.isArray(errors)) {
    return errors.map((err) => ({
      message: err.message,
      status,
    }));
  }

  return [{ message: 'Ha ocurrido un error inesperado', status }];
}

export function fetchMock(url, { options, shouldMockError = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (shouldMockError) {
        const errorsResponse = mockResponse(
          { errors: [{ message: 'Recurso no encontrado' }] },
          404,
          'Not Found',
        );
        const errorsJson = await errorsResponse.json();
        reject(parseErrors(errorsJson, errorsResponse.status));
      }

      const response = await fetch(url, options);
      try {
        const json = await response.json();
        resolve(json);
      } catch {
        const parsedErrors = parseErrors(
          [{ message: 'Recurso no encontrado' }],
          404,
        );
        reject(parsedErrors);
      }
    }, 2000);
  });
}

export default {
  fetchMock,
  parseErrors,
};
