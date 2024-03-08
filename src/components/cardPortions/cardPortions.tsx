import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CardProps {
  title: string
  content: number
}

export default function CardPortion({ title, content }: CardProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(content)}
        </p>
      </CardContent>
    </Card>
  )
}
