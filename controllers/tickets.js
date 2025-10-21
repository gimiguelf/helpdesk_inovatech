
import Ticket from '../models/Ticket';

export async function createTicket(data) {
  const ticket = new Ticket(data);
  await ticket.save();
  return ticket;
}

export async function updateTicket(id, data) {
  const ticket = await Ticket.findByIdAndUpdate(id, data, { new: true });
  return ticket;
}

export async function getTicketById(id) {
  return Ticket.findById(id).populate('createdBy assignedTo', 'name email role');
}

export async function listTickets(filter={}) {
  return Ticket.find(filter).populate('createdBy assignedTo', 'name email role').sort({ createdAt: -1 });
}

export async function deleteTicket(id) {
  return Ticket.findByIdAndDelete(id);
}
