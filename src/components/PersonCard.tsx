import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PersonCardProps {
  name: string
  role: string
  description?: string
  image?: string
  className?: string
}

export function PersonCard({
  name,
  role,
  description,
  image,
  className,
}: PersonCardProps) {
  return (
    <Card
      className={cn(
        'p-6 text-center shadow-glass hover:shadow-elegant transition-smooth group bg-gray-50',
        className
      )}
    >
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden group-hover:scale-110 transition-smooth">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1 text-primary">{name}</h3>
      <p
        className="text-primary text-sm mb-3 font-medium"
        style={{ color: 'hsl(199 100% 35%)' }}
      >
        {role}
      </p>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </Card>
  )
}
