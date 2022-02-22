import styles from './Errors.module.scss';

interface ErrorsProps {
  errorList: JSX.Element[];
  errorCount: number;
  apiError: string;
}
export default function ErrorsDisplay(props: ErrorsProps) {
  const { errorList, errorCount, apiError } = props;

  return (
    <div className="flex items-start bg-red-50 block w-full rounded-md  sm:text-sm p-5 gap-5">
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current text-red-400"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="">
        {errorCount ? (
          <>
            <p className="text-red-800 font-medium">
              There were {errorCount} errors with your submission
            </p>
            <ul className={styles.errorList}>{errorList}</ul>
          </>
        ) : (
          <p className="text-red-800 font-medium mr-4">{apiError}</p>
        )}
      </div>
    </div>
  );
}
