import React from 'react';
import { Typography } from '@supabase/ui';

const TopNav: React.FC = () => {
    const { Text } = Typography;

    return (
        <div className="top-nav-container flex justify-between px-8 py-1 border">
            <Text>Logo</Text>
            <Text>Username</Text>    
        </div>
    )
};

export default TopNav;