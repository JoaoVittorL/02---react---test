export default function RegistrationForm({ children, onSubmit }: { children: React.ReactNode, onSubmit?: () => void }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 w-full ">
      {children}
    </form>
  )
}