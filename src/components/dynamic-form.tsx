import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"
import { Option } from "@/types/types"
import { api } from "@/lib/axios"

interface DynamicFormProps extends React.ComponentProps<"form"> {
  changeState?: Dispatch<SetStateAction<CreatePollResponse>>
}

export default function DynamicForm({
  className,
  changeState,
}: DynamicFormProps) {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState<Option[]>([])

  function handleFormChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    let data = [...options]
    data[index].value = event.target.value
    setOptions(data)
  }

  function addField(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()

    if (options.length > 4) {
      toast.error("Limite de opções atingido.", {
        duration: 1000,
      })
      return
    }

    let newfield: Option = { value: "" }

    setOptions([...options, newfield])
  }

  function removeField(
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()

    let data = [...options]
    data.splice(index, 1)
    setOptions(data)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const optionsArray = options.map((option) => {
      return option.value
    })

    const response = await api.post<CreatePollResponse>(
      "http://localhost:3333/polls",
      {
        title,
        options: optionsArray,
      }
    )

    const { data } = response

    if (data.success) {
      if (changeState) {
        changeState({ success: true, pollId: data.pollId })
        console.log("rodou")
      }
      toast("Enquete criada com sucesso!")
    }
  }

  useEffect(() => {
    const firstValues: Option[] = [{ value: "" }, { value: "" }]
    setOptions(firstValues)
  }, [])

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          placeholder="Escolha um título..."
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      </div>

      {options.map((option, idx) => {
        return (
          <div className="grid gap-2" key={idx}>
            <Label htmlFor={`option${idx}`}>Opção {idx + 1}</Label>
            <div className="flex space-x-2">
              <Input
                type="text"
                id={`option${idx}`}
                placeholder="Digite aqui..."
                value={option.value}
                onChange={(e) => {
                  handleFormChange(idx, e)
                }}
              />
              {!(idx === 0 || idx === 1) && (
                <Button
                  size="icon"
                  onClick={(e) => {
                    removeField(idx, e)
                  }}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
        )
      })}

      <Button
        className="flex gap-4 w-fit"
        onClick={(e) => {
          addField(e)
        }}
      >
        Adicionar opção <Plus fill="white" />
      </Button>

      <Button type="submit">Criar enquete</Button>
    </form>
  )
}
