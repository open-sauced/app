import React from 'react';
import Link from 'next/link';
import { test } from '../../../test'

const Nav: React.FC = () => {

    const defaultTools = [
      {
        name: "default"
      },
      {
        name: "default"
      },
      {
        name: "default"
      }  
    ]

    const toolList = defaultTools.concat(test);

    return (
        <nav className='tool-list-nav flex flex-row min-h-[50px] p-2 border'>
          {toolList.map((tool, index) => 
            <Link
              className='nav-tool-item'
              href=''
              key={index}
            >
              <h5 className='pr-2'>
                {tool.name}
              </h5>
            </Link>
          )}
        </nav>
    )
}

export default Nav;