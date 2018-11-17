<?php
$db = parse_ini_file("cobweb.ini");
$server = $db['host'];
$user = $db['user'];
$db_name = $db['name'];
$pwd = $db['pass'];
$connect = mysqli_connect("$host", "$user", "$pwd", "$db_name");


function post_post($connect) {
  $content = mysqli_real_escape_string($connect, $_POST['content']);
  $username = mysqli_real_escape_string($connect, $_POST['username']);
  $long = mysqli_real_escape_string($connect, $_POST['long']);
  $lat = mysqli_real_escape_string($connect, $_POST['lat']);
  $query = "INSERT INTO posts (username, message, datetime_msg, location_long, location_lat) VALUES ('$user_id', '$content', 'NOW()', '$long', '$lat');";
  $run_query = mysqli_query($connect, $query);
  echo "posted";
}

function strike_ip($connect){
  $ip = mysqli_real_escape_string($connect, $_POST['ip_address']);
  $query = "INSERT INTO banned_ips (ip, strike) VALUES ('$ip', '1');";
  $run_query = mysqli_query($connect, $query);
}
?>
