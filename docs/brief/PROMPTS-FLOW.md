# Prompts para o Google Flow — imagens e vídeos do site da Ouromed

Cada imagem tem um slot no site (`src/data/site.ts` → `media`). Gere, escolha a melhor, salve em
`public/midia/<chave>.jpg` (ou `.mp4` + `.jpg` do primeiro quadro) e avise: o slot passa a mostrar o
arquivo com o tratamento do site (cor contida, granulação fina).

## Regras para não ficar com cara de IA

- **Sem texto, sem logo, sem placa legível, sem número na viatura.** A IA escreve letras tortas, e
  isso denuncia na hora. Se aparecer, recorte ou gere de novo.
- **Sem rosto em close.** Pessoas de costas, de perfil, desfocadas ou só mãos e uniforme.
- **Viatura branca genérica**, tipo van (Sprinter/Master/Ducato), sem cruz vermelha gigante e
  sem faixas coloridas inventadas. Uma faixa lateral discreta é aceitável.
- **Luz real**: entardecer, luz de janela, luz fria de interior. Nada de brilho "cinematográfico"
  exagerado, lens flare ou fumaça.
- **Câmera parada ou movimento lento** no vídeo. Nada de drone acrobático.
- **Mesma família de cor** em todas: tons neutros e frios, com um toque quente (dourado do sol ou
  da luz interna). Combina com o azul-marinho e o dourado da marca.
- Use as suas **fotos de referência** (ambulâncias reais e interiores) como imagem de referência no
  Flow sempre que possível: o resultado fica mais crível do que só texto.

Estilo comum (cole no fim de cada prompt):

> Photorealistic documentary photography, 35mm lens, natural light, muted cool tones with a warm
> golden accent, shallow depth of field, subtle film grain, no text, no logos, no readable signs,
> no license plates, no faces in close-up.

---

## 1. `hero` — vídeo do topo (6–8 s, em loop)

**Proporção:** vertical 4:5 para o desktop (coluna da direita) e uma versão 16:10 para o celular.

> A white modern ambulance van (Mercedes Sprinter style, no markings, no text) driving slowly along
> a wide urban avenue in Belo Horizonte, Brazil, at golden hour. Hills and apartment buildings
> softly out of focus in the background. Camera static on the sidewalk, the van enters from the left
> and passes through frame. Warm sunset light reflecting on the side of the van, light traffic,
> calm atmosphere, no siren lights flashing. Seamless loop.

Em português (se preferir):

> Ambulância branca tipo van, sem nenhuma inscrição, passando devagar por uma avenida larga de Belo
> Horizonte ao entardecer. Montanhas e prédios desfocados ao fundo. Câmera parada na calçada; a van
> entra pela esquerda e atravessa o quadro. Luz dourada do pôr do sol na lateral, trânsito leve,
> clima calmo, sem sirene ligada. Loop contínuo.

## 2. `uti-interior` — interior da UTI móvel (foto, 3:2)

> Interior of a modern ICU ambulance seen from the rear doors: a stretcher with clean white sheets in
> the center, a patient monitor mounted on the wall, a mechanical ventilator, oxygen cylinders
> secured in brackets, cabinets with medical supplies, cool white LED ceiling light. Clean, organized,
> clinical, no people. No text or labels on equipment.

## 3. `remocao` — maca entrando na viatura (foto, 4:3)

> Two paramedics in navy blue uniforms loading a stretcher into the rear of a white ambulance van,
> seen from behind and the side, faces not visible. Hospital entrance softly out of focus in the
> background, overcast daylight. Hands on the stretcher rails, careful movement.

## 4. `uti` — viatura de perfil (foto, 4:3)

> Side view of a white ICU ambulance van parked in a clean, empty lot at dusk, no markings, no text.
> Soft warm light from the left, long shadows, minimal background, the vehicle sharp and centered.

## 5. `domiciliar` — atendimento em casa (foto, 4:3)

> A nurse in a navy blue uniform measuring the blood pressure of an elderly woman sitting in an
> armchair in a bright Brazilian living room, window light, seen from over the nurse's shoulder,
> faces not in close-up, warm and calm.

## 6. `locacao` — 4×4 em mineração (foto, 4:3)

> A white 4x4 ambulance pickup on a red dirt road inside an iron ore mining area in Minas Gerais,
> large terraced mine slopes in the background, late afternoon light, dust in the air, no text.

## 7. `eventos` — equipe em evento (foto, 4:3)

> A white ambulance van parked at the edge of an outdoor festival, a paramedic in a navy uniform
> standing next to the open side door, seen from behind, crowd and stage lights blurred in the
> background, early evening.

## 8. `protegida` — área protegida em empresa (foto, 4:3)

> A white ambulance van on standby at the entrance of a modern corporate building in Belo Horizonte,
> glass facade, morning light, nobody in the foreground, calm and orderly.

## 9. `ambulatorios` — ambulatório em obra (foto, 4:3)

> A small clean medical room set up inside a container at a construction site: a stretcher, a
> medicine cabinet, a defibrillator on the wall, a hard hat on the table, daylight through the
> window, no people, no text.

## 10–13. "Como funciona" (fotos, 4:3)

- `central`: *A dispatcher wearing a headset at a desk with two monitors in a dimly lit operations
  room, seen from behind, screens showing abstract map shapes without readable text.*
- `triagem`: *A doctor wearing a headset taking notes during a phone call, side view, face turned
  away, warm desk lamp.*
- `equipe`: *Paramedics in navy uniforms closing the rear doors of a white ambulance van, seen from
  behind, night, warm street light.*
- `destino`: *A white ambulance van arriving at a hospital emergency entrance at night, covered
  drop-off area, soft lights, no readable signs.*

---

**Entrega:** para o vídeo, MP4 H.264, 1080 px no lado maior, sem áudio, até ~2 MB (eu comprimo se
vier maior), mais o primeiro quadro em JPG. Para as fotos, JPG com pelo menos 1600 px no lado maior.
