import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { correo, contrasena } = await req.json();

    // Validar que ambos campos estén presentes
    if (!correo || !contrasena) {
      return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
    }

    // Buscar el usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Asegurarse de que JWT_SECRET está definido
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no está definido');
    }

    // Crear un token JWT
    const token = jwt.sign({ userId: usuario.id }, jwtSecret, {
      expiresIn: '1h',
    });

    // Devolver la respuesta con el token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
