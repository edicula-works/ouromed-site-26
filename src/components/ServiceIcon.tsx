// Ícones dos serviços: uma família pronta (Phosphor, traço regular), no lugar de desenho próprio.
import {
  AmbulanceIcon,
  HardHatIcon,
  JeepIcon,
  ShieldPlusIcon,
  StethoscopeIcon,
  TentIcon,
  WheelchairIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { IconKey } from '@/data/site';

const icons = {
  ambulance: AmbulanceIcon,
  stethoscope: StethoscopeIcon,
  wheelchair: WheelchairIcon,
  tent: TentIcon,
  jeep: JeepIcon,
  shield: ShieldPlusIcon,
  hardhat: HardHatIcon,
};

export function ServiceIcon({ k, className }: { k: IconKey; className?: string }) {
  const Icon = icons[k];
  return <Icon className={className} weight="regular" aria-hidden="true" focusable="false" />;
}
