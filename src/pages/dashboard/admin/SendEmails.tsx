import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useEmailPreferences, useSendEmailsToUsers } from '@/hooks/useEmail';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function SendEmails() {
  const { data: preferences = [], isLoading } = useEmailPreferences();
  const sendEmailsMutation = useSendEmailsToUsers();
  const { isSuccess, reset } = sendEmailsMutation;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const canSubmit = useMemo(
    () => selectedIds.length > 0 && subject.trim() && body.trim(),
    [selectedIds, subject, body]
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    sendEmailsMutation.mutate({
      toUsersWithEmailPreferenceID: selectedIds,
      subject: subject.trim(),
      bodyHtmlOrText: body.trim(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedIds([]);
      setSubject('');
      setBody('');
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <>
      <Helmet>
        <title>Send Emails - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Send Emails</h1>
          <p className="text-muted-foreground">
            Send an email to users based on their email preferences.
          </p>
        </div>

        <div className="flex flex-col gap-5 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && (
                <p className="text-sm text-muted-foreground">Loading...</p>
              )}
              {!isLoading && preferences.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No email preferences found.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {preferences.map((pref) => (
                  <label
                    key={pref.emailPreferencesID}
                    className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/40"
                  >
                    <Checkbox
                      checked={selectedIds.includes(pref.emailPreferencesID)}
                      onCheckedChange={() =>
                        toggleSelection(pref.emailPreferencesID)
                      }
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {pref.displayName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {pref.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <RichTextEditor
                  value={body}
                  onChange={setBody}
                  placeholder="Write your message..."
                  className="email-editor"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedIds.length}
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || sendEmailsMutation.isPending}
                  className="btn"
                >
                  {sendEmailsMutation.isPending ? 'Sending...' : 'Send Emails'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
