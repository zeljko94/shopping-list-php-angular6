<?php


class ShoppingListItem{
	



    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM shoppinglistitem WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(-1);
        return;
    }



    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO shoppinglistitem(NamirnicaID, ShoppingListID, Kolicina, IsDone) VALUES(?,?,?,?)", [
            $o->NamirnicaID, $o->ShoppingListID, $o->Kolicina, $o->IsDone
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
}


$app->get("/shopping-list-item/delete/:id", function($id){
	ShoppingListItem::Delete($id);
});

$app->post("/shopping-list-item/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
	ShoppingListItem::Insert($data);
});