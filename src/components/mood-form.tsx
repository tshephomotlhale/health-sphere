"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const MoodForm = () => {
  const [mood, setMood] = useState("");
  const [stressLevel, setStressLevel] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "123", mood, stressLevel }),
      });

      if (response.ok) {
        console.log("Mood and stress level submitted successfully!");
        setMood("");
        setStressLevel(0);
      } else {
        console.error("Failed to submit mood and stress level.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
        <CardDescription>Tell me how you feel today.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-6">
            {/* Mood Selection */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mood">Mood</Label>
              <Select value={mood} onValueChange={(value) => setMood(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your Mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Moods</SelectLabel>
                    {/* Each item has an icon, text, and color background */}
                    <SelectItem
                      value="Happy"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😊</span>
                      <span>Happy</span>
                    </SelectItem>
                    <SelectItem
                      value="Excited"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>🤩</span>
                      <span>Excited</span>
                    </SelectItem>
                    <SelectItem
                      value="Calm"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😌</span>
                      <span>Calm</span>
                    </SelectItem>
                    <SelectItem
                      value="Neutral"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😐</span>
                      <span>Neutral</span>
                    </SelectItem>
                    <SelectItem
                      value="Sad"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😢</span>
                      <span>Sad</span>
                    </SelectItem>
                    <SelectItem
                      value="Stressed"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😟</span>
                      <span>Stressed</span>
                    </SelectItem>
                    <SelectItem
                      value="Angry"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😡</span>
                      <span>Angry</span>
                    </SelectItem>
                    <SelectItem
                      value="Depressed"
                      className="flex items-center space-x-2 p-2"
                    >
                      <span>😞</span>
                      <span>Depressed</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Stress Level */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stress">Stress Level</Label>
              <p className="text-sm text-muted-foreground">
                Stress Level: {stressLevel}
              </p>
              <Slider
                value={[stressLevel]}
                max={100}
                step={1}
                onValueChange={(value) => setStressLevel(value[0])}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodForm;
