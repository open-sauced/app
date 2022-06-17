import React from 'react';
import Link from 'next/link';
import { test } from '../../../test'
import { useRouter } from 'next/router';
import { Button } from '@supabase/ui';

const Nav: React.FC = () => {

  const router = useRouter();

  const defaultTools = [
    {
      name: "default"
    },
    {
      name: "nextjs"
    },
    {
      name: "blah"
    }  
  ];

  const { portalName, tool: navbarTool } = router.query;

  const toolList = defaultTools.concat(test);

  return (
    <nav className='tool-list-nav flex flex-row min-h-[50px] pt-4 border-b'>
      {toolList.map((tool, index) => 
        <div className={`nav-tool-item ${navbarTool === tool.name ? 'border-b-2 border-indigo-500' : ''}`}>
          <Link
            href={tool.name === "nextjs" ?
              `${portalName}` :
              `${portalName}?tool=${tool.name}`
            }
            key={index}
          >
            <Button size='xlarge' type='text'>
              <h5>
                {tool.name}
              </h5>
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Nav;