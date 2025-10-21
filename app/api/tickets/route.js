
import { connect } from '../../../lib/mongodb';
import * as ticketCtrl from '../../../controllers/tickets';
import { verifyToken } from '../../../controllers/auth';
import Ticket from '../../../models/Ticket';

export async function GET(req) {
  await connect();
  const url = new URL(req.url);
  // optional query params: my=true to get only user's tickets, status=, priority=
  const token = req.headers.get('authorization')?.replace('Bearer ','');
  const verified = verifyToken(token);
  const q = Object.fromEntries(url.searchParams.entries());
  const filter = {};
  if (q.status) filter.status = q.status;
  if (q.priority) filter.priority = q.priority;
  if (q.my === 'true' && verified) filter.createdBy = verified.id;
  const tickets = await ticketCtrl.listTickets(filter);
  return new Response(JSON.stringify(tickets), { status: 200 });
}

export async function POST(req) {
  await connect();
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ','');
    const verified = verifyToken(token);
    if (!verified) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    const body = await req.json();
    body.createdBy = verified.id;
    const ticket = await ticketCtrl.createTicket(body);
    return new Response(JSON.stringify(ticket), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
