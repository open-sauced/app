import React from 'react';
import { Input, Typography } from "@supabase/ui"
import Image from 'next/image'
import image from "../../public/hacktoberfestimg.png"

const Header: React.FC = () => {
  const { Title } = Typography;

    return (
        <header className='header flex flex-row mb-2'>
          <div className='header-image mr-2 p-2 min-w-[230px] border'>
            <Image
              src={image}
              layout={'responsive'}
            />
          </div>
          <div className='header-info flex flex-col grow justify-center p-2'>
            <Title level={2} className='pb-1'>Hacktoberfest</Title>
            <Title level={4} className='pb-1'>Description with markdown support</Title> {/* Find out what this means */}
            <Input
              className='w-[100%]'
            />
          </div>
        </header>
    )
};

export default Header;