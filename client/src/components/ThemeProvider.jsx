import React from 'react'

const ThemeProvider = ({children}) => {

    let theme="light";
  return (
    <div className={theme}>

        <div className='text-gray-800 bg-white dark:text-gray-200 dark:bg-gray-800'>
            {children}
        </div>
      
    </div>
  )
}

export default ThemeProvider
