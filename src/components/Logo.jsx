import React from 'react'
import { Coffee } from "lucide-react";
const Logo = () => {
  return (
       <div
            className="w-8 mt-2 h-8 bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center"
            style={{
              clipPath:
                'path("M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z")',
            }}
          >
            <Coffee
              height={20}
              width={20}
              className="text-white w-4 h-4 transition-transform duration-300 hover:rotate-12"
            />
          </div>
  )
}

export default Logo