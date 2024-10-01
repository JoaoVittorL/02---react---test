interface FormErrorProps {
  message?: string;
}

export const FormLoading = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="h-8 p-2 rounded-md flex justify-center items-center text-sm  bg-blue-800 text-white-500">
      <div className="h-5 w-5 border-4 border-t-4 border-gray-200 border-t-green-400 rounded-full animate-spin"></div>
      <span className="ml-2 dark:text-white-500">{message}</span>
    </div >
  );
};