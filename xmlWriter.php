<?php
$filename = "comment.xml";  // 必ず相対パスで指定する
$leaveCount = 10;           // xmlReset後に残す数

if(isset($_GET['xmlReset'])) {
    $leaveCount += 2;
    $xml = simplexml_load_file($filename);
    $cnt = count( $xml->comment );
    echo "cnt:".$cnt."<br>";
    for ($i = 0; $i <= $cnt; $i++) {
    
        if ($cnt <= $leaveCount){
            echo "reset cancel<br>";
            break;
        }
        echo "i:".$i."<br>";
        echo $xml->comment[ $i ]."<br>";
        unset( $xml->comment[0] );
        
        $a = $cnt - $i;
        
         if ($a < $leaveCount) {
             echo "ok<br>";
             break;
         } else {
             echo "else<br>";
         }
        
    }
    $xml->asXML($filename);
    echo "xml Reset2(".time().")";
    exit();
}


if(isset($_GET['xmlAllResel'])) {
    $dom = new DOMDocument('1.0', 'UTF-8');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $datanode = $dom->createElement("log");
    $root = $dom->appendChild($datanode);
    $dom->save($filename);
    echo "xml Reset(".time().")";
    exit();
}


try {
    $name = $_GET['name'];
    $text = $_GET['comment'];
    $site = $_GET['site'];
    $textNo = (int) $_GET['no'];
    $time = (int) $_GET['time'];
    $owner = (int) $_GET['owner'];
    
} catch (Exception $e) {
    exit();
}

$xml = simplexml_load_file($filename);

$target = $xml->xpath("/log");
$item = $target[0]->addChild("comment",$text);
$item->addAttribute("no", $textNo);
$item->addAttribute("time", $time);
$item->addAttribute("owner", $owner);
$item->addAttribute("service", $site);
$item->addAttribute("handle", $name);

$xml->asXML($filename);
echo "done(".time().")";

?>