<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Memo;
class MemoController extends Controller
{
 
    public function index()
    {
        $memos = Memo::all();

        if(!$memos->isEmpty())
        {
            return response()->json([
                "success" => true,
                "memos" => $memos,
            ]);
        }
        else{
            return response()->json([
                'success' => false,
                'memos' => "No memos"
            ]);
        }
    }

    public function store(Request $request)
    {
        
        $memo = Memo::create(
            [
                "title" => $request->title,
                "text" => $request->text,
                "isFavorite" => 0,
            ]
        );

        if($memo)
        {
            return response()->json([
                "success" => true,
                "message" => "Memo is Added!"
            ]);
        }
         return response()->json([
            "success" => false,
            "message" => "Memo is not Added!Please try again"
        ]);

    }



    public function edit($id)
    {
        $memo = Memo::find($id);
        if($memo)
            {
                return response()->json(
                    [
                        "success" => true,
                        "memo" => $memo
                    ]
                );
            }
            return response()->json(
                [
                    "success" => false,
                    "memo" => "No memo in this id"
                ]
            );
    }

   


 
    public function update(Request $request, $id)
    {
        
         $memo = Memo::find($id);
       
       
            if($memo)
            {
                $resUpdate = $memo->update([
                    "title" => $request->title,
                    "text" => $request->text,
                ]);
                if($resUpdate)
                    {
                        return response()->json([
                            'success' => true,
                            'message' => "Memo is updated!"
                        ]);
                    }
                    return response()->json([
                        'success' => false,
                        'message' => "Memo is not updated!Try again"
                    ]);
            }
             return response()->json([
                    'success' => false,
                    'message' => "Memo is not updated!Try again"
                ]);  
            
            
        
    }

   
    public function destroy($id)
    {
        $memo = Memo::find($id);
        if($memo)
        {
            $memo->delete();
            return response()->json([
                "success" => true,
                "message" => "Memo is deleted!"
            ]);
        }
        return response()->json([
            "success" => false,
            "message" => "Error"
        ]);

    }

    public function updateFavorite($id)
    {
        $memo = Memo::find($id);
        $isFavorite = 0;
        if($memo)
        {
            if($memo->isFavorite == 0)
                {
                    $isFavorite = 1;
                }

            $res = $memo->update([
                "isFavorite" => $isFavorite
            ]);
            if($res)
                {
                    return response()->json([
                        "success" => true,
                        "memo" => $memo,
                    ]);
                }
                return response()->json([
                    "success" => false,
                    "message" => null
                ]);
        }
        return response()->json([
            "success" => false,
            "message" => null
        ]);
    }

    public function getFavorites()
    {
        $memos = Memo::where("isFavorite",1)->get();

        if(!$memos->isEmpty())
            {
                return response()->json([
                    "success" => true,
                    "memos" =>$memos
                ]);
            }
            return response()->json([
                "success" => false,
                "memos" =>"Favorites is empty"
            ]);

    }
}
