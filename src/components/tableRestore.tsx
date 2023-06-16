import { TechRadarEntry, TechRadarHistory } from "../types";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useToast } from "./ui/use-toast";

type Props = {
  entriesStack: TechRadarHistory[];
  handleRestore: (entries: TechRadarEntry[], currentVersion: number) => void;
  currentVersion: number;
};

export function TableRestore({
  entriesStack,
  handleRestore,
  currentVersion,
}: Props) {
  const { toast } = useToast();
  return (
    <Table>
      <TableCaption>
        We can only store your last 5 version of your Tech Radar
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Date Modified</TableHead>
          <TableHead>Tech Radar Overview</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entriesStack.map((entryStack, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-xs">
              {entryStack.date.format("YYYY-MM-DD HH:mm:ss")}
            </TableCell>
            <TableCell className="flex flex-row text-xs items-center h-full flex-wrap">
              {entryStack.entries.map((entry, index) => (
                <div key={index} className="flex flex-row text-[10px]">
                  <div className="px-1">{entry.label}</div>
                  <span className="border-r border-slate-400"></span>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-right">
              {index !== currentVersion ? (
                <Button
                  onClick={() => {
                    handleRestore(entriesStack[index].entries, index);
                    toast({
                      description: `Version successfully restored`,
                      variant: "success",
                    });
                  }}
                  className="bg-red-400 rounded w-32"
                >
                  Restore
                </Button>
              ) : (
                <Button className="bg-green-400 rounded w-32" disabled>
                  Current Version
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
