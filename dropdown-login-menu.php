<?php
/**
 * Plugin Name:       Dropdown Login Menu
 * Plugin URI:        https://github.com/willsides/dropdown-login-menu
 * Description:       A login menu that drops down from an account icon
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Will Sides
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dropdown-login-menu
 *
 * @package           willsides
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function willsides_dropdown_login_menu_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'willsides_dropdown_login_menu_block_init' );
