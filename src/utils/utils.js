import mockResponse from './mockResponse';

export function asyncMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

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
  console.log({ shouldMockError, options });
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

      let response = await fetch(url, options);
      try {
        response = await response.json();
        resolve(response);
      } catch {
        const parsedErrors = parseErrors(response, 500);
        reject(parsedErrors);
      }
    }, 2000);
  });
}

export default {
  fetchMock,
};
