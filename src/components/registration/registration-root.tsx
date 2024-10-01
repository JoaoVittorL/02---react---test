export default function RegistrationRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="flex flex-col  items-center justify-center gap-4 p-4 max-w-[600px] h-full w-full mx-auto">
        {children}
      </div>
    </div>
  )
}