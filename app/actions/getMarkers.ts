
'use server';

import  prisma  from '@/lib/prisma';

export async function getMarkers() {
  try {
    const markers = await prisma.marker.findMany();
    return markers;
  } catch (error) {
    console.error('Error fetching markers:', error);
    return [];
  }
}
