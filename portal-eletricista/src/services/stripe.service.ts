import axios from "axios";

export const criarPedidoDePlanoStripe = async ({
  value,
  profissionalId,
  pacote,
}: {
  value: string; 
  profissionalId: number;
  pacote: string;
}) => {
  const response = await axios.post(
    "https://api.techmanlight.pt/stripe/checkout",
    {
      valor: value,
      profissionalId,
      pacote,
    }
  );

  return response.data; 
};
