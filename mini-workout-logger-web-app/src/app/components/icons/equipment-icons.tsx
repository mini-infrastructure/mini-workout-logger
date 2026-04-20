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

export const BackIcon       = makeEquipmentIcon('/Icons/Back.svg');
export const BikeIcon       = makeEquipmentIcon('/Icons/Bike.svg');
export const HitIcon        = makeEquipmentIcon('/Icons/Hit.svg');
export const PilatesIcon    = makeEquipmentIcon('/Icons/Pilates.svg');
export const StrechingIcon  = makeEquipmentIcon('/Icons/Streching.svg');
export const WalkIcon       = makeEquipmentIcon('/Icons/Walk.svg');
export const YogaIcon       = makeEquipmentIcon('/Icons/Yoga.svg');
export const PullIcon       = makeEquipmentIcon('/Icons/Pull.svg');
export const PushIcon       = makeEquipmentIcon('/Icons/Push.svg');
export const RotateIcon     = makeEquipmentIcon('/Icons/Rotate.svg');
