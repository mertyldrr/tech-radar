import { useEffect, useState } from "react";
import { radar_visualization } from "./radar";
import { radarConfig } from "./contants";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { buildConfig, cn } from "./utils";
import { InputErrors, TechRadarEntry } from "./types";
import { Combobox } from "./components/combobox";
import { ComboBoxVariant, ErrorField } from "./enums";
import { Switch } from "./components/ui/switch";
import { AlertError } from "./components/alertError";
import { TableRestore } from "./components/tableRestore";
import moment from "moment";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

function App() {
  const [entries, setEntries] = useState<TechRadarEntry[]>(radarConfig.entries);
  const [entriesStack, setEntriesStack] = useState([
    { date: moment(), entries: radarConfig.entries },
  ]);
  const [newTechName, setNewTechName] = useState("");
  const [quadrantValue, setQuadrantValue] = useState("");
  const [ringValue, setRingValue] = useState("");
  const [activeValue, setActiveValue] = useState("");
  const [movedValue, setMovedValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [inputError, setInputError] = useState<InputErrors>({
    techName: true,
    quadrantValue: true,
    ringValue: true,
    movedValue: true,
    activeValue: true,
  });
  const [currentVersionNumber, setCurrentVersionNumber] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    radar_visualization(buildConfig(entries, darkMode));
  }, [darkMode, entries]);

  const handleAddEntry = (newEntry: TechRadarEntry) => {
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    updateEntriesStack(updatedEntries);
    setNewTechName("");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleRestoreEntries = (
    entries: TechRadarEntry[],
    currentVersion: number
  ) => {
    setEntries(entries);
    setCurrentVersionNumber(currentVersion);
  };

  const clearAllEntries = () => {
    if (entries && entries.length > 0) {
      setEntries([]);
      updateEntriesStack([]);
    }
  };

  const updateEntriesStack = (newEntries: TechRadarEntry[]) => {
    setEntriesStack((prevStack) => {
      const currentTime = moment();
      const updatedStack = [
        ...prevStack,
        { date: currentTime, entries: newEntries },
      ];
      if (updatedStack.length > 5) {
        updatedStack.splice(0, 1);
      }
      setCurrentVersionNumber(updatedStack.length - 1);
      return updatedStack;
    });
  };

  const handleTechNameChange = (name: string) => {
    if (name && name !== "") {
      handleError(ErrorField.TechName);
      setNewTechName(name);
    } else {
      handleError(ErrorField.TechName, true);
    }
  };

  const handleQuadrantChange = (quadrant: string) => {
    if (quadrant && quadrant !== "") {
      handleError(ErrorField.QuadrantValue);
      setQuadrantValue(quadrant);
    }
  };

  const handleRingChange = (ring: string) => {
    if (ring && ring !== "") {
      handleError(ErrorField.RingValue);
      setRingValue(ring);
    }
  };

  const handleMovedChange = (moved: string) => {
    if (moved && moved !== "") {
      handleError(ErrorField.MovedValue);
      setMovedValue(moved);
    }
  };

  const handleActiveChange = (isActive: string) => {
    if (isActive && isActive !== "") {
      handleError(ErrorField.ActiveValue, false);
      setActiveValue(isActive);
    }
  };

  const handleError = (field: ErrorField, value = false) => {
    setInputError({ ...inputError, [field]: value });
  };

  const isAnyError = Object.values(inputError).some((el) => el);

  const darkModeRule = cn(
    "flex flex-col items-center w-screen h-screen",
    darkMode ? "bg-neutral-800" : "bg-white"
  );
  return (
    <div className={darkModeRule}>
      <div className="flex justify-center items-center py-3 w-full bg">
        <Dialog>
          <DialogTrigger className="rounded-md font-bold bg-[#0166B1] px-4 py-3 text-white">
            Customise
          </DialogTrigger>
          <DialogContent className="bg-[#0166B1]">
            <Tabs
              defaultValue="insert"
              className="w-full p-2 bg-[#bbbbbb] rounded-md"
            >
              <TabsList className="grid w-full grid-cols-4 px-2">
                <TabsTrigger value="insert">Add New Technology</TabsTrigger>
                <TabsTrigger value="reset">Reset Tech Radar</TabsTrigger>
                <TabsTrigger value="restore">Restore Tech Radar</TabsTrigger>
                <TabsTrigger value="ui">Dark Mode</TabsTrigger>
              </TabsList>
              <TabsContent value="insert" className="bg-[#bbbbbb]">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      You can add a new tech to your technology-radar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Technology Name</Label>
                      <Input
                        id="name"
                        value={newTechName}
                        onChange={(e) => handleTechNameChange(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Combobox
                        variant={ComboBoxVariant.Quadrant}
                        value={quadrantValue}
                        onChange={handleQuadrantChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Combobox
                        variant={ComboBoxVariant.Ring}
                        value={ringValue}
                        onChange={handleRingChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Combobox
                        variant={ComboBoxVariant.Active}
                        value={activeValue}
                        onChange={handleActiveChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Combobox
                        variant={ComboBoxVariant.Moved}
                        value={movedValue}
                        onChange={handleMovedChange}
                      />
                    </div>
                    <div className="space-y-1">
                      {isAnyError && <AlertError />}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        handleAddEntry({
                          label: newTechName,
                          quadrant: parseInt(quadrantValue, 10),
                          ring: parseInt(ringValue, 10),
                          moved: parseInt(ringValue, 10),
                          active: Boolean(activeValue),
                        });
                        handleError(ErrorField.TechName, true);

                        toast({
                          description: "New technology successfully added",
                          variant: "success",
                        });
                      }}
                      disabled={isAnyError}
                    >
                      Add New Techology
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="reset">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      You can clear all entries in the Tech Radar
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => clearAllEntries()}>
                      Clear Tech Radar
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="restore">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      You can select and restore one of the previous Tech Radar
                      you've created
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row">
                    <TableRestore
                      entriesStack={entriesStack}
                      handleRestore={handleRestoreEntries}
                      currentVersion={currentVersionNumber}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ui">
                <Card>
                  <CardHeader>
                    <CardTitle>Activate Dark Mode</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                      <Label htmlFor="dark-mode">Activate Dark Mode</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      <svg id="radar"></svg>
      <Toaster />
    </div>
  );
}

export default App;
