"""Horizonte da Serra do Curral em linhas: perfis de relevo reais, de oeste para leste, empilhados
do primeiro plano (a cidade, ao norte) ao fundo (a serra e além, ao sul). As linhas de trás somem
atrás das da frente (remoção de linhas ocultas), então o SVG é só traço e pode ser pintado por
máscara CSS, como a textura de curvas de nível.

Fonte: tiles públicos de elevação "Terrarium" da AWS (sem chave).

    uv run --with numpy,pillow,scikit-image python scripts/serra.py
"""

import io
import math
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from skimage import filters, transform

Z = 12
LAT = (-20.03, -19.90)  # sul → norte
LON = (-44.03, -43.83)  # oeste → leste
ROWS = 24  # perfis
W, H = 1600, 600  # viewBox
ANGLE = -30  # graus; põe a crista na horizontal
EXAG = 0.62  # px por metro de altitude (exagero vertical)
OUT = Path(__file__).resolve().parent.parent / "public" / "textura" / "serra-horizonte.svg"


def tile_xy(lat, lon, z):
    n = 2**z
    return (lon + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n


def fetch(z, x, y):
    url = f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
    with urllib.request.urlopen(url, timeout=30) as r:
        a = np.asarray(Image.open(io.BytesIO(r.read())).convert("RGB")).astype(np.float64)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768


def main():
    x0, y0 = tile_xy(LAT[1], LON[0], Z)
    x1, y1 = tile_xy(LAT[0], LON[1], Z)
    tx, ty = range(int(x0), int(x1) + 1), range(int(y0), int(y1) + 1)
    dem = np.vstack([np.hstack([fetch(Z, x, y) for x in tx]) for y in ty])
    dem = dem[int((y0 - ty[0]) * 256) : int((y1 - ty[0]) * 256), int((x0 - tx[0]) * 256) : int((x1 - tx[0]) * 256)]
    dem = filters.gaussian(dem, sigma=3.0, preserve_range=True)
    # A serra corre de sudoeste para nordeste: gira o relevo para que a crista fique na horizontal,
    # vista de frente a partir da cidade (noroeste), e recorta o miolo sem os cantos vazios.
    dem = transform.rotate(dem, ANGLE, resize=False, mode="edge", preserve_range=True)
    hh, ww = dem.shape
    dem = dem[int(hh * 0.2) : int(hh * 0.8), int(ww * 0.12) : int(ww * 0.88)]
    h, w = dem.shape
    base = dem.min()
    print(f"recorte {w}x{h} px, {dem.min():.0f}–{dem.max():.0f} m", file=sys.stderr)

    xs = np.linspace(0, w - 1, 260)
    # linhas do mosaico: 0 = norte (primeiro plano), h-1 = sul (fundo)
    rows = np.linspace(0, h - 1, ROWS)
    sky = np.full(len(xs), np.inf)  # horizonte já desenhado (y de tela; menor = mais alto)
    paths = []
    for i, r in enumerate(rows):  # frente → fundo
        prof = np.interp(xs, np.arange(w), dem[int(r)])
        # o fundo sobe na tela (perspectiva simples): quanto mais ao sul, mais alto o y base
        y_base = H - 8 - (i / (ROWS - 1)) * (H * 0.3)
        y = y_base - (prof - base) * EXAG
        px = xs / (w - 1) * W
        visible = y < sky - 0.5
        seg = []
        for j in range(len(xs)):
            if visible[j]:
                seg.append(f"{px[j]:.0f},{y[j]:.0f}")
            elif seg:
                if len(seg) > 3:
                    paths.append("M" + "L".join(seg))
                seg = []
        if len(seg) > 3:
            paths.append("M" + "L".join(seg))
        sky = np.minimum(sky, y)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" '
        f'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke">'
        f"<!-- Serra do Curral e sul de BH: {ROWS} perfis de relevo reais (lat {LAT}, lon {LON}), "
        f"exagero vertical. Dados: AWS Terrain Tiles (Terrarium). -->"
        + "".join(f'<path d="{d}"/>' for d in paths)
        + "</svg>\n"
    )
    OUT.write_text(svg)
    print(f"{len(paths)} traços, {len(svg) / 1024:.0f} KB → {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
