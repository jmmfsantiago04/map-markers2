import GoogleMapWithMarkers from '@/components/GoogleMapWithMarkers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function MarkerMapPage() {
  const markers = await prisma.marker.findMany();

  return (
    <div>
      <h1>Interactive Map with Marker List</h1>
      <GoogleMapWithMarkers markers={markers} />
    </div>
  );
}
