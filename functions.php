<?php

define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/modules/inc/' );
require_once dirname( __FILE__ ) . '/modules/inc/options-framework.php';
$optionsfile = locate_template( 'options.php' );
load_template( $optionsfile );
add_action( 'optionsframework_custom_scripts', 'optionsframework_custom_scripts' );
require_once get_stylesheet_directory() . '/modules/fun-panel.php';  
require_once get_stylesheet_directory() . '/modules/fun-opzui.php';    
require_once get_stylesheet_directory() . '/modules/fun-bootstrap.php'; 
require_once get_stylesheet_directory() . '/modules/fun-comments.php';
require_once get_stylesheet_directory() . '/modules/fun-admin.php';
require_once get_stylesheet_directory() . '/modules/fun-article.php';
require_once get_stylesheet_directory() . '/modules/fun-user.php';
require_once get_stylesheet_directory() . '/modules/fun-seo.php';
require_once get_stylesheet_directory() . '/modules/fun-mail.php';
require_once get_stylesheet_directory() . '/modules/fun-global.php';
if( meowdata('no_categoty') ) require_once get_stylesheet_directory() . '/modules/fun-no-category.php';
function md_version() {$versions = '1.6';   echo  $versions;}

//以下可以自定义fun函数

// 数据库插入评论表单的qq字段
add_action('wp_insert_comment','inlojv_sql_insert_qq_field',10,2);
function inlojv_sql_insert_qq_field($comment_ID,$commmentdata) {
    $qq = isset($_POST['new_field_qq']) ? $_POST['new_field_qq'] : false;
    update_comment_meta($comment_ID,'new_field_qq',$qq); // new_field_qq 是表单name值，也是存储在数据库里的字段名字
}

// 后台评论中显示qq字段
add_filter( 'manage_edit-comments_columns', 'add_comments_columns' );
function add_comments_columns( $columns ){
    $columns[ 'new_field_qq' ] = __( 'QQ号' );        // 新增列名称
    return $columns;
}

add_action( 'manage_comments_custom_column', 'output_comments_qq_columns', 10, 2 );
function output_comments_qq_columns( $column_name, $comment_id ){
    switch( $column_name ) {
        case "new_field_qq" :
            // 这是输出值，可以拿来在前端输出，这里已经在钩子manage_comments_custom_column上输出了
            echo get_comment_meta( $comment_id, 'new_field_qq', true );
            break;
    }
}

