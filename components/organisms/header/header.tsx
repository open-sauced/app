import React from 'react';
import { Typography } from "@supabase/ui"
import { useRouter } from 'next/router';
import Image from 'next/image'
import FilterCard from '../../molecules/FilterCard/filter-card';

const Header: React.FC = () => {
  const { Title, Text } = Typography;
  const router = useRouter();

  const { filterorg } = router.query;

    return (
        <header className='header flex flex-row pt-[24px] px-[64px] bg-[#F1F3F5]'>
          <div className='header-image mr-2 p-2 min-w-[130px]'>
            <Image
              alt='Portal Logo'
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
              <FilterCard filterName='hacktoberfest' hashtagIcon />
              {filterorg && <FilterCard filterName={filterorg as string} bgColor='white'/>}
            </div>
          </div>
        </header>
    )
};

export default Header;