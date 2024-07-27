import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { correo, contrasena, nombre, apellido, direccion, telefono, fechaNacimiento, rol } = req.body;

    try {
      const usuarioActualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          correo,
          contrasena,
          nombre,
          apellido,
          direccion,
          telefono,
          fechaNacimiento: new Date(fechaNacimiento),
          rol,
        },
      });
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando usuario' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
