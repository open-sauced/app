import React from 'react';
import { Button, Typography } from "@supabase/ui"
import Image from 'next/image'

const Header: React.FC = () => {
  const { Title, Text } = Typography;

    return (
        <header className='header flex flex-row mb-2'>
          <div className='header-image mr-2 p-2 min-w-[130px]'>
            <Image
              src='/hacktoberfest-icon.png'
              height={114}
              width={114}
              layout={'responsive'}
            />
          </div>
          <div className='header-info flex flex-col grow justify-center p-2'>
            <Title level={3} className='font-extrabold'>Hacktoberfest 2022</Title>
            <Text className='mb-5'>Open source projects and samples for Microsoft</Text> {/* Find out what this means */}
            <div className='flex'>
              <Button className='mr-3' style={{ backgroundColor: 'lightgrey' }} size='tiny'>
                <Text>
                  # hacktoberfest
                </Text>
              </Button>
              <Button className='mr-3' style={{ backgroundColor: 'lightgrey' }} size='tiny'>
                <Text>
                  Microsoft
                </Text>
              </Button>
              <Button className='mr-3' style={{ backgroundColor: 'lightgrey' }} size='tiny'>
                <Text>
                  person
                </Text>
              </Button>
              <Button className='mr-3' style={{ backgroundColor: 'lightgrey' }} size='tiny'>
                <Text>
                  ohmyzsh, repo, repo, +2
                </Text>
              </Button>
            </div>
          </div>
        </header>
    )
};

export default Header;