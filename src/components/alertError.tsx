import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "./ui/alert";

export function AlertError() {
  return (
    <Alert className="w-[600px]" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please fill all field to be able to add a technology to your custom Tech
        Radar.
      </AlertDescription>
    </Alert>
  );
}
