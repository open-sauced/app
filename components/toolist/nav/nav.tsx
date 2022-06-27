import React from 'react';
import Link from 'next/link';
import { test } from '../../../test'
import { useRouter } from 'next/router';
import { Button } from '@supabase/ui';

const Nav: React.FC = () => {

  const router = useRouter();

  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Activity"
    },
    {
      name: "Repositories",
      numOf: 20
    },
    {
      name: "Commits",
      numOf: 4308
    },
    {
      name: "Issues",
      numOf: 45
    },
    {
      name: "Pull Requests",
      numOf: 13
    },
    {
      name: "People",
      numOf: 54
    }
  ];

  const { portalName, tool: navbarTool } = router.query;

  const toolList = defaultTools;

  return (
    <nav className='tool-list-nav flex flex-row min-h-[50px] pt-4 border-b'>
      {toolList.map((tool, index) => 
        <div 
        key={index} className={`nav-tool-item flex border-b-2 -mb-[1px] ${navbarTool === tool.name ? 'border-[#FFA01C]' : 'border-[transparent]'}`}>
          <Link
            href={tool.name === "nextjs" ?
              `${portalName}` :
              `${portalName}?tool=${tool.name}`
            }
          >
            <Button size='xlarge' type='text' disabled={navbarTool === tool.name}>
              <h5 className={navbarTool === tool.name ? 'text-black' : 'text-gray'}>
              {tool.name}
              </h5>
              {
                tool.numOf && 
                  <div className='ml-2 px-1.5 py-0 bg-[#F1F3F5] border rounded-2xl text-sm'>
                    {tool.numOf}
                  </div>
              }
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Nav;