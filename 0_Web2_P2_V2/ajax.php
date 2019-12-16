<?php
  if(isset($_POST['data'])){    
    if(get_magic_quotes_gpc())
      $data = stripslashes($_POST['data']);
    else
      $data = $_POST['data'];
    $data = json_decode($data,true);
    
    $conn = new mysqli("localhost", "root", "root", "Web_Project");
    if($conn->connect_error){
   	  die($conn->connect_error);
    }
    $Type = $data['Event_Type'];
    $Target = $data['Event_Target'];
    $Time = $data['Event_Time'];
    $sql = "INSERT INTO Event_Info (Event_Time, Event_Type, Event_Target) VALUES ('$Time', '$Type', '$Target');";
    $conn->query($sql);
    if($conn->affected_rows > 0){
      echo "Inserted Successfully";
    }
    else{
      echo "Sorry: Problem With Insertion";	
    } 
  }

  if(isset($_GET['data'])){
    $conn = new mysqli("localhost", "root", "root", "Web_Project");
    if($conn->connect_error){
   	  die($conn->connect_error);
    }
    $sql = "Select * from Event_Info"; 
    if ($result = $conn->query($sql)){
      $rows = array();
      if($result->num_rows > 0){
       while($row = $result->fetch_assoc()){
        array_push($rows, $row);
       }
      echo json_encode($rows);
     }
   }
   else{
    echo "No Data to Retrieve";
   }
  } 
     
  if(isset($_POST['ClearDB'])){
    $conn = new mysqli("localhost", "root", "root", "Web_Project");
    if($conn->connect_error){
   	  die($conn->connect_error);
    }
    $sql = "DELETE FROM Event_Info"; 
    $conn->query($sql);
    $sql2 = "ALTER TABLE Event_Info AUTO_INCREMENT= 1"; 
    $conn->query($sql2);

    if($conn->affected_rows > 0){
      echo "Inserted Successfully";
    }
    else{
      echo "Sorry: Problem With Insertion";	
    } 
  }  
?>