import axios from "axios";

export const criarPedidoDePlano = async ({
  value,
  profissionalId,
  pacote,
}: {
  value: string;
  profissionalId: number;
  pacote: string;
}) => {
  const response = await axios.post("https://api.techmanlight.pt/paypal/create-order", {
    value,
    profissionalId,
    pacote,
  });

  return response.data;
};
