import * as turf from "@turf/turf";

export function generatePolygonSpiral(latlngs, spacingMeters = 1) {
  if (!latlngs || latlngs.length < 4) return [];

  const polyCoords = latlngs.map((p) => [p[1], p[0]]);
  polyCoords.push([latlngs[0][1], latlngs[0][0]]);

  let turfPoly = turf.polygon([polyCoords]);
  let path = [];
  let lastEntry = null;
  let loops = 0;
  const maxLoops = 1000;

  while (loops < maxLoops) {
    const coords = turfPoly?.geometry?.coordinates?.[0];
    if (!coords || coords.length < 4) break;

    const loop = coords.map((c) => [c[1], c[0]]);

    if (lastEntry) {
      let bestIdx = 0;
      let bestD = Infinity;

      for (let i = 0; i < loop.length; i++) {
        const d = turf.distance(
          turf.point([lastEntry[1], lastEntry[0]]),
          turf.point([loop[i][1], loop[i][0]]),
          { units: "meters" }
        );

        if (d < bestD) {
          bestD = d;
          bestIdx = i;
        }
      }

      path.push(loop[bestIdx]);

      const rotated = loop.slice(bestIdx).concat(loop.slice(0, bestIdx));
      rotated.forEach((p) => path.push(p));
      lastEntry = rotated[rotated.length - 1];
    } else {
      loop.forEach((p) => path.push(p));
      lastEntry = loop[loop.length - 1];
    }

    turfPoly = turf.buffer(turfPoly, -spacingMeters, { units: "meters" });

    if (!turfPoly || !turfPoly.geometry || turfPoly.geometry.coordinates.length === 0) {
      break;
    }

    loops++;
  }

  return path;
}

export function calculateDistance(path) {
  let dist = 0;

  for (let i = 0; i < path.length - 1; i++) {
    dist += turf.distance(
      turf.point([path[i][1], path[i][0]]),
      turf.point([path[i + 1][1], path[i + 1][0]]),
      { units: "meters" }
    );
  }

  return dist;
}