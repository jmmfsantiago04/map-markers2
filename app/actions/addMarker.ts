'use server';

import  prisma  from '@/lib/prisma';

export async function addMarker(data: FormData) {
  const title = data.get('title')?.toString() || '';
  const description = data.get('description')?.toString() || '';
  const lat = parseFloat(data.get('lat')?.toString() || '0');
  const lng = parseFloat(data.get('lng')?.toString() || '0');

  if (!title || !description || isNaN(lat) || isNaN(lng)) {
    throw new Error('Invalid input');
  }

  try {
    await prisma.marker.create({
      data: {
        title,
        description,
        lat,
        lng,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding marker:', error);
    return { success: false };
  }
}
