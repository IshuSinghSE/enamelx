"use client"

import { useState, useRef } from "react"
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle } from "lucide-react"
import { useToast } from "@/components/hooks/use-toast"

export function SupportModal() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)    // This would typically send data to an API endpoint
    // Simulating API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)
      setTitle("")
      setDescription("")
      
      toast({
        title: "Support request submitted",
        description: "Thank you for your feedback. We'll get back to you soon.",
        variant: "default"
      })
      
      // Automatically close the sheet
      if (closeRef.current) {
        closeRef.current.click();
      }
    }, 1000)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" aria-label="Support"> */}
        <HelpCircle className="h-7 w-7 m-2 text-muted-foreground hover:text-primary bg-stone-900 transition-colors" aria-label="Support" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Report an Issue</SheetTitle>
          <SheetDescription>
            Submit a bug report, feature request or any issue you&apos;re experiencing.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input 
              id="title" 
              placeholder="Brief description of the issue" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea 
              id="description" 
              placeholder="Please provide details of your issue or suggestion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>
          <SheetFooter className="pt-2">
            <SheetClose asChild>
              <Button type="button" variant="outline" ref={closeRef}>Cancel</Button>
            </SheetClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
