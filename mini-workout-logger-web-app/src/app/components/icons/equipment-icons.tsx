import type { IconBaseProps } from 'react-icons';

const makeEquipmentIcon = (src: string) =>
    ({ size = 14 }: IconBaseProps) => (
        <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            flexShrink: 0,
            backgroundColor: 'var(--color-white)',
            maskImage: `url(${src})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
        }} />
    );

export const BarbellIcon    = makeEquipmentIcon('/Icons/Barbell.svg');
export const DumbbellIcon   = makeEquipmentIcon('/Icons/Dumbell.svg');
export const KettlebellIcon = makeEquipmentIcon('/Icons/Kettlebell.svg');
export const MachineIcon    = makeEquipmentIcon('/Icons/Machine.svg');
export const PlateIcon      = makeEquipmentIcon('/Icons/Plate.svg');
