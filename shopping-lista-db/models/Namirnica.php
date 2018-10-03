<?php

class Namirnica{
    public static function GetAll(){
        $db = new DB();

        $db->Query("SELECT * FROM namirnica", []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }

    public static function GetAllForUser($UserID){
        $db = new DB();

        $db->Query("SELECT * FROM namirnica WHERE UserID=?", [$UserID]);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }

    public static function Get($id){
        $db = new DB();

        $db->Query("SELECT * FROM namirnica WHERE ID=?", [$id]);

        if($db->getResult()){
            echo json_encode($db->getResult()[0], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }
    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM namirnica WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Update($o){
        $db = new DB();
        $db->Query("UPDATE namirnica SET Naziv=?, Cijena=?, ImgPath=?, UserID=? WHERE ID=?", [$o->Naziv, $o->Cijena, $o->ImgPath, $o->UserID, $o->ID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO namirnica(Naziv, Cijena, ImgPath, UserID) VALUES(?,?,?,?)", [$o->Naziv, $o->Cijena, $o->ImgPath, $o->UserID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
}

$app->get("/namirnica", function(){
    Namirnica::GetAll();
});

$app->get("/namirnica/foruser/:id", function($id){
    Namirnica::GetAllForUser($id);
});


$app->get("/namirnica/:id", function($id){
    Namirnica::Get($id);
});

$app->get("/namirnica/delete/:id", function($id){
    Namirnica::Delete($id);
});

$app->post("/namirnica/update", function(){
    $data = json_decode(file_get_contents("php://input"));
    Namirnica::Update($data);
});

$app->post("/namirnica/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    Namirnica::Insert($data);
});