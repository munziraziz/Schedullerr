import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const metadata = {
    title: "Meetings",
    description: "View and manage your meetings",
}
const MeetingsPage = () => {
  return (
    <Tabs defaultValue="upcoming">
  <TabsList>
    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
    <TabsTrigger value="past">Past</TabsTrigger>
  </TabsList>
  <TabsContent value="upcoming">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
  )
}

export default MeetingsPage