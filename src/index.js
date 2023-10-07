import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';

import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {

    edit: ({ attributes, setAttributes }) => {
		const { backgroundColor, iconColor, style, horAlign } = attributes;
		const blockProps = useBlockProps();

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

		const ALLOWED_BLOCKS = [ 'core/navigation-link', 'core/category', 'core/spacer', 'core/search', 'core/social-links', 'core/loginout' ];
		const TEMPLATE = [ 'core/loginout' ]

        return (
            <div { ...blockProps }>
				<InspectorControls>
					<SelectControl
                            label="Horizontal Menu Alignment"
                            value={ horAlign }
                            options={ [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' },
                                { label: 'Center', value: 'center' },
                            ] }
                            onChange={ ( newHorAlign ) => {
                                setAttributes({ horAlign: newHorAlign });
                            } }
                        />
					<PanelBody title="Button Color" initialOpen={ true }>
						<ColorPicker
							color={iconColor}
							onChangeComplete={(value) => setAttributes({ iconColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` })}
							/>
					</PanelBody>
				</InspectorControls>
				<button class="ws-menu-toggle" aria-expanded="true">
					<svg class="ws-account-icon" 
					 style={{ width:'24px', height: '24px' , stroke: iconColor, fill: iconColor}}
					 viewBox="0 0 24 24">
						<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
					</svg>
				</button>
				<ul class={`ws-menu-content ws-menu-align-${horAlign}${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="false">
                	<InnerBlocks 
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						/>
				</ul>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
		const { backgroundColor, style, iconColor, horAlign } = attributes;

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

        return (
            <div { ...blockProps }>
				<button class="ws-menu-toggle" aria-expanded="false">
					<svg class="ws-account-icon" 
					 style={{ width:'24px', height: '24px' , stroke: iconColor, fill: iconColor}}
					 viewBox="0 0 24 24">
						<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
					</svg>
				</button>
				<ul class={`ws-menu-content ws-menu-align-${horAlign}${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="true">
                	<InnerBlocks.Content />
				</ul>
            </div>
        );
    },
} );