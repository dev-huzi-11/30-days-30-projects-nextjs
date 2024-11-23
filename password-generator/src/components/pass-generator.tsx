"use client";
import { useState, ChangeEvent, useCallback } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const PassGenerator = () => {
  const [length, setLength] = useState<number>(8);
  const [pass, setPass] = useState<string>("");
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);

  const passGenerate = useCallback(() => {
    let allChar: string = "";
    let generatedPass: string = "";

    if (numbers) allChar += "0123456789";
    if (symbols) allChar += "?<>/{}[]'|!@#$%^&*()_-+~`";
    if (includeLowercase) allChar += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) allChar += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (allChar === "") {
      alert("Please select at least one character type");
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChar.length);
      generatedPass += allChar[randomIndex];
    }

    setPass(generatedPass);
  }, [length, includeLowercase, includeUppercase, numbers, symbols]);

  const copyCLipBoard = () => {
    navigator.clipboard.writeText(pass).then(
      () => {
        alert("Password copied to cipboard");
      },
      (err) => {
        alert("Failed to copy password to clipboard");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-4xl font-bold text-gray-800">
            Password Generator
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Generate a secure password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="length" className="text-base font-medium">
              Password Length: 
            </Label>
            <Input
              type="number"
              id="length"
              value={length}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLength(Number(e.target.value))
              }
              min={8}
              max={32}
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-lg">Include:</Label>
            <Label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox 
                checked={includeUppercase}
                onCheckedChange={(checked: CheckedState) =>
                  setIncludeUppercase(checked === true)
                }
                className="h-6 w-6 rounded-full"
              />
              <span className="font-medium text-base">Uppercase Letters</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={includeLowercase}
                onCheckedChange={(checked: CheckedState) =>
                  setIncludeLowercase(checked === true)
                }
                className="h-6 w-6 rounded-full"
              />
              <span className="font-medium text-base">Lowercase Letters</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={numbers}
                onCheckedChange={(checked: CheckedState) =>
                  setNumbers(checked === true)
                }
                className="h-6 w-6 rounded-full"
              />
              <span className="font-medium text-base">Numbers</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={symbols}
                onCheckedChange={(checked: CheckedState) =>
                  setSymbols(checked === true)
                }
                className="h-6 w-6 rounded-full"
              />
              <span className="font-medium text-base">Symbols</span>
            </Label>
          </div>
          <Button
            onClick={passGenerate}
            className="w-full text-white py-6 rounded-lg transition-colors"
          >
            Generate Password
          </Button>
        </CardContent>
        <CardFooter className="w-full flex items-center">
            <div className="w-full flex p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-center">
                Your Password:{" "}
                <strong className="text-blue-600 font-mono">{pass}</strong>
              </p>
            </div>
              <Button className="px-7 py-6 font-medium text-lg rounded-3xl" onClick={copyCLipBoard}>Copy to clipboard</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PassGenerator;
