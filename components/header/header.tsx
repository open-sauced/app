import React from 'react';
import { Button, Typography } from "@supabase/ui"
import Image from 'next/image'
import hacktoberfest from "../../public/hacktoberfest-icon.png"

const Header: React.FC = () => {
  const { Title, Text } = Typography;

    return (
        <header className='header flex flex-row mb-2'>
          <div className='header-image mr-2 p-2 min-w-[130px]'>
            <Image
              src={hacktoberfest}
              layout={'responsive'}
            />
          </div>
          <div className='header-info flex flex-col grow justify-center p-2'>
            <Title level={3} className='font-extrabold'>Hacktoberfest 2022</Title>
            <Text className='mb-5'>Open source projects and samples for Microsoft</Text> {/* Find out what this means */}
            <Button style={{ backgroundColor: 'lightgrey' }} size='small'>
              # hacktoberfest
            </Button>
          </div>
        </header>
    )
};

export default Header;