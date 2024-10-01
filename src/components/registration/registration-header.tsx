export default function RegistrationHeader({ title, coment }: { title: string, coment: string }) {
  return (
    <div className="flex text-center flex-col gap-2">
      <span className="text-blue-800 dark:text-white-200 font-semibold">{title}</span>
      <p className="text-blue-800 dark:text-white-200"> {coment}</p>
    </div>
  )
}