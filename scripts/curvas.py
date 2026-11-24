"""Curvas de nível reais da Serra do Curral e do sul de Belo Horizonte, para a textura do site.

Fonte: tiles públicos de elevação "Terrarium" da AWS (s3://elevation-tiles-prod, sem chave;
dados SRTM/3DEP agregados pela Mapzen). Gera public/textura/serra-do-curral.svg só com <path> de
traço (sem preenchimento), para ser colorido e esmaecido por CSS.

    uv run --with numpy,pillow,scikit-image python scripts/curvas.py
"""

import io
import math
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from skimage import filters, measure

Z = 13  # ~19 m por pixel no equador
LAT = (-19.99, -19.92)
LON = (-43.99, -43.86)
STEP = 25  # metros entre curvas (15 m passava de 180 KB)
OUT = Path(__file__).resolve().parent.parent / "public" / "textura" / "serra-do-curral.svg"


def tile_xy(lat, lon, z):
    n = 2**z
    x = (lon + 180) / 360 * n
    y = (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def fetch(z, x, y):
    url = f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
    with urllib.request.urlopen(url, timeout=30) as r:
        img = Image.open(io.BytesIO(r.read())).convert("RGB")
    a = np.asarray(img).astype(np.float64)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768


def smooth(c):
    """Curva suave pelos pontos médios (quadráticas): mesmo número de pontos, sem quinas."""
    p = [(x, y) for y, x in c]
    f = lambda v: f"{v:.0f}"
    mid = lambda a, b: ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
    m0 = mid(p[0], p[1])
    d = [f"M{f(p[0][0])},{f(p[0][1])}L{f(m0[0])},{f(m0[1])}"]
    for i in range(1, len(p) - 1):
        m = mid(p[i], p[i + 1])
        d.append(f"Q{f(p[i][0])},{f(p[i][1])} {f(m[0])},{f(m[1])}")
    d.append(f"L{f(p[-1][0])},{f(p[-1][1])}")
    return "".join(d)


def main():
    x0, y0 = tile_xy(LAT[1], LON[0], Z)  # canto noroeste
    x1, y1 = tile_xy(LAT[0], LON[1], Z)  # canto sudeste
    tx = range(int(x0), int(x1) + 1)
    ty = range(int(y0), int(y1) + 1)
    rows = [np.hstack([fetch(Z, x, y) for x in tx]) for y in ty]
    dem = np.vstack(rows)
    # recorte exato da caixa, em pixels do mosaico
    px0, py0 = int((x0 - tx[0]) * 256), int((y0 - ty[0]) * 256)
    px1, py1 = int((x1 - tx[0]) * 256), int((y1 - ty[0]) * 256)
    dem = dem[py0:py1, px0:px1]
    # suaviza o ruído do modelo de elevação: curvas fluidas, não serrilhadas
    dem = filters.gaussian(dem, sigma=2.8, preserve_range=True)
    h, w = dem.shape
    lo, hi = math.ceil(dem.min() / STEP) * STEP, math.floor(dem.max() / STEP) * STEP
    print(f"recorte {w}x{h} px, altitude {dem.min():.0f}–{dem.max():.0f} m", file=sys.stderr)

    scale = 1600 / w  # viewBox com 1600 de largura
    paths = []
    for level in range(int(lo), int(hi) + 1, STEP):
        for c in measure.find_contours(dem, level):
            if len(c) < 60:  # descarta ruído
                continue
            c = measure.approximate_polygon(c, tolerance=2.0)
            paths.append(f'<path d="{smooth(c * scale)}"/>')
    vb_h = round(h * scale)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 {vb_h}" '
        f'preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" '
        f'stroke-width="1.5" vector-effect="non-scaling-stroke">'
        f"<!-- Curvas de nível a cada {STEP} m: Serra do Curral e sul de Belo Horizonte "
        f"(lat {LAT}, lon {LON}). Dados: AWS Terrain Tiles (Terrarium). -->"
        + "".join(paths)
        + "</svg>\n"
    )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(svg)
    print(f"{len(paths)} curvas, {len(svg) / 1024:.0f} KB → {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
