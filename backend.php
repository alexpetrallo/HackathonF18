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
  $ip = mysqli_real_escape_string($connect, $_POST['ip']);
  $query = "INSERT INTO posts (username, message, datetime_msg, location_long, location_lat, ip) VALUES ('$username', '$content', NOW(), '$long', '$lat', '$ip');";
  $run_query = mysqli_query($connect, $query);
  echo "posted $content, $username, $long, $lat, $ip";
}
function strike_count($connect){
  $ip = mysqli_real_escape_string($connect, $_POST['ip']);
  $querya = "SELECT COUNT(*) FROM banned_ips WHERE ip = '$ip';";
  $result = mysqli_fetch_array(mysqli_query($connect, $querya));
  $ipCt = $result['COUNT(*)'];
  if($ipCt == "0" || $ipCt == "1" || $ipCt == "2"){
    echo "u good$ipCt $querya";
  } else {
    echo "banned";
  }
}
function strike_ip($connect){
  $post_id = mysqli_real_escape_string($connect, $_POST['post_id']);
  $querya = "SELECT ip FROM posts WHERE id = '$post_id';";
  $result = mysqli_fetch_array(mysqli_query($connect, $querya));
  $ip = $result['ip'];
  $query = "INSERT INTO banned_ips (ip, strike) VALUES ('$ip', '1');";
  $run_query = mysqli_query($connect, $query);
}
function getScore($post_id, $connect){
  $query = "SELECT (SELECT COUNT(*) FROM updown WHERE post_id = '$post_id' AND up_or_down = 'u') - (SELECT COUNT(*) FROM updown WHERE post_id = '$post_id' AND up_or_down = 'd') as sum;";

  $result = mysqli_fetch_array(mysqli_query($connect, $query));
  $sum = $result['sum'];
  return $sum;
}
function getposts($connect){
  $to_return = "";
  $long = mysqli_real_escape_string($connect, $_GET['long']);
  $lat = mysqli_real_escape_string($connect, $_GET['lat']);
  $query = "SELECT
    *, (
      3959 * acos (
      cos ( radians($lat) )
      * cos( radians( location_lat ) )
      * cos( radians( location_long ) - radians($long) )
      + sin ( radians($lat) )
      * sin( radians( location_lat ) )
    )
    ) AS distance
    FROM posts
    HAVING distance < 100
    ORDER BY datetime_msg DESC
    LIMIT 0 , 20;";
$resss = mysqli_query($connect, $query);
$resultArray = mysqli_fetch_array($resss, MYSQLI_ASSOC);
//$to_return .= "balls $long $lat test";
while ($resultArray) {
  $post_id = $resultArray['id'];
  $sum = getScore($post_id, $connect);
  $username = $resultArray['username'];
  $message = $resultArray['message'];
  $timestamp = $resultArray['datetime_msg'];
  $longlat = $resultArray['location_long'] . ", " . $resultArray['location_lat'];
  $card_example = "
    <div class=\"card text-post\">
      <div class=\"card-header\" style=\"height: 75px;\">
          <span class= \"h5\">$username</span>
          <right><button class=\"btn-danger\" id=\"report\" data-id='" . $post_id . "'><i class=\"fas fa-flag\"></i></button></right>
      </div>
      <div class=\"card-body\" style=\"height: 150px;\">
        <h5 class=\"card-text\">$message</h5>
      </div>
      <div class=\"card-footer\">
        <span class=\"card-text\"><i>$timestamp</i></span> | <span class=\"card-text\" >$longlat</span>
      </div>
      <div class=\"card-footer\">
          <button class=\"btn btn-outline-success\" id=\"upvote\" data-id='" . $post_id . "'><i class=\"fas fa-arrow-up\"></i></button>
          <span id=\"voteCount\">$sum</span>
          <button class=\"btn btn-outline-danger\" id =\"downvote\" data-id='" . $post_id . "'><i class=\"fas fa-arrow-down\"></i></button>
        </div>

      </div></br>


    ";
    $to_return .= $card_example;
    $resultArray = mysqli_fetch_array($resss, MYSQLI_ASSOC);
  }
  if($to_return == ""){
    $to_return = "<div class=\"card text-post\"><div class=\"card-body\" style=\"height: 150px;\">
      <h5 class=\"card-text\">The end. Share something above!</h5>
    </div></div>";
  }
  echo $to_return;
}
function delete_past($connect){
  $query = "DELETE FROM posts WHERE `datetime_msg` < (NOW() - INTERVAL 30 MINUTE);";
  mysqli_query($connect, $query);
}
function check_if_banned_ip($connect){
  $ip = mysqli_real_escape_string($connect, $_POST['ip_address']);
  $query = "SELECT COUNT(*) FROM banned_ips WHERE ip = '$ip'";
  $result = mysqli_fetch_array(mysqli_query($connect, $query));
  $results = $result['COUNT(*)'];
  if($results > 2){
    echo "banned";
  } else {
    echo "allowed";
  }
}
function upvote($connect){
  $ip = mysqli_real_escape_string($connect, $_POST['ip_address']);
  $post_id = mysqli_real_escape_string($connect, $_POST['post_id']);

  $query = "SELECT COUNT(*) FROM updown WHERE ip = '$ip' and post_id = '$post_id';";
  $result = mysqli_fetch_array(mysqli_query($connect, $query));
  $results = $result['COUNT(*)'];
  echo $results;

  if ($results == "1"){
    $query = "UPDATE updown SET up_or_down = 'u' WHERE ip = '$ip' and post_id = '$post_id';";
    $run_query = mysqli_query($connect, $query);
  } else {
    $query = "INSERT INTO updown (ip, post_id, up_or_down) VALUES ('$ip', '$post_id', 'u');";
    $run_query = mysqli_query($connect, $query);
  }
}

// downvote code
function downvote($connect){
  $ip = mysqli_real_escape_string($connect, $_POST['ip_address']);
  $post_id = mysqli_real_escape_string($connect, $_POST['post_id']);

  $query = "SELECT COUNT(*) FROM updown WHERE ip = '$ip' and post_id = '$post_id';";
  $result = mysqli_fetch_array(mysqli_query($connect, $query));
  $results = $result['COUNT(*)'];
  echo $results;
  if ($results == "1"){
    $query = "UPDATE updown SET up_or_down = 'd' WHERE ip = '$ip' and post_id = '$post_id';";
    $run_query = mysqli_query($connect, $query);
  } else {
    $query = "INSERT INTO updown (ip, post_id, up_or_down) VALUES ('$ip', '$post_id', 'd');";
    $run_query = mysqli_query($connect, $query);
  }
}
$method = $_GET['method'];
if (!empty($method)){
  $method($connect);
} else {
  echo "hi there";
}
?>
