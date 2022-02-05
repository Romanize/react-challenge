import { Heading } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const UserForm: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Redirect if id doesnt match any user
  useEffect(() => {
    if (id === 'other') {
      navigate('/404');
    }
  }, [id])

  return (
    <Heading as="h3" size="2xl">{id}</Heading>
  )
}