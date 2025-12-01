interface Nl2BrProps {
  text: string
  className?: string
}

export function Nl2Br({ text, className }: Nl2BrProps) {
  return (
    <span className={className}>
      {text.split('\n').map((line, idx, arr) => (
        <span key={idx}>
          {line}
          {idx < arr.length - 1 && <br />}
        </span>
      ))}
    </span>
  )
}

export default Nl2Br
