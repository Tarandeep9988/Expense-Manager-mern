"use client"

const layout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border-2 p-5 rounded-2xl">
        {children}
      </div>
    </div>
  )
}

export default layout