
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      <div 
        className="h-screen w-3/5 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: 'url(/auth-background.png)' }}
      />
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout