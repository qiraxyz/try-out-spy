import PatchUri from "../patcher/uri.mjs";

export default async function GundarFetcher() {

    // declare self entity api
    let IdSiswa;
    let jawaban;
    let IdMapel;
    
    // declare target entity api
    let IdSiswaTarget;

    // jumlah soal corresponding
    let JumSoal;
    
    // data fetch declare
    let res;
    let resEnemy;
    
    // uri declare
    let URI;
    let URIself;
    let URItarget;

    //  uri fetcher
   URI = PatchUri;
    
   console.log(URI);
    // jumlah total question
    JumSoal = 40;

    // configuration payload
    IdMapel = '8';
    IdSiswa = 1;
    IdSiswaTarget = 1;

    // object data structure
    const jawabanKamu = {};
    const jawabanTarget = {};
    
    // Looping self answer
    for (let NoSoal = 1; NoSoal <= JumSoal; NoSoal++) {
        // Handler fetch data payload
        URIself = `${URI}/${IdSiswa}/${IdMapel}/${NoSoal}`;
        URItarget = `${URI}/${IdSiswaTarget}/${IdMapel}/${NoSoal}`;
        
        // Collect data from api
        res = await fetch(URIself);
        resEnemy = await fetch(URItarget);

        // Parsing data jawaban to JSON
        jawaban = await res.json();
        const jawabanEnemy = await resEnemy.json();

        // Finding the corresponding question ID
        const idSoal = jawaban.length >= 1 ? jawaban[0].id_soal : null;
        const idSoalEnemy = jawabanEnemy.length >= 1 ? jawabanEnemy[0].id_soal : null;

        // Saving jawaban if looping and data already collected
        jawabanKamu[idSoal] = jawaban.length >= 1 ? jawaban[0].jawaban : 'Tidak ada jawaban';
        jawabanTarget[idSoalEnemy] = jawabanEnemy.length >= 1 ? jawabanEnemy[0].jawaban : 'Tidak ada jawaban';

        // Processing comparasion show data jawaban
        console.log(`${NoSoal}.) Answer id_soal-${idSoal}: ${jawabanKamu[idSoal]}`);
        console.log(`Answer Target id_soal-${idSoal}: ${jawabanTarget[idSoal]}`);
        console.log(`comparing id_soal : -${idSoal}: ${jawabanKamu[idSoal] === jawabanTarget[idSoal] ? 'same' : 'different'} \n`);
    }
}
