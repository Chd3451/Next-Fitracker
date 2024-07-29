// app/api/dashboard-data/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clientesCount = await prisma.cliente.count();
    const clientes = await prisma.cliente.findMany();

    const totalWeight = clientes.reduce((acc, cliente) => acc + cliente.peso, 0);
    const averageWeight = totalWeight / clientesCount;

    const totalMetaPeso = clientes.reduce((acc, cliente) => acc + cliente.metaPeso, 0);
    const averageMetaPeso = totalMetaPeso / clientesCount;

    return NextResponse.json({
      clienteCount: clientesCount,
      averageWeight: averageWeight,
      averageMetaPeso: averageMetaPeso,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
