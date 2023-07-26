interface RequestProps {
  id: string
  user_id: string
}

export class DevolutionRentalUseCase {
  async execute({ id, user_id }: RequestProps) {}
}
