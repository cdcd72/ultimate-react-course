import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {isRouteErrorResponse(error)
          ? (error as ErrorResponse).data
          : (error as Error).message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
