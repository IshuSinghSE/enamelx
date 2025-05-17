'use client'

import DiseasePanel, { Disease } from '@/components/dashboard/DiseasePanel'
import ImageViewer from '@/components/dashboard/ImageViewer'
import { useToast } from '@/components/hooks/use-toast'
import { ChartConfig } from '@/components/ui/chart'
import { useState, useEffect } from 'react'

const DashboardPage = () => {

  // Initial diseases with default values 
  // and colors for the chart
  const initialDiseases: Disease[] = [
    { id: 'root_piece', label: 'Root Piece', count: 0, color: '#a02b5f' },
    { id: 'crown', label: 'Crown', count: 0, color: '#41c8ff' },
    {
      id: 'root_canal_treatment',
      label: 'Root Canal Treatment',
      count: 0,
      color: '#14c486',
    },
    {
      id: 'periapical_lesion',
      label: 'Periapical lesion',
      count: 0,
      color: '#fcc052',
    },
    { id: 'caries', label: 'Caries', count: 0, color: '#ec0f45' },
    { id: 'filling', label: 'Filling', count: 0, color: '#ee6b3d' },
  ]

  const [diseases, setDiseases] = useState<Disease[]>(initialDiseases)
  const [selectedDiseases, setSelectedDiseases] = useState<Disease[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [predictions, setPredictions] = useState<any>({})
  const [confidenceThreshold, setConfidenceThreshold] = useState(50) // Default 50%
  const { toast } = useToast()

  const resetDiseasesToInitial = () => {
    setDiseases(initialDiseases)
  }

  const resetSelectedDiseases = () => {
    setSelectedDiseases([])
  }

  const fetchPredictions = async (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`http://127.0.0.1:5000/predict`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      // Store the raw predictions
      setPredictions(data.prediction)
      
      // Update disease counts initially
      updateDiseaseCounts(data.prediction, confidenceThreshold)
      
      toast({ description: 'Image successfully analyzed' })
    } catch (error) {
      toast({ description: 'Error analyzing image', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Update disease counts when confidence threshold changes
  useEffect(() => {
    if (Object.keys(predictions).length > 0) {
      updateDiseaseCounts(predictions, confidenceThreshold)
    }
  }, [confidenceThreshold, predictions])
  
  // Function to update disease counts based on confidence threshold
  const updateDiseaseCounts = (predictionData: any, threshold: number) => {
    const updatedDiseases = diseases.map((disease) => {
      const diseasePredictions = predictionData[disease.id] || []
      // Filter predictions based on confidence threshold
      const filteredPredictions = diseasePredictions.filter(
        (prediction: any) => Math.round(prediction.confidence * 100) >= threshold
      )
      return { ...disease, count: filteredPredictions.length }
    })
    
    setDiseases(updatedDiseases)
  }

  const chartData = diseases.map((disease) => ({
    disease: disease.id,
    visitors: disease.count,
    fill: disease.color,
  }))

  const chartConfig = {
    visitors: {
      label: 'count',
    },
    root_piece: {
      label: 'Root Piece',
      color: '#a02b5f',
    },
    crown: {
      label: 'Crown',
      color: '#41c8ff',
    },
    root_canal_treatment: {
      label: 'Root Canal',
      color: '#14c486',
    },
    periapical_lesion: {
      label: 'Periapical lesion',
      color: '#fcc052',
    },
    caries: {
      label: 'Caries',
      color: '#ec0f45',
    },
    filling: {
      label: 'Filling',
      color: '#ee6b3d',
    },
  } satisfies ChartConfig

  return (
    <section className="h-[calc(100vh - 48px)] flex w-full flex-col bg-muted lg:flex-row lg:overflow-hidden">
      <ImageViewer
        selectedDiseases={selectedDiseases}
        setHasImage={setHasImage}
        predictions={predictions}
        fetchPredictions={fetchPredictions}
        isLoading={isLoading}
        setSelectedDiseases={setSelectedDiseases}
        resetDiseasesToInitial={resetDiseasesToInitial}
        resetSelectedDiseases={resetSelectedDiseases}
        confidenceThreshold={confidenceThreshold}
      />
      {/* Right Panel - Options */}
      <DiseasePanel
        diseases={diseases}
        setSelectedDiseases={setSelectedDiseases}
        isLoading={isLoading}
        hasImage={hasImage}
        chartData={chartData}
        chartConfig={chartConfig}
        resetSelectedDiseases={resetSelectedDiseases}
        resetDiseasesToInitial={resetDiseasesToInitial}
        confidenceThreshold={confidenceThreshold}
        setConfidenceThreshold={setConfidenceThreshold}
      />
    </section>
  )
}

export default DashboardPage
