import React from 'react';
import { Typography } from '@supabase/ui';
import Image from 'next/image';
import openSaucedImg from '../public/oslogo.png';
import notifications from '../public/notifications.svg';
import downArrow from '../public/chevron-down.svg';

const TopNav: React.FC = () => {
    const { Text } = Typography;

    return (
        <div className="top-nav-container flex justify-between items-center h-[60px] px-[64px] py-1 bg-[#26292B] border-b">
            <div className='flex items-center p-2'>
                <Image width={32} height={32} src={openSaucedImg} />
                <Text className='font-semibold px-2 text-[16px]' strong style={{ color: 'white' }}>OpenSauced</Text>
            </div>
            <div className='flex'>
                <div className='flex items-center'>
                    <Image src={notifications} />
                    <div className='ml-3 mr-1'>
                        <Image src='/ellipse-1.png' height={32} width={32} />
                    </div>
                    <div>
                        <Image src={downArrow}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TopNav;