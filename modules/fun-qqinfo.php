<?php
header("content-Type: text/html; charset=utf-8");
$type = @$_GET['type'] ? $_GET['type'] : '';
if(empty($type)){
    exit;
}
if($type == "getqqnickname"){
    $qq = isset($_GET['qq']) ? addslashes(trim($_GET['qq'])) : '';
    if(!empty($qq) && is_numeric($qq) && strlen($qq) > 4 && strlen($qq) < 13){
        $qqnickname = file_get_contents('http://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins='.$qq); // API
        if($qqnickname){
            $qqnickname = mb_convert_encoding($qqnickname, "UTF-8", "GBK");
            echo $qqnickname;
        }
    }
}


//if($type == "getqqavatar"){
//    $qq = isset($_GET['qq']) ? addslashes(trim($_GET['qq'])) : '';
//    if(!empty($qq) && is_numeric($qq) && strlen($qq) > 4 && strlen($qq) < 13){
//        $qqavatar = file_get_contents('http://ptlogin2.qq.com/getface?appid=1006102&imgtype=3&uin='.$qq);  // API
//        if($qqavatar){
//            echo str_replace("pt.setHeader","qqavatarCallBack",$qqavatar);
//        }
//    }
//}

function get_qq_info($qq) {
    header('Content-Type: text/html; charset=utf8');
    $ret = '';
    if(preg_match('/\"nickname\":\"([^\"]+)\"/',
        file_get_contents('http://r.qzone.qq.com/cgi-bin/user/cgi_personal_card?uin='.$qq),
        $qqInfo)) {
        $ret = $qqInfo[1];
    }
}