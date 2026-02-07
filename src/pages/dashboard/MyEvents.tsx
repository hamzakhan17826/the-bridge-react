import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMyEvents } from '@/hooks/useEvent';
import { getEventStatusKey } from '@/constants/enums';

export default function MyEvents() {
  const { data: events = [], isLoading, isError } = useMyEvents();

  return (
    <>
      <Helmet>
        <title>My Events - Dashboard</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Event List</h1>
          <p className="text-muted-foreground">
            Events created by your professional medium profile.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Results ({events.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-sm text-muted-foreground mb-3">
                Loading...
              </div>
            )}
            {isError && (
              <div className="text-sm text-destructive mb-3">
                Failed to load.
              </div>
            )}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>Public</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length > 0 ? (
                    events.map((event) => {
                      const statusLabel =
                        getEventStatusKey(event.status) ?? 'Upcoming';
                      return (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div className="text-sm font-medium">
                              {event.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.slug}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{statusLabel}</Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(
                              event.startDateTime + 'Z'
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell>{event.isPublic ? 'Yes' : 'No'}</TableCell>
                          <TableCell>{event.credits}</TableCell>
                          <TableCell>{event.currentEnrolled}</TableCell>
                          <TableCell>
                            {new Date(event.createdAt + 'Z').toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/dashboard/events/${event.id}/edit`}>
                                Edit
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No events to display
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
