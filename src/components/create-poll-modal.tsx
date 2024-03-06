"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import DynamicForm from "./dynamic-form"
import { copyToClickboard } from "@/lib/copy-clipboard"
import { toast } from "sonner"

export default function CreatePollModal() {
  const [pollResponse, setPollResponse] = useState<CreatePollResponse>({
    success: false,
    pollId: "",
  })

  const [copied, setCopied] = useState(false)

  function resetPollResponse() {
    setPollResponse({
      success: false,
      pollId: "",
    })
  }

  // TODO: combine drawer and dialog components to make responsible for mobile screens
  // follow this example: https://ui.shadcn.com/docs/components/drawer

  // Add valdiation for this form

  return (
    <Dialog onOpenChange={(e) => !e && resetPollResponse()}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="w-full xsm:w-fit h-[44px]">
          Criar enquete
        </Button>
      </DialogTrigger>

      {!pollResponse.success ? (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar enquete</DialogTitle>
            <DynamicForm className="pt-4" changeState={setPollResponse} />
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar link</DialogTitle>
            <DialogDescription>
              Qualquer um que possuir este link poderá votar na sua enquete.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/polls/${pollResponse.pollId}`}
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                copyToClickboard(
                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/polls/${pollResponse.pollId}`
                )
                toast("Url copiada!")
                setCopied(true)
              }}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
