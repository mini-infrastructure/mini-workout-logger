import {css} from '@emotion/react';
import {AppTheme} from './theme';

const globalStyles = (theme: AppTheme) => css({
    ':root': {
        /* Layout */
        '--color-bg':         theme.colors.bg,
        '--color-container1': theme.colors.container1,
        '--color-container2': theme.colors.container2,
        '--color-border':     theme.colors.border,

        /* Text */
        '--color-text':  theme.colors.text,
        '--color-white': theme.colors.white,
        '--color-black': theme.colors.black,

        /* Accent — solid colors */
        '--color-blue':        theme.colors.blue,
        '--color-red':         theme.colors.red,
        '--color-yellow':      theme.colors.yellow,
        '--color-green':       theme.colors.green,
        '--color-pink':        theme.colors.pink,
        '--color-purple':      theme.colors.purple,
        '--color-orange':      theme.colors.orange,
        '--color-gray':        theme.colors.gray,

        '--color-blue-border':   theme.colors.blueBorder,
        '--color-red-border':    theme.colors.redBorder,
        '--color-yellow-border': theme.colors.yellowBorder,
        '--color-green-border':  theme.colors.greenBorder,
        '--color-pink-border':   theme.colors.pinkBorder,
        '--color-purple-border': theme.colors.purpleBorder,
        '--color-orange-border': theme.colors.orangeBorder,
        '--color-gray-border':   theme.colors.grayBorder,

        /* Typography */
        '--font-primary':   theme.fonts.primary,
        '--font-secondary': theme.fonts.secondary,
        '--font-number':    theme.fonts.number,

        /* Font sizes */
        '--size-small':      theme.fontSizes.small,
        '--size-medium':     theme.fontSizes.medium,
        '--size-input-text': theme.fontSizes.inputText,
        '--size-large':      theme.fontSizes.large,
        '--size-icon-sm':    theme.fontSizes.iconSm,
        '--size-larger':     theme.fontSizes.larger,
        '--size-xl':         theme.fontSizes.x_large,
        '--size-xxl':        theme.fontSizes.xx_large,
        '--size-xxxl':       theme.fontSizes.xxx_large,

        /* Base sizes */
        '--base-size-4':   theme.baseSize[4],
        '--base-size-8':   theme.baseSize[8],
        '--base-size-12':  theme.baseSize[12],
        '--base-size-16':  theme.baseSize[16],
        '--base-size-18':  theme.baseSize[18],
        '--base-size-24':  theme.baseSize[24],
        '--base-size-32':  theme.baseSize[32],
        '--base-size-48':  theme.baseSize[48],
        '--base-size-64':  theme.baseSize[64],
        '--base-size-96':  theme.baseSize[96],
        '--base-size-260': theme.baseSize[260],

        /* Border radius */
        '--borderRadius-small':  theme.borderRadius.small,
        '--borderRadius-medium': theme.borderRadius.medium,
        '--borderRadius-large':  theme.borderRadius.large,
        '--borderRadius-xlarge': theme.borderRadius.xlarge,
        '--borderRadius-full':   theme.borderRadius.full,

        /* Border width */
        '--borderWidth-thin':   theme.borderWidth.thin,
        '--borderWidth-medium': theme.borderWidth.medium,

        /* Z-index */
        '--base-zIndex-1':       theme.zIndex[1],
        '--base-zIndex-2':       theme.zIndex[2],
        '--base-zIndex-10':      theme.zIndex[10],
        '--base-zIndex-overlay': theme.zIndex.overlay,

        /* Stack gaps */
        '--stack-gap-micro':     theme.stack.gap.micro,
        '--stack-gap-nano':      theme.stack.gap.nano,
        '--stack-gap-tiny':      theme.stack.gap.tiny,
        '--stack-gap-condensed': theme.stack.gap.condensed,
        '--stack-gap-normal':    theme.stack.gap.normal,
        '--stack-gap-spacious':  theme.stack.gap.spacious,

        /* Overlay */
        '--overlay-padding-condensed': theme.overlay.padding.condensed,
        '--overlay-padding-normal':    theme.overlay.padding.normal,
        '--overlay-borderRadius':      theme.overlay.borderRadius,
        '--overlay-minWidth':          theme.overlay.minWidth,
        '--overlay-maxHeight':         theme.overlay.maxHeight,

        /* Control */
        '--control-small-paddingBlock':  theme.control.small.paddingBlock,
        '--control-small-paddingInline': theme.control.small.paddingInline,
        '--control-small-gap':          theme.control.small.gap,
        '--control-small-size':         theme.control.small.size,
        '--control-small-iconSize':     theme.control.small.iconSize,
        '--control-medium-paddingBlock':  theme.control.medium.paddingBlock,
        '--control-medium-paddingInline': theme.control.medium.paddingInline,
        '--control-medium-gap':           theme.control.medium.gap,
        '--control-minWidth':             theme.control.minWidth,

        /* Layout */
        '--layout-sidebar-minWidth': theme.layout.sidebar.minWidth,

        /* Shadows */
        '--shadow-normal': theme.shadow.normal,
    } as any,

    body: {
        margin: 0,
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-primary)',
        fontSize: 'var(--size-medium)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
});

export default globalStyles;
