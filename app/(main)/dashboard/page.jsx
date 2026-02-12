import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { checkUser } from '@/lib/checkUser';
import UsernameForm from './_components/username-form';

const DashboardPage = async () => {
    const user = await checkUser();

    return (
        <div className='space-y-8'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome, {user?.name}
                    </CardTitle>
                </CardHeader>
                {/* latest updates */}
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Your Unique Link
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <UsernameForm initialUsername={user?.username} />
                </CardContent>
            </Card>
        </div>
    );
}

export default DashboardPage;