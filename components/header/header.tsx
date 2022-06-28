import React from 'react';
import { Typography } from "@supabase/ui"
import { useRouter } from 'next/router';
import Image from 'next/image'
import hashtag from '../../public/Icon.svg';
import orgIcon from '../../public/bookmark-alt.svg';
import cancelIcon from '../../public/x-circle.svg';

const Header: React.FC = () => {
  const { Title, Text } = Typography;
  const router = useRouter();

  const { filterorg } = router.query;

    return (
        <header className='header flex flex-row pt-[24px] px-[64px] bg-[#F1F3F5]'>
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
              <div className='mr-3 py-[7px] px-2 border border-[#C5C5C5] rounded-lg'>
                <Text strong>
                  <Image src={hashtag} /> hacktoberfest
                </Text>
              </div>
              {filterorg && 
              <div className='mr-3 py-[7px] px-2 border border-[#C5C5C5] rounded-lg'>
                <Text className='flex items-center pt-[3px]' strong>
                <div className='flex items-end pr-1'>
                  <Image src={orgIcon} />
                </div>
                {filterorg}
                <div className='flex items-end pl-1'>
                  <Image src={cancelIcon} />
                </div>
                </Text>
              </div>}
            </div>
          </div>
        </header>
    )
};

export default Header;