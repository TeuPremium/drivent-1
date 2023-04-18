async function findPayment(ticketId: string[]) {
  try {
    const id = parseInt(ticketId[0]);
    console.log(id);
    return id;
  } catch (error) {}
}

const paymentService = {
  findPayment,
};
export default paymentService;
