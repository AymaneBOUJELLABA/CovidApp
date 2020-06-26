<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

use App\information;

class informationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('informations')->delete();

        information::create(array(
            'nom' => 'nom1',
            'prenom' => 'prenom1',
            'age' => 21,
            'sexe' => 'Homme',
            'adresse' => 'adresse1',
            'telephone' => '06234567891',
            'ville' => 'Tanger',

        ));

        information::create(array(
            'nom' => 'nom1',
            'prenom' => 'prenom1',
            'age' => 21,
            'sexe' => 'Homme',
            'adresse' => 'adresse1',
            'telephone' => '06234567891',
            'ville' => 'Tanger',

        ));

        information::create(array(
            'nom' => 'nom1',
            'prenom' => 'prenom1',
            'age' => 21,
            'sexe' => 'Homme',
            'adresse' => 'adresse1',
            'telephone' => '06234567891',
            'ville' => 'Tanger',

        ));
    }
}
