<?php


class ShoppingListVM{
    public $ShoppingList;
    public $Items = [];
}

class ShoppingList{
    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM shoppinglist WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(-1);
        return;
    }

    public static function UpdateIsDone($data){
        $db = new DB();

        $db->Query("UPDATE shoppinglist SET IsDone=? WHERE ID=?", [$data->ShoppingList->IsDone, $data->ShoppingList->ID]);

        for($i=0; $i<count($data->Items); $i++){
            $db->Query("UPDATE shoppinglistitem SET IsDone=? WHERE ID=?", [$data->Items[$i]->IsDone, $data->Items[$i]->ID]);
        }

        echo json_encode(1);
    }



    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO shoppinglist(Naziv, DatumKreiranja, UserID, IsDone) VALUES(?,?,?,?)", [
            $o->Naziv, $o->DatumKreiranja, $o->UserID, $o->IsDone
        ]);

        if($db->getRows()){
            $id = $db->getConn()->lastInsertId();
            $o->ID = $id;
            echo json_encode($o, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(null);
        return;
    }

    public static function GetAllForUser($UserID){
        $db = new DB();
        $rez = [];

        $db->Query("SELECT * FROM shoppinglist WHERE UserID=? ORDER BY STR_TO_DATE(DatumKreiranja, '%d-%m-%Y %H:%i:%s') DESC", [$UserID]);

        if($db->getResult()){
            $shoppingLists = $db->getResult();
            for($i=0; $i<count($shoppingLists); $i++){
                $sl = new ShoppingListVM();
                $sl->ShoppingList = $shoppingLists[$i];


                $db->Query("SELECT * FROM shoppinglistitem WHERE ShoppingListID=?", [$sl->ShoppingList["ID"]]);


                if($db->getResult()){
                    $shoppingListItems = $db->getResult();
                    for($j=0; $j<count($shoppingListItems); $j++){
                        array_push($sl->Items, $shoppingListItems[$j]);
                    }
                }

                array_push($rez, $sl);
            }
            echo json_encode($rez, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }


    public static function GetWithItems($ShoppingListID){
        $db = new DB();

        $db->Query("SELECT * FROM shoppinglist WHERE ID=?", [$ShoppingListID]);

        if($db->getResult()){
            $shoppingList = $db->getResult()[0];
            $sl = new ShoppingListVM();
            $sl->ShoppingList = $shoppingList;


                $db->Query("SELECT * FROM shoppinglistitem WHERE ShoppingListID=?", [$sl->ShoppingList["ID"]]);


                if($db->getResult()){
                    $shoppingListItems = $db->getResult();
                    for($j=0; $j<count($shoppingListItems); $j++){
                        array_push($sl->Items, $shoppingListItems[$j]);
                    }
                }
            echo json_encode($sl, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }

    public static function InsertWithItems($o){
        $db = new DB();
        $db->Query("INSERT INTO shoppinglist(Naziv, DatumKreiranja, UserID, IsDone) VALUES(?,?,?,?)", [
            $o->ShoppingList->Naziv, $o->ShoppingList->DatumKreiranja, $o->ShoppingList->UserID, $o->ShoppingList->IsDone
        ]);

        if($db->getRows()){
            $id = $db->getConn()->lastInsertId();
            $o->ID = $id;
            for($i=0; $i<count($o->Items); $i++){
                    $db->Query("INSERT INTO shoppinglistitem(NamirnicaID, ShoppingListID, Kolicina, IsDone) VALUES(?,?,?,?)", [
                        $o->Items[$i]->Namirnica->ID, $o->ID, $o->Items[$i]->Kolicina, $o->Items[$i]->IsDone
                    ]);
            }
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(null);
        return;
    }
}

$app->get("/shopping-list/delete/:id", function($id){
    ShoppingList::Delete($id);
});

$app->get("/shopping-list/getwithitems/:id", function($id){
    ShoppingList::GetWithItems($id);
});

$app->post("/shopping-list/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    ShoppingList::Insert($data);
});

$app->post("/shopping-list/insertwithitems", function(){
    $data = json_decode(file_get_contents("php://input"));
    ShoppingList::InsertWithItems($data);
});

$app->get("/shoppinglist/getforuser/:id", function($id){
    ShoppingList::GetAllForUser($id);
});

$app->post("/shoppinglist/updateisdone", function(){
    $data = json_decode(file_get_contents("php://input"));
    ShoppingList::UpdateIsDone($data);
});