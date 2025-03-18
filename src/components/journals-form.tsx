"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const JournalForm = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<{ date: string; entry: string }[]>([]);

  // Fetch existing journal entries from the API
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch("/api/journals?userId=123"); // Replace with actual userId
      const data = await response.json();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!entry.trim()) return;

    const response = await fetch("/api/journals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "123", entry }), // Replace with actual userId
    });

    if (response.ok) {
      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
      setEntry("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Journal Form */}
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Journal</CardTitle>
          <CardDescription>
            Write your thoughts and reflect on your day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="journal-entry">Write Your Thoughts</Label>
              <Textarea
                id="journal-entry"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                rows={5}
                placeholder="What’s on your mind today?"
              />
            </div>
            <Button type="submit" className="w-full">
              Save Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Past Entries */}
      {/* <div>
        <h2 className="text-lg font-semibold">Past Journal Entries</h2>
        <div className="space-y-4 mt-4">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <p>{entry.entry}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-gray-500">No entries yet. Start writing!</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default JournalForm;
