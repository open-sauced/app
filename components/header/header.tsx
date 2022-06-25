import React from 'react';
import { Typography } from "@supabase/ui"
import { useRouter } from 'next/router';
import Image from 'next/image'
import hashtag from '../../public/Icon.svg';

const Header: React.FC = () => {
  const { Title, Text } = Typography;
  const router = useRouter();

  const { filter } = router.query;

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
              <div className='mr-3 py-[7px] px-2 bg-[#F1F3F5] border rounded-lg'>
                <Text strong>
                  <Image src={hashtag} /> hacktoberfest
                </Text>
              </div>
              {filter && 
              <div className='mr-3 py-[7px] px-2 bg-[#F1F3F5] border rounded-lg'>
                <Text strong>
                  {filter}
                </Text>
              </div>}
            </div>
          </div>
        </header>
    )
};

export default Header;