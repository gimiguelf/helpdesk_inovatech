
import { connect } from '../../../../lib/mongodb';
import * as ticketCtrl from '../../../../controllers/tickets';
import { verifyToken } from '../../../../controllers/auth';

export async function GET(req, { params }) {
  await connect();
  const ticket = await ticketCtrl.getTicketById(params.id);
  if (!ticket) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  return new Response(JSON.stringify(ticket), { status: 200 });
}

export async function PUT(req, { params }) {
  await connect();
  const token = req.headers.get('authorization')?.replace('Bearer ','');
  const verified = verifyToken(token);
  if (!verified) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const body = await req.json();
  // Business rules: only techs can assign/ change status; employee can update own ticket description if open.
  const updated = await ticketCtrl.updateTicket(params.id, body);
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connect();
  const token = req.headers.get('authorization')?.replace('Bearer ','');
  const verified = verifyToken(token);
  if (!verified) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  await ticketCtrl.deleteTicket(params.id);
  return new Response(null, { status: 204 });
}
