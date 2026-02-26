import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { checkUser } from '@/lib/checkUser';
import UsernameForm from './_components/username-form';
import { getLatestUpdates } from '@/actions/dashboard';
import { format } from 'date-fns';

const DashboardPage = async () => {
    const user = await checkUser();
    const upcomingMeetings = await getLatestUpdates();

    return (
        <div className='space-y-8'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome, {user?.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {upcomingMeetings && upcomingMeetings.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
                                <ul className="space-y-2">
                                    {upcomingMeetings.map((meeting) => (
                                        <li key={meeting.id} className="border-b pb-2 last:border-0">
                                            <span className="font-medium text-blue-600">{meeting.event.title}</span> on{" "}
                                            {format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")}{" "}
                                            with <span className="font-medium">{meeting.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No upcoming meetings scheduled.</p>
                        )}
                    </div>
                </CardContent>
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