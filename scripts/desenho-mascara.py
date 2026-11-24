"""Converte um desenho em traço (preto sobre branco) numa máscara: traço opaco, fundo transparente.
O site pinta a máscara pela cor do lugar (CSS mask-image), como a textura de curvas de nível.

    uv run --with numpy,pillow python scripts/desenho-mascara.py entrada.png saida.png [largura]
"""

import sys

import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
img = Image.open(src).convert("L")
if img.width > width:
    img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
g = np.asarray(img).astype(np.float32) / 255
alpha = np.clip((1 - g) * 1.6, 0, 1)  # traço cheio, antisserrilhado preservado
alpha[alpha < 0.08] = 0
# corta o céu vazio de cima (a máscara se ancora embaixo)
rows = np.where(alpha.max(axis=1) > 0.2)[0]
alpha = alpha[max(rows[0] - 8, 0) :]
a8 = (alpha * 255).astype(np.uint8)
rgba = np.zeros((*a8.shape, 4), np.uint8)
rgba[..., 3] = a8
Image.fromarray(rgba, "RGBA").quantize(colors=16, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
print(out, Image.open(out).size)
