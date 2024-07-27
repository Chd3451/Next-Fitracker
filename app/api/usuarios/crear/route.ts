import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { nombre, apellido, correo, contrasena } = await req.json();

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !apellido || !correo || !contrasena) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        contrasena: hashedPassword,
      },
    });

    // Devolver la respuesta con el usuario creado
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
