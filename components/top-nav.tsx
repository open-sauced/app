import React from 'react';
import { Typography, Input, Button } from '@supabase/ui';
import Image from 'next/image';
import pizzaImage from '../public/noto_pizza.svg';
import downArrow from '../public/chevron-down.svg';
import avatar from '../public/ellipse-1.png';

const TopNav: React.FC = () => {
    const { Text } = Typography;

    return (
        <div className="top-nav-container flex justify-between items-center h-[60px] px-8 py-1 border-b">
            <div className='flex items-center'>
                <Image src={pizzaImage} />
                <Text className='font-semibold px-2 text-[16px]'>OpenSauced</Text>
                <Input
                    placeholder='Search Portals'
                />
            </div>
            <div className='flex'>
                <div className='flex items-center'>
                    <Image src='/ellipse-1.png' height={32} width={32} />
                    <Image className='mx-2' src={downArrow}/>
                </div>    
                <Button 
                    className='ml-5'
                    size='small'
                    style={{ backgroundColor: '#0091FF' }}
                >
                    Button    +
                </Button>
            </div>
        </div>
    )
};

export default TopNav;