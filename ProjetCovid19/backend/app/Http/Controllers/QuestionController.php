<?php

namespace App\Http\Controllers;

use App\Question;
use App\User;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class QuestionController extends Controller
{
    //get all the results for the questions
    public function index()
    {
        return Question::all();
    }
    //afficher les résultat des questions pour un seul user
    public function show($id)
    {
        return User::find($id)->question;

    }
    //creer une nouvelle instance des résultats
    public function store(Request $request, $id)
    {   
        $user = User::findOrFail($id);
        if($user->question)
        {
            return response('already exists');
        }
        $data = $request->all();
        $data["user_id"] = $user->id;

        $question = Question::create($data);

        $user->question()->save($question);
        
        return $user->question;
    }

    //modfier les valeurs
    public function update(Request $request,$id)
    {
        $user = User::findOrFail($id);

        $user->question->update($request->all());

        return $user->question;
    }

    //supprimer
    public function delete(Request $request, $id)
    {
        $question = User::findOrFail($id)->question;

        if(!$question)
        {
            return  [
                'message' => $message = 'no answers for this user',
                'code' => 204,
            ];
        }
        $isdeleted = $question->delete();
        
        if($isdeleted)
            $message = 'deleted successfully';
        else
            $message = 'deletion failed';

        return [
            'message' => $message,
            'code' => 204,
        ];
    }



}
