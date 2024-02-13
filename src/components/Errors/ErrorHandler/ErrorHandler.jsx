import { Alert } from 'reactstrap';

export function ErrorHandler({ errors }) {
  return errors.length ? (
    <Alert color="warning">
      <ul>
        {errors.map((err, idx) => (
          <li key={idx}>{err.message}</li>
        ))}
      </ul>
    </Alert>
  ) : null;
}
