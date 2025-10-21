
/**
 * Seed script to create demo users and tickets.
 * Run with: npm run seed
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User').default || require('../models/User');
const Ticket = require('../models/Ticket').default || require('../models/Ticket');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sgm_helpdesk';

async function run() {
  await mongoose.connect(MONGODB_URI);
  await User.deleteMany({});
  await Ticket.deleteMany({});
  const pass = await bcrypt.hash('password123', 10);
  const tech = await User.create({ name: 'Técnico Demo', email: 'tech@inovatech.com', passwordHash: pass, role: 'tech' });
  const emp = await User.create({ name: 'Funcionário Demo', email: 'employee@inovatech.com', passwordHash: pass, role: 'employee' });
  await Ticket.create({ title: 'Não consigo acessar VPN', description: 'Ao tentar conectar...', status: 'Aberto', priority: 'Alta', createdBy: emp._id, assignedTo: tech._id });
  await Ticket.create({ title: 'Computador lento', description: 'Sistema demora pra iniciar', status: 'Aberto', priority: 'Média', createdBy: emp._id });
  console.log('Seeded demo users and tickets.');
  process.exit(0);
}
run().catch(err=>{ console.error(err); process.exit(1); });
