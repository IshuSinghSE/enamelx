'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import ImageViewer from '@/components/dashboard/ImageViewer'
import { toast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

const DiseaseSchema = z.object({
  id: z.string(),
  label: z.string(),
  count: z.number(),
  color: z.string(),
})

const FormSchema = z.object({
  items: z.array(z.string()),
})

const DiseasesSchema = z.array(DiseaseSchema)

const DashboardPage = () => {
  const diseases = [
    { id: 'caries', label: 'caries', count: 0, color: 'purple' },
    {
      id: 'periapical_radiolucency',
      label: 'periapical radiolucency',
      count: 0,
      color: 'blue',
    },
    { id: 'calculus', label: 'calculus', count: 0, color: 'green' },
    {
      id: 'notable_margin',
      label: 'notable margin',
      count: 0,
      color: 'violet',
    },
    // Add more diseases as needed
  ]
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <section className="flex h-[calc(100vh - 48px)] w-full flex-col bg-muted lg:flex-row lg:overflow-hidden">
      <ImageViewer />
      {/* Right Panel - Options */}
      <div className="w-full px-10 md:px-4 order-3 lg:flex md:w-64 flex-col items-start justify-start gap-4 border-l border-secondary bg-gradient-to-l from-neutral-800 to-stone-800 text-foreground p-4 lg:order-3 lg:h-[calc(100vh-64px)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-md font-sora">AI Viewer</FormLabel>
                    <FormDescription>
                      Select to highlight the diseases in the image
                    </FormDescription>
                  </div>
                  {diseases.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal capitalize">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default DashboardPage
