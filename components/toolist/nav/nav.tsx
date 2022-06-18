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
      name: "Popularity"
    },
    {
      name: "Activity"
    },
    {
      name: "Repositories (20)"
    },
    {
      name: "Commits (4,308)"
    },
    {
      name: "Issues (45)"
    },
    {
      name: "Pull Requests (13)"
    },
    {
      name: "People (54)"
    }
  ];

  const { portalName, tool: navbarTool } = router.query;

  const toolList = defaultTools;

  return (
    <nav className='tool-list-nav flex flex-row min-h-[50px] pt-4 border-b'>
      {toolList.map((tool, index) => 
        <div 
        key={index} className={`nav-tool-item ${navbarTool === tool.name ? 'border-b-2 border-indigo-500' : ''}`}>
          <Link
            href={tool.name === "nextjs" ?
              `${portalName}` :
              `${portalName}?tool=${tool.name}`
            }
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