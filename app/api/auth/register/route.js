
import { connect } from '../../../../lib/mongodb';
import { register } from '../../../../controllers/auth';

export async function POST(req) {
  await connect();
  try {
    const body = await req.json();
    const { user, token } = await register(body);
    return new Response(JSON.stringify({ user, token }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
